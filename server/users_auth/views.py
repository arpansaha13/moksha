from django.db.models import Q
from django.core.mail import send_mail
from django.db import IntegrityError, transaction
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from .models import AccountVerificationLink, ForgotPasswordLink
from users.models import User
from users.serializers import AuthUserSerializer
from common.middleware import jwt_exempt
from common.exceptions import Conflict, Unauthorized, InternalServerError
from datetime import datetime, timedelta
import jwt
import random
import secrets
import string
import textwrap
import environ  # Pylance does not recognize this import for some reason but the dev server runs perfectly

env = environ.Env()
environ.Env.read_env()


class CheckAuth(APIView):
    def get(self, request):
        token = request.COOKIES.get('token', None)

        unauth_res = Response({'data': None, 'message': 'Unauthenticated'})

        if token is None:
            return unauth_res

        try:
            payload = jwt.decode(token, env('JWT_SECRET'), algorithms=[env('JWT_ALGO')])
        except jwt.ExpiredSignatureError:
            return unauth_res

        auth_user = User.objects.filter(user_id=payload['id']).first()

        if not auth_user:
            return unauth_res

        return Response({
            'data': {
                'avatar_idx': auth_user.avatar_idx,
                'user_id': auth_user.user_id,
            }
        })

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class Register(APIView):
    def post(self, request):
        if request.POST['password'] != request.POST['confirm_password']:
            raise Unauthorized({'message': "Password and confirm password do not match."})

        email = request.POST['email']
        user = User.objects.filter(email=email).first()

        if user is not None:
            if user.email_verified:
                raise Conflict(message='This email is already registered.')

            raise Conflict(message='This email is already registered. You can login after verifying your account.')

        self.verify_username(email, request.POST['username'])

        otp_entry: AccountVerificationLink
        otp_generated = generate_otp()
        hashed_password = make_password(request.data['password'])

        try:
            with transaction.atomic():
                user = self.create_new_user(request, hashed_password)
                otp_entry = self.create_otp(user, otp_generated)

                user.save()
                otp_entry.save()
        except IntegrityError:
            raise InternalServerError()

        send_mail(
            subject='Welcome to Moksha 2023, NIT Agartala - Please verify your email',
            message=get_account_verification_mail_message(
                user.name,
                otp_generated,
                get_account_verification_link(otp_entry.hash)
            ),
            from_email=env('EMAIL_HOST_USER'),
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({'message': "Otp validation link has been sent to your email."}, 201)

    def verify_username(self, email: str, username: str):
        user = User.objects.filter(Q(username=username) & ~Q(email=email)).first()

        if user is not None and user.email_verified:
            raise Conflict(message='This username is already taken.')

    def create_new_user(self, request, hashed_password: str):
        uid = generate_uid()

        while User.objects.filter(user_id=uid).exists():
            uid = generate_uid()

        user = User(
            user_id=uid,
            avatar_idx=request.POST['avatar_idx'],
            name=request.POST['name'],
            institution=request.POST['institution'],
            phone_no=request.POST['phone_no'],
            email=request.POST['email'],
            username=request.POST['username'],
            password=hashed_password
        )

        return user

    def create_otp(self, user: User, otp_generated: int):
        otp_hash = generate_hash()

        while AccountVerificationLink.objects.filter(hash=otp_hash).exists():
            otp_hash = generate_hash()

        return AccountVerificationLink(
            user=user,
            hash=otp_hash,
            otp=otp_generated
        )

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class Login(APIView):
    def post(self, request):
        email = request.POST['email']
        user = User.objects.filter(email=email).first()

        if not user:
            raise Unauthorized({'message': 'Invalid email or password.'})

        password_matched = check_password(request.POST['password'], user.password)

        if not password_matched:
            raise Unauthorized({'message': 'Invalid email or password.'})

        if not user.email_verified:
            raise PermissionDenied({'message': "Please verify your account using otp."})

        payload = {
            'id': user.user_id,
            'exp': datetime.utcnow() + timedelta(seconds=int(env('JWT_VALIDATION_SECONDS'))),
            'iat': datetime.utcnow(),
        }

        token = jwt.encode(payload, env('JWT_SECRET'), algorithm=env('JWT_ALGO'))

        response = Response()
        response.set_cookie(
            key='token',
            value=token,
            secure=True,
            httponly=True,
            samesite='None',
            domain=env('COOKIE_DOMAIN'),
            max_age=int(env('JWT_VALIDATION_SECONDS'))
        )
        response.data = AuthUserSerializer(user).data
        response.status_code = 200
        return response

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class Logout(APIView):
    def get(self, request):
        token = request.COOKIES.get('token', None)

        if token is None:
            raise PermissionDenied({'Unauthenticated'})

        try:
            payload = jwt.decode(token, env('JWT_SECRET'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise Unauthorized('Unauthenticated')

        if not User.objects.filter(user_id=payload['id']).exists():
            raise Unauthorized({'message': 'Invalid token.'})

        response = Response()
        response.set_cookie('token', max_age=1, httponly=True, domain=env('COOKIE_DOMAIN'))
        response.data = {'message': 'User has been successfully logged out.'}
        response.status_code = 200
        return response


class VerifyAccountOtpLink(APIView):
    def get(self, _, otp_hash):
        if AccountVerificationLink.objects.filter(hash=otp_hash).exists():
            return Response({'valid': True}, status=200)

        return Response({'valid': False}, status=200)

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class AccountVerification(APIView):
    def post(self, request, otp_hash):
        otp_entry = AccountVerificationLink.objects.filter(hash=otp_hash).first()

        if otp_entry is None:
            return Response({'message': 'Invalid link.'}, status=498)

        otp_age = timezone.now() - otp_entry.updated_at

        if otp_age.seconds > int(env('OTP_VALIDATION_SECONDS')):
            return Response({'message': 'OTP has expired.'}, status=498)

        otp = int(request.POST['otp'])

        if otp_entry.otp != otp:
            raise Unauthorized(message='Invalid OTP.')

        try:
            with transaction.atomic():
                user = otp_entry.user
                user.email_verified = True
                user.save()
                otp_entry.delete()
        except IntegrityError:
            raise InternalServerError()

        return Response({'message': 'Account verification successful.'}, status=200)

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ResendOtp(APIView):
    def get(self, _, otp_hash):
        otp_entry = AccountVerificationLink.objects.filter(hash=otp_hash).first()

        if otp_entry is None:
            raise NotFound({'message': 'Invalid link.'})

        otp_entry.otp = generate_otp()
        otp_entry.save()

        send_mail(
            subject='Moksha 2023, NIT Agartala - New OTP for account verification',
            message=get_account_verification_mail_message(
                otp_entry.user.name,
                otp_entry.otp,
                get_account_verification_link(otp_hash),
                False
            ),
            from_email=env('EMAIL_HOST_USER'),
            recipient_list=[otp_entry.user.email],
            fail_silently=False,
        )

        return Response({'message': 'An email has been sent with the new OTP.'}, status=200)

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ResendVerificationLink(APIView):
    def post(self, request):
        email = request.POST['email']
        user = User.objects.filter(email=email).first()

        if user is None:
            raise NotFound({'message': 'This email is not registered.'})

        if user.email_verified:
            raise NotFound({'message': 'This email is already registered.'})

        otp_entry = AccountVerificationLink.objects.filter(user=user).first()
        otp_generated = generate_otp()

        if otp_entry is None:
            otp_entry = Register().create_otp(user, otp_generated)
        else:
            otp_entry.otp = otp_generated

        otp_entry.save()

        send_mail(
            subject='Moksha 2023, NIT Agartala - New OTP for account verification',
            message=get_account_verification_mail_message(
                otp_entry.user.name,
                otp_entry.otp,
                get_account_verification_link(otp_entry.hash),
                False
            ),
            from_email=env('EMAIL_HOST_USER'),
            recipient_list=[otp_entry.user.email],
            fail_silently=False,
        )

        return Response({'message': 'An email has been sent with the new OTP.'}, status=200)

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class VerifyResetPassLink(APIView):
    def get(self, _, forgot_pass_hash):
        forgot_pass_entry = ForgotPasswordLink.objects.filter(hash=forgot_pass_hash).first()

        if forgot_pass_entry is None:
            return Response({'valid': False}, status=200)

        link_age = timezone.now() - forgot_pass_entry.updated_at

        if link_age.seconds > int(env('FORGOT_PASS_VALIDATION_SECONDS')):
            return Response({'valid': False}, status=200)

        return Response({'valid': True}, status=200)

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ForgotPassword(APIView):
    def post(self, request):
        email = request.POST['email']
        user = User.objects.filter(email=email).first()

        if user is None:
            raise NotFound({'message': 'This email is not registered.'})

        forgot_pass_entry = ForgotPasswordLink.objects.filter(user=user).first()

        if forgot_pass_entry is not None:
            forgot_pass_entry.delete()

        forgot_pass_hash = generate_hash()
        forgot_pass_entry = ForgotPasswordLink(hash=forgot_pass_hash, user=user)
        forgot_pass_entry.save()

        send_mail(
            subject='Moksha 2023, NIT Agartala - Reset Password',
            message=get_forgot_password_mail_message(
                user,
                get_forgot_password_link(forgot_pass_hash)
            ),
            from_email=env('EMAIL_HOST_USER'),
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({'message': "Reset password link has been sent to your email."}, 201)

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ResetPassword(APIView):
    def post(self, request, forgot_pass_hash):
        forgot_pass_entry = ForgotPasswordLink.objects.filter(hash=forgot_pass_hash).first()

        if forgot_pass_entry is None:
            raise NotFound({'message': 'Invalid link.'})

        link_age = timezone.now() - forgot_pass_entry.updated_at

        if link_age.seconds > int(env('FORGOT_PASS_VALIDATION_SECONDS')):
            return Response({'message': 'Link has expired.'}, status=498)

        if request.POST['password'] != request.POST['confirm_password']:
            raise Unauthorized({'message': "Password and confirm password do not match."})

        try:
            with transaction.atomic():
                hashed_password = make_password(request.data['password'])
                user = forgot_pass_entry.user
                user.password = hashed_password
                user.save()
                forgot_pass_entry.delete()
        except IntegrityError:
            raise InternalServerError()

        return Response({'message': 'Your password has been reset.'}, status=200)

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ChangePassword(APIView):
    def post(self, request):
        pass

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


def generate_uid(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(length))
    return 'MOK-' + uid


def generate_hash(length=15):
    random_hash = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(length))
    return random_hash


def get_account_verification_link(hash: str):
    client_domain = env('CLIENT_DOMAIN')

    if client_domain[-1] == '/':
        client_domain = client_domain + 'auth/verification/'
    else:
        client_domain = client_domain + '/auth/verification/'

    return client_domain + hash


def get_forgot_password_link(hash: str):
    client_domain = env('CLIENT_DOMAIN')

    if client_domain[-1] == '/':
        client_domain = client_domain + 'auth/reset-password/'
    else:
        client_domain = client_domain + '/auth/reset-password/'

    return client_domain + hash


def generate_otp():
    return random.randint(1000, 9999)


def get_account_verification_mail_message(user_name: str, otp: int, link: str, is_new=True):
    valid_time_hours = int(env('OTP_VALIDATION_SECONDS')) // 3600

    first_mail_intro = 'Welcome to Moksha 2023 Official Website! Verify your email to get started:'
    resend_intro = 'A new OTP has been generated for your account verification:'

    return textwrap.dedent(f'''\
        Hi {user_name},

        {first_mail_intro if is_new else resend_intro}

        OTP: {otp}
        Verification Link: {link}

        Please use this OTP within {valid_time_hours} hour(s) to complete the verification process.

        If you have any questions or require further assistance, please reply to this email or write an email to {env('EMAIL_HOST_USER')}.

        Cheers,
        Moksha 2023 Tech Team,
        NIT Agartala
    ''')


def get_forgot_password_mail_message(user: User, link: str):
    valid_time_hours = int(env('FORGOT_PASS_VALIDATION_SECONDS')) // 3600

    return textwrap.dedent(f'''\
        Dear {user.name},

        We have recently received a request to reset the password for your account associated with the email address: {user.email}. If you did not initiate this request, please disregard this email.

        To proceed with resetting your password, please click on the following link or copy and paste it into your web browser:

        {link}

        This link will expire within {valid_time_hours} hour(s). If the link expires, you can initiate a new password reset request through our website.

        If you have any questions or require further assistance, please reply to this email or write an email to {env('EMAIL_HOST_USER')}.

        Cheers,
        Moksha 2023 Tech Team,
        NIT Agartala
    ''')
