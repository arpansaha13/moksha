from rest_framework.exceptions import AuthenticationFailed
from users.serializers import *
from users.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
import random
import secrets
import string
import jwt
import datetime
from django.contrib.auth.hashers import make_password, check_password
from django.utils.decorators import method_decorator
from backend.middleware import jwt_exempt

import environ # Pylance does not recognize this import for some reason but the dev server runs perfectly

env = environ.Env()
environ.Env.read_env()

class RegisterApi(APIView):
    def post(self, request):
        email = request.data['email']
        response = Response()
        if request.data['password'] == request.data['confirm_password']:
            main_password = make_password(request.data['password'])
            # print(main_password)
            x = random.randint(1000, 9999)
            otp_generated = str(x)
            user = User.objects.filter(email=email).first()
            user1 = User.objects.filter(
                username=request.data['username']).first()
            if user1:
                response.data = {
                    'message': "This username is already taken.",
                }
                response.status_code = 409
                return response
            uid = generate_UID()
            if user is None or user.otp:
                if user and user.otp:
                    user.delete()
                user1 = User.objects.filter(user_id=uid).first()
                while user1:
                    uid = generate_UID()
                    user1 = User.objects.filter(user_id=uid).first()
                serializer = UserSerializers(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                user = User.objects.filter(email=email).first()
                user.otp = otp_generated
                user.user_id = uid
                user.password = main_password
                user.save()

                payload = {
                    'id': uid,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                    'iat': datetime.datetime.utcnow(),
                }

                token = jwt.encode(payload, 'secret00', algorithm='HS256')

                response.set_cookie(key='otp', value=token, httponly=True)

                send_mail(
                    'Moksha OTP',
                    otp_generated,
                    env('EMAIL_HOST_USER'),
                    [email],
                    fail_silently=False,
                )
                response.data = {
                    'message': "Otp validation link is sent.",
                }
                response.status_code = 201
                return response
            response.data = {
                'message': "This email is already registered.",
            }
            response.status_code = 409
            return response
        response.data = {
            'message': "Password and confirm password not matched.",
        }
        response.status_code = 400
        return response

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

class LoginApi(APIView):
    def post(self, request):
        try:
            token = request.COOKIES['jwt']
            payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
            return Response({'message': 'User already logged in.'}, status=200)
        except:
            email = request.data['email']
            user = User.objects.filter(email=email).first()

            if not user:
                raise AuthenticationFailed({'message': 'Invalid email or password.'})

            payload = {
                'id': user.user_id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow(),
            }

            token = jwt.encode(payload, 'secret00', algorithm='HS256')
            password_matched = check_password(request.data['password'], user.password)

            if password_matched == False:
                raise AuthenticationFailed({'message': 'Invalid email or password.'})

            response = Response()

            if user.otp == "":
                response.set_cookie(key='jwt', value=token, httponly=True)

                user.logged_in = True
                user.save()

                response.data = { 'message': "User logged in" }
                response.status_code = 200
                return response

            response.data = { 'message': "Please validate your account using otp." }
            response.status_code = 403
            return response

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ForgotApi(APIView):
    def post(self, request):
        response = Response()
        user_id = request.data['email']
        user = User.objects.filter(email=user_id).first()
        if user:
            email = user.email
            payload = {
                'id': user.user_id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow(),
            }

            token = jwt.encode(payload, 'secret00', algorithm='HS256')

            response.set_cookie(key='reset', value=token, httponly=True)
            # response.cookies['reset'].update(
            #     {"samesite": "None", "secure": True})
            # new_password = generate_password()
            send_mail(
                'Subject here',
                'Your reset password link is here.It will be valid for 1hr.',
                'bhowmikarghajit@gmail.com',
                [email],
                fail_silently=False,
            )
            # user.password = new_password
            # user.save()
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


class ChangePasswordApi(APIView):
    def post(self, request):
        try:
            token = request.COOKIES['reset']
            response = Response()
            if not token:
                raise AuthenticationFailed('Unauthenticated')

            try:
                payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Token Expired. Log in again.')
            new_password = request.data['new_password']
            user = User.objects.filter(user_id=payload['id']).first()
            if user:

                user.password = make_password(new_password)
                user.save()
                response.set_cookie('reset', max_age=1, httponly=True)
                # response.cookies['reset'].update(
                #     {"samesite": "None", "secure": True})
                # response.delete_cookie('reset')
                response.data = {
                    'message': "Password Changed.",
                }
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


class LogoutApi(APIView):
    def get(self, request):
        try:
            token = request.COOKIES['jwt']
            response = Response()
            if not token:
                raise AuthenticationFailed('Unauthenticated')

            try:
                payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Token Expired. Log in again.')
            user = User.objects.filter(user_id=payload['id']).first()
            if user:
                user.logged_in = False
                user.save()
                response.set_cookie('jwt', max_age=1, httponly=True)
                # response.cookies['jwt'].update(
                #     {"samesite": "None", "secure": True})

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
                raise AuthenticationFailed('Unauthenticated')

            try:
                payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Token Expired. Log in again.')
            user = User.objects.filter(user_id=payload['id']).first()
            otp = request.data['otp']
            if user:
                if user.otp == otp:
                    user.otp = ''
                    user.save()
                    response.set_cookie('otp', max_age=1, httponly=True)
                    # response.cookies['otp'].update({"samesite": "None", "secure": True})
                    # response.delete_cookie('otp')
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
                raise AuthenticationFailed('Unauthenticated')

            try:
                payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Token Expired. Log in again.')
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


# Generating UIDs

def generate_UID(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'MOK-' + uid

def generate_password(length=10):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return uid
