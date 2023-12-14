from django.db.models import Q
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError, transaction
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import UnverifiedAccount, ForgotPasswordLink
from .helpers import create_auth_token, create_session_token
from users.models import Profile
from common.exceptions import Conflict, Unauthorized, InternalServerError, InvalidOrExpired
import random
import secrets
import string
import textwrap
import environ

env = environ.Env()
environ.Env.read_env()

COOKIE_SECURE = bool(int(env('COOKIE_SECURE')))
PASSWORD_MISMATCH_EXCEPTION_MESSAGE = "Password and confirm-password do not match."


class CheckAuth(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response(data={
                'avatar_idx': request.user.profile.avatar_idx,
                'user_id': request.user.profile.profile_id,
            })

        return Response(data=None)


class Register(APIView):
    def post(self, request):
        if request.data['password'] != request.data['confirm_password']:
            raise Unauthorized(message=PASSWORD_MISMATCH_EXCEPTION_MESSAGE)

        email = request.data['email']
        unverified_acc: UnverifiedAccount

        try:
            with transaction.atomic():
                self.verify_email(email)
                self.verify_username(request.data['username'])
                self.verify_phone(request.data['phone_no'])

                otp_generated = generate_otp()

                unverified_acc = UnverifiedAccount.objects.filter(
                    email=email).first()  # type: ignore

                if unverified_acc is None:
                    unverified_acc = self.create_new_acc(
                        request, otp_generated)
                else:
                    unverified_acc = self.update_unverified_acc(
                        request, unverified_acc, otp_generated)

                unverified_acc.save()
        except IntegrityError:
            raise InternalServerError()

        send_mail(
            subject='Welcome to Moksha 2023, NIT Agartala - Please verify your email',
            message=get_account_verification_mail_message(
                unverified_acc.first_name,
                otp_generated,
                get_account_verification_link(unverified_acc.hash)
            ),
            from_email=env('EMAIL_HOST_USER'),
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({'message': "Otp validation link has been sent to your email."}, 201)

    def verify_email(self, email: str):
        if User.objects.filter(Q(email=email)).exists():
            raise Conflict(message='This email is already registered.')

    def verify_username(self, username: str):
        if User.objects.filter(Q(username=username)).exists():
            raise Conflict(message='This username is already taken.')

    def verify_phone(self, phone_no: str):
        if Profile.objects.filter(Q(phone_no=phone_no)).exists():
            raise Conflict(message='This phone number is already registered.')

    def create_new_acc(self, request, otp_generated: int) -> UnverifiedAccount:
        otp_hash = generate_hash()

        while UnverifiedAccount.objects.filter(hash=otp_hash).exists():
            otp_hash = generate_hash()

        new_account = UnverifiedAccount(
            hash=otp_hash,
            otp=otp_generated,
            avatar_idx=request.data['avatar_idx'],
            first_name=request.data['first_name'],
            last_name=request.data['last_name'],
            institution=request.data['institution'],
            phone_no=request.data['phone_no'],
            email=request.data['email'],
            username=request.data['username'],
            password=request.data['password'],
        )

        return new_account

    def update_unverified_acc(self, request, unverified_acc: UnverifiedAccount, otp_generated: int) -> UnverifiedAccount:

        unverified_acc.otp = otp_generated
        unverified_acc.avatar_idx = request.data['avatar_idx']
        unverified_acc.first_name = request.data['first_name']
        unverified_acc.last_name = request.data['last_name']
        unverified_acc.institution = request.data['institution']
        unverified_acc.phone_no = request.data['phone_no']
        unverified_acc.username = request.data['username']
        unverified_acc.password = request.data['password']

        return unverified_acc


class Login(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        abstract_user = authenticate(
            request, username=username, password=password)

        if abstract_user is None:
            raise Unauthorized(message='Invalid username or password.')

        login(request, abstract_user)

        user = User.objects.get(id=abstract_user.pk)

        return Response(data={'user_id': user.profile.profile_id, 'avatar_idx': user.profile.avatar_idx})


class Logout(APIView):
    def get(self, request):
        logout(request)
        return Response(data={'message': 'User has been successfully logged out.'}, status=200)


class VerifyAccountOtpLink(APIView):
    # Check if account verification link is valid or not
    def get(self, request, otp_hash):
        if UnverifiedAccount.objects.filter(hash=otp_hash).exists():
            return Response({'valid': True}, status=200)

        return Response({'valid': False}, status=200)


class AccountVerification(APIView):
    def post(self, request, otp_hash):
        try:
            with transaction.atomic():
                unverified_acc = UnverifiedAccount.objects.filter(
                    hash=otp_hash).first()

                if unverified_acc is None:
                    return InvalidOrExpired(message='Invalid link.')

                self.verify_otp_age(unverified_acc)

                otp = int(request.data['otp'])

                if unverified_acc.otp != otp:
                    raise Unauthorized(message='Invalid OTP.')

                new_profile_id = generate_profile_id()

                while Profile.objects.filter(profile_id=new_profile_id).exists():
                    new_profile_id = generate_profile_id()

                new_user = User.objects.create_user(
                    email=unverified_acc.email,
                    first_name=unverified_acc.first_name,
                    last_name=unverified_acc.last_name,
                    username=unverified_acc.username,
                    password=unverified_acc.password,
                )

                new_profile = Profile(
                    user=new_user,
                    profile_id=new_profile_id,
                    avatar_idx=unverified_acc.avatar_idx,
                    institution=unverified_acc.institution,
                    phone_no=unverified_acc.phone_no,
                )

                new_profile.save()
                unverified_acc.delete()
        except IntegrityError:
            raise InternalServerError()

        return Response({'message': 'Account verification successful.'}, status=200)

    def verify_otp_age(self, unverified_acc: UnverifiedAccount):
        otp_age = timezone.now() - unverified_acc.updated_at

        if otp_age.seconds > int(env('OTP_VALIDATION_SECONDS')):
            raise InvalidOrExpired(message='OTP has expired.')


class ResendOtp(APIView):
    def get(self, _, otp_hash):
        unverified_acc = UnverifiedAccount.objects.filter(
            hash=otp_hash).first()

        if unverified_acc is None:
            raise NotFound({'message': 'Invalid link.'})

        unverified_acc.otp = generate_otp()
        unverified_acc.save()

        send_mail(
            subject='Moksha 2023, NIT Agartala - New OTP for account verification',
            message=get_account_verification_mail_message(
                unverified_acc.first_name,
                unverified_acc.otp,
                get_account_verification_link(otp_hash),
                False
            ),
            from_email=env('EMAIL_HOST_USER'),
            recipient_list=[unverified_acc.email],
            fail_silently=False,
        )

        return Response({'message': 'An email has been sent with the new OTP.'}, status=200)


class ResendVerificationLink(APIView):
    def post(self, request):
        email = request.data['email']

        try:
            with transaction.atomic():
                if User.objects.filter(email=email).exists():
                    raise Conflict(message='This email is already registered.')

                unverified_acc = self.get_unverified_acc(email)
                unverified_acc.otp = generate_otp()
                unverified_acc.save()
        except IntegrityError:
            raise InternalServerError()

        send_mail(
            subject='Moksha 2023, NIT Agartala - New OTP for account verification',
            message=get_account_verification_mail_message(
                unverified_acc.first_name,
                unverified_acc.otp,
                get_account_verification_link(unverified_acc.hash),
                False
            ),
            from_email=env('EMAIL_HOST_USER'),
            recipient_list=[unverified_acc.email],
            fail_silently=False,
        )

        return Response({'message': 'An email has been sent with the new OTP.'}, status=200)

    def get_unverified_acc(self, email) -> UnverifiedAccount:
        unverified_acc = UnverifiedAccount.objects.filter(email=email).first()

        if unverified_acc is None:
            raise NotFound({'message': 'This email is not registered.'})

        return unverified_acc


class VerifyResetPassLink(APIView):
    def get(self, _, forgot_pass_hash):
        forgot_pass_entry = ForgotPasswordLink.objects.filter(
            hash=forgot_pass_hash).first()

        if forgot_pass_entry is None:
            return Response({'valid': False}, status=200)

        link_age = timezone.now() - forgot_pass_entry.updated_at

        if link_age.seconds > int(env('FORGOT_PASS_VALIDATION_SECONDS')):
            return Response({'valid': False}, status=200)

        return Response({'valid': True}, status=200)


class ForgotPassword(APIView):
    def post(self, request):
        email = request.data['email']

        try:
            with transaction.atomic():
                user = User.objects.filter(email=email).first()

                if user is None:
                    raise NotFound(
                        {'message': 'This email is not registered.'})

                forgot_pass_entry = ForgotPasswordLink.objects.filter(
                    user=user).first()

                if forgot_pass_entry is not None:
                    forgot_pass_entry.delete()

                forgot_pass_hash = generate_hash()
                forgot_pass_entry = ForgotPasswordLink(
                    hash=forgot_pass_hash, user=user)
                forgot_pass_entry.save()
        except IntegrityError:
            raise InternalServerError()

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

        return Response({'message': "Reset password link has been sent to your email."}, status=201)


class ResetPassword(APIView):
    def post(self, request, forgot_pass_hash):
        if request.data['password'] != request.data['confirm_password']:
            raise Unauthorized(
                {'message': PASSWORD_MISMATCH_EXCEPTION_MESSAGE})

        try:
            with transaction.atomic():
                try:
                    forgot_pass_entry = ForgotPasswordLink.objects.get(
                        hash=forgot_pass_hash)
                except ForgotPasswordLink.DoesNotExist:
                    raise NotFound({'message': 'Invalid link.'})

                self.verify_link_age(forgot_pass_entry)

                user = forgot_pass_entry.user
                user.set_password(request.data['password'])
                user.save()
                forgot_pass_entry.delete()
        except IntegrityError:
            raise InternalServerError()

        return Response({'message': 'Your password has been reset.'})

    def verify_link_age(self, forgot_pass_entry: ForgotPasswordLink):
        link_age = timezone.now() - forgot_pass_entry.updated_at

        if link_age.seconds > int(env('FORGOT_PASS_VALIDATION_SECONDS')):
            raise InvalidOrExpired(message='Link has expired.')


class ChangePassword(APIView):
    def post(self, request):
        if request.data['new_password'] != request.data['confirm_password']:
            raise Unauthorized(
                {'message': PASSWORD_MISMATCH_EXCEPTION_MESSAGE})

        if request.data['new_password'] == request.data['old_password']:
            raise Unauthorized(
                {'message': "New password and old password cannot be the same."})

        try:
            with transaction.atomic():
                if not check_password(request.data['old_password'], request.auth_user.password):
                    raise Unauthorized(
                        {'message': "Old password does not match with your current password."})

                hashed_password = make_password(request.data['new_password'])
                user = request.auth_user
                user.password = hashed_password
                user.save()
        except IntegrityError:
            raise InternalServerError()

        AUTH_TOKEN = create_auth_token(user.user_id)
        SESSION_TOKEN = create_session_token(user.user_id)

        response = Response(
            {'message': 'Your password has been updated.'}, status=200)
        response.set_cookie(
            key='auth',
            value=AUTH_TOKEN,
            secure=COOKIE_SECURE,
            httponly=True,
            path='/api',
            max_age=int(env('JWT_VALIDATION_SECONDS'))
        )
        response.set_cookie(
            key='session',
            value=SESSION_TOKEN,
            secure=COOKIE_SECURE,
            httponly=True,
            path='/api',
        )
        return response


def generate_profile_id(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for _ in range(length))
    return 'MOK-' + uid


def generate_hash(length=15):
    random_hash = ''.join(secrets.choice(
        string.ascii_letters + string.digits) for _ in range(length))
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


def get_account_verification_mail_message(first_name: str, otp: int, link: str, is_new=True):
    valid_time_hours = int(env('OTP_VALIDATION_SECONDS')) // 3600
    first_mail_intro = 'Welcome to Moksha 2023 Official Website! Verify your email to get started:'
    resend_intro = 'A new OTP has been generated for your account verification:'

    return textwrap.dedent(f'''\
        Hi {first_name},

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
        Dear {user.first_name},

        We have recently received a request to reset the password for your account associated with the email address: {user.email}. If you did not initiate this request, please disregard this email.

        To proceed with resetting your password, please click on the following link or copy and paste it into your web browser:

        {link}

        This link will expire within {valid_time_hours} hour(s). If the link expires, you can initiate a new password reset request through our website.

        If you have any questions or require further assistance, please reply to this email or write an email to {env('EMAIL_HOST_USER')}.

        Cheers,
        Moksha 2023 Tech Team,
        NIT Agartala
    ''')
