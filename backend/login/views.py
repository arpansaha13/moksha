from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
import random
import secrets
import string
import jwt
import datetime
from django.contrib.auth.hashers import make_password,check_password

class RegisterApi(APIView):
    def post(self, request):
        email = request.data['email']
        response = Response()
        if request.data['password'] == request.data['confirm_password']:
            main_password=make_password(request.data['password'])
            # print(main_password)
            x = random.randint(1000, 9999)
            otp_generated = str(x)
            user = User.objects.filter(email=email).first()
            uid = generate_UID()
            if user is None or user.otp:
                if user and user.otp:
                    user.delete()
                user1 = User.objects.filter(user_id=uid).first()
                while user1:
                    uid = generate_UID()
                    user1 = User.objects.filter(user_id=uid).first()
                serializer = UsersSerializers(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                user = User.objects.filter(email=email).first()
                user.otp = otp_generated
                user.user_id = uid
                user.password=main_password
                user.save()

                payload = {
                    'id': uid,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                    'iat': datetime.datetime.utcnow(),
                }

                token = jwt.encode(payload, 'secret00', algorithm='HS256')

                response.set_cookie(key='otp', value=token, httponly=True)
                response.cookies['otp'].update({"samesite":"None","secure":True})
                send_mail(
                    'Subject here',
                    otp_generated,
                    'bhowmikarghajit@gmail.com',
                    [email],
                    fail_silently=False,
                )
                response.data = {
                        'message': "Otp validation link is sent.",
                    }
                response.status_code=201
                return response
            response.data = {
                'message': "This email is already registered.",
            }
            response.status_code=409
            return response
        response.data = {
            'message': "Password and confirm password not matched.",
        }
        response.status_code=400
        return response
        

class DetailsUserName(APIView):
    def get(self, request):#?query_param e ?username=something link er last e
        # username=request.data['username']
        username=request.GET.get('username', None)
        user1=User.objects.filter(username__icontains=username).all()
        data=[]
        for i in user1:
            print(i.name)
            serializer = SpecificSerializers(i)
            data.append(serializer.data)
        if not user1:
            return Response({'message': 'User Not Found'}, status=404)

        return Response({'message': 'Success', 'payload': {'details': data}}, status=200)
    
class LoginApi(APIView):
    def post(self, request):
        response = Response()
        try:
            token = request.COOKIES['jwt']

            try:
                payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
                return Response({'message': 'User Already Logged In.'}, status=200)
            except jwt.ExpiredSignatureError:
                email = request.data['email']
                user = User.objects.filter(email=email).first()
                if user:
                    print(user.user_id)
                    payload = {
                        'id': user.user_id,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                        'iat': datetime.datetime.utcnow(),
                    }

                    token = jwt.encode(payload, 'secret00', algorithm='HS256')
                    ans=check_password(request.data['password'], user.password)
                    # print(ans)
                    if ans == True:
                        if user.otp == "":
                            response.set_cookie(key='jwt', value=token, httponly=True)
                            response.cookies['jwt'].update({"samesite":"None","secure":True})
                            user.logged_in = True
                            user.save()
                            response.data = {
                                'message': "User Logged In",
                            }
                            response.status_code=200
                            return response
                        print(user.otp)
                        response.data = {
                            'message': "Please validate your account using otp.",
                        }
                        response.status_code=403
                        return response
                    response.data = {
                        'message': "Invalid Email or Password.",
                    }
                    response.status_code=400
                    return response
                response.data = {
                    'message': "Invalid Email or Password.",
                }
                response.status_code=400
                return response
        except:
        
            email = request.data['email']
            user = User.objects.filter(email=email).first()
            if user:
                print(user.user_id)
                payload = {
                    'id': user.user_id,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                    'iat': datetime.datetime.utcnow(),
                }

                token = jwt.encode(payload, 'secret00', algorithm='HS256')
                ans=check_password(request.data['password'], user.password)
                # print(ans)
                if ans == True:
                    if user.otp == "":
                        response.set_cookie(key='jwt', value=token, httponly=True)
                        response.cookies['jwt'].update({"samesite":"None","secure":True})
                        user.logged_in = True
                        user.save()
                        response.data = {
                            'message': "User Logged In",
                        }
                        response.status_code=200
                        return response
                    print(user.otp)
                    response.data = {
                        'message': "Please validate your account using otp.",
                    }
                    response.status_code=403
                    return response
                response.data = {
                    'message': "Invalid Email or Password.",
                }
                response.status_code=400
                return response
            response.data = {
                'message': "Invalid Email or Password.",
            }
            response.status_code=400
            return response


class ForgotApi(APIView):
    def post(self, request):
        response = Response()
        user_id=request.data['user_id']
        user = User.objects.filter(user_id=user_id).first()
        if user:
            email=user.email
            payload = {
                    'id': user.user_id,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                    'iat': datetime.datetime.utcnow(),
                }

            token = jwt.encode(payload, 'secret00', algorithm='HS256')

            
            response.set_cookie(key='reset', value=token, httponly=True)
            response.cookies['reset'].update({"samesite":"None","secure":True})
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
            response.status_code=200
            return response
        response.data = {
            'message': "User Not Found.",
                }
        response.status_code=404
        return response   

class ChangePasswordApi(APIView):
    def post(self, request):
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
            response.delete_cookie('reset')
            return Response({'message': 'Password Changed.'}, status=200)
        return Response({'message': 'User Not Found.'}, status=404)


class ViewApi(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UsersSerializers(user, many=True)
        return Response({'message': 'Success', 'payload': serializer.data}, status=200)


class ViewParticularApi(APIView):
    def get(self, request):
        token = request.COOKIES['jwt']
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token Expired. Log in again.')
        user = User.objects.filter(user_id=payload['id']).first()
        if user:
            serializer = UsersSerializers(user)
            print(serializer.data)
            return Response({'message': 'Success', 'payload': serializer.data}, status=200)
        return Response({'message': 'User Not Found'}, status=404)


class LogoutApi(APIView):
    def get(self, request):
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
            response.delete_cookie('jwt')
            response.data = {
                'message': 'User have successfully logged out.'
            }
            response.status_code=200
            return response
            
        response.data = {
                'message': 'User Not Found.'
            }
        response.status_code=404
        return response


class OTPValidation(APIView):
    def post(self, request):
        token = request.COOKIES['otp']
        response=Response()
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
                response.delete_cookie('otp')
                return Response({'message': 'User Validated.'}, status=200)
            return Response({'message': 'OTP Not Matched.'}, status=401)
        return Response({'message': 'User Not Found.'}, status=404)


class ResendOtp(APIView):
    def get(self, request):
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
        email=user.email
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

# Create your views here.

# Generating UIDs


def generate_UID(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'MOK-' + uid

def generate_password(length=10):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                for i in range(length))
    return uid
