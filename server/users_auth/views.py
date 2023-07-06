from rest_framework.exceptions import APIException
from users.models import User
from users.serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from datetime import datetime, timedelta
from django.contrib.auth.hashers import make_password, check_password
from django.utils.decorators import method_decorator
from common.middleware import jwt_exempt
import random
import secrets
import string
import jwt
import environ # Pylance does not recognize this import for some reason but the dev server runs perfectly

env = environ.Env()
environ.Env.read_env()

class CheckAuth(APIView):
    def get(self, request):
        return Response({
            'avatar_idx': request.auth_user.avatar_idx,
            'user_id': request.auth_user.user_id,
        }, status=200)

class Register(APIView):
    def post(self, request):
        if request.data['password'] != request.data['confirm_password']:
            return Response({'message': "Password and confirm password do not match."}, status=401)

        user = User.objects.filter(username=request.data['username']).first()

        if user:
            return Response({'message': "This username is already taken."}, status=409)

        email = request.data['email']
        user = User.objects.filter(email=email).first()
        uid = generate_uid()

        if user is None or user.otp:
            if user and user.otp:
                user.delete()

            temp_user = User.objects.filter(user_id=uid).first()
            while temp_user:
                uid = generate_uid()
                temp_user = User.objects.filter(user_id=uid).first()

            otp_generated = str(random.randint(1000, 9999))
            hashed_password = make_password(request.data['password'])

            new_user = User(
                user_id = uid,
                avatar_idx = request.data['avatar_idx'],
                name = request.data['name'],
                institution = request.data['institution'],
                phone_no = request.data['phone_no'],
                email = email,
                username = request.data['username'],
                password = hashed_password,
                otp = otp_generated
            )
            new_user.save()

            payload = {
                'id': uid,
                'exp': datetime.utcnow() + timedelta(minutes=60),
                'iat': datetime.utcnow(),
            }

            token = jwt.encode(payload, env('JWT_SECRET'), algorithm=env('JWT_ALGO'))

            send_mail(
                'Moksha OTP',
                otp_generated,
                env('EMAIL_HOST_USER'),
                [email],
                fail_silently=False,
            )

            response = Response()
            response.set_cookie(key='otp', value=token, httponly=True, domain=env('COOKIE_DOMAIN'))
            response.data = {'message': "Otp validation link is sent."}
            response.status_code = 201
            return response

        return Response({'message': "This email is already registered."}, status=409)

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

class Login(APIView):
    def post(self, request):
        email = request.data['email']
        user = User.objects.filter(email=email).first()

        if not user:
            raise unauthenticated('Invalid email or password.')

        payload = {
            'id': user.user_id,
            'exp': datetime.utcnow() + timedelta(minutes=60),
            'iat': datetime.utcnow(),
        }

        token = jwt.encode(payload, env('JWT_SECRET'), algorithm=env('JWT_ALGO'))
        password_matched = check_password(request.data['password'], user.password)

        if password_matched == False:
            raise unauthenticated('Invalid email or password.')

        response = Response()

        if user.otp == "":
            response.set_cookie(key='jwt', value=token, httponly=True, domain=env('COOKIE_DOMAIN'))

            response.data = UserSerializer(user).data
            response.status_code = 200
            return response

        response.data = { 'message': "Please validate your account using otp." }
        response.status_code = 403
        return response

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ForgotPassword(APIView):
    def post(self, request):
        response = Response()
        user_id = request.data['email']
        user = User.objects.filter(email=user_id).first()
        if user:
            email = user.email
            payload = {
                'id': user.user_id,
                'exp': datetime.utcnow() + timedelta(minutes=60),
                'iat': datetime.utcnow(),
            }

            token = jwt.encode(payload, env('JWT_SECRET'), algorithm=env('JWT_ALGO'))

            response.set_cookie(key='reset', value=token, httponly=True, domain=env('COOKIE_DOMAIN'))

            send_mail(
                'Subject here',
                'Your reset password link is here. It will be valid for 1hr.',
                'bhowmikarghajit@gmail.com',
                [email],
                fail_silently=False,
            )

            response.data = {
                'message': "Reset Password Link is Sent.",
            }
            response.status_code = 200
            return response
        response.data = {
            'message': "User Not Found.",
        }
        response.status_code = 404
        return response


    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ChangePassword(APIView):
    def post(self, request):
        try:
            token = request.COOKIES['reset']
            response = Response()
            if not token:
                raise unauthenticated()

            try:
                payload = jwt.decode(token, env('JWT_SECRET'), algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise unauthenticated('Token Expired. Log in again.')
            new_password = request.data['new_password']
            user = User.objects.filter(user_id=payload['id']).first()
            if user:
                user.password = make_password(new_password)
                user.save()
                response.set_cookie('reset', max_age=1, httponly=True, domain=env('COOKIE_DOMAIN'))

                response.data = {'message': "Password Changed."}
                response.status_code = 200
                return response
            response.data = {
                'message': "User Not Found.",
            }
            response.status_code = 404
            return response
        except:
            return Response({'message': 'Unauthorized.'}, status=401)


    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class Logout(APIView):
    def get(self, request):
        try:
            token = request.COOKIES['jwt']
            response = Response()
            if not token:
                raise unauthenticated()

            try:
                payload = jwt.decode(token, env('JWT_SECRET'), algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise unauthenticated('Token Expired. Log in again.')
            user = User.objects.filter(user_id=payload['id']).first()
            if user:
                response.set_cookie('jwt', max_age=1, httponly=True, domain=env('COOKIE_DOMAIN'))

                response.data = {
                    'message': 'User have successfully logged out.'
                }
                response.status_code = 200
                return response

            response.data = {
                'message': 'User Not Found.'
            }
            response.status_code = 404
            return response
        except:
            return Response({'message': 'Unauthorized.'}, status=401)


class OTPValidation(APIView):
    def post(self, request):
        try:
            token = request.COOKIES['otp']
            response = Response()
            if not token:
                raise unauthenticated()

            try:
                payload = jwt.decode(token, env('JWT_SECRET'), algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise unauthenticated('Token Expired. Log in again.')
            user = User.objects.filter(user_id=payload['id']).first()
            otp = request.data['otp']
            if user:
                if user.otp == otp:
                    user.otp = ''
                    user.save()
                    response.set_cookie('otp', max_age=1, httponly=True, domain=env('COOKIE_DOMAIN'))

                    response.data = {
                        'message': 'User Validated.'
                    }
                    response.status_code = 200
                    return response
                response.data = {
                    'message': 'Invalid OTP.'
                }
                response.status_code = 404
                return response
            response.data = {
                'message': 'User Not Found.'
            }
            response.status_code = 404
            return response
        except:
            return Response({'message': 'Unauthorized.'}, status=401)

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ResendOtp(APIView):
    def get(self, request):
        try:
            token = request.COOKIES['otp']
            if not token:
                raise unauthenticated()

            try:
                payload = jwt.decode(token, env('JWT_SECRET'), algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise unauthenticated('Token Expired. Log in again.')
            user = User.objects.filter(user_id=payload['id']).first()

            if user is None:
                return Response({'message': 'User Not Found.'}, status=404)
            email = user.email
            x = random.randint(1000, 9999)
            otp_generated = str(x)
            send_mail(
                'Subject here',
                otp_generated,
                'bhowmikarghajit@gmail.com',
                [email],
                fail_silently=False,
            )
            user.otp = otp_generated
            user.save()
            return Response({'message': 'Otp Sent.'}, status=200)
        except:
            return Response({'message': 'Unauthorized.'}, status=401)

def generate_uid(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'MOK-' + uid

def unauthenticated(message = 'Unauthenticated'):
    exception = APIException({ 'message': message })
    exception.status_code = 401
    return exception
