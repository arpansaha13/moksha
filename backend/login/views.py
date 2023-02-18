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

class RegisterApi(APIView):
    def post(self, request):
        email = request.data['email']
        if request.data['password'] == request.data['confirm_password']:
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
                user.save()
                send_mail(
                    'Subject here',
                    otp_generated,
                    'bhowmikarghajit@gmail.com',
                    [email],
                    fail_silently=False,
                )
                return Response({'status': 201 ,'message': 'User added successfully!!'})
            return Response({'message': 'User already Exists!'},status=409)
        return Response({'status': 400, 'message': 'Password Not Matched!'})


class LoginApi(APIView):
    def post(self, request):
        email = request.data['email']
        user = User.objects.filter(email=email).first()
        if user:
            print(user.user_id)
            if user.password == request.data['password']:
                if user.otp == '':
                    user.logged_in = True
                    user.save()
                    return Response({'status': 200, 'message': 'User logged in!!'})
                return Response({'status': 403, 'message': 'Please validate your account using otp!!'})
            return Response({'status': 400, 'message': 'Invalid Password!!'})
        return Response({'status': 404, 'message': 'User Not Found!'})


class ForgotApi(APIView):
    def post(self, request):
        email = request.data['email']
        user = User.objects.filter(email=email).first()
        if user:
            new_password=generate_UID()
            send_mail(
                    'Subject here',
                    'Your new password is:'+new_password+' Link will be here.',
                    'bhowmikarghajit@gmail.com',
                    [email],
                    fail_silently=False,
                )
            user.password = new_password
            user.save()
            return Response({'status': 200, 'message': 'Password Changed!!'})
        return Response({'status': 404, 'message': 'User Not Found!'})
    
class ChangePasswordApi(APIView):
    def post(self, request):
        email = request.data['email']
        old_password = request.data['old_password']
        new_password = request.data['new_password']
        user = User.objects.filter(email=email).first()
        if user:
            if user.password==old_password:
                user.password = new_password
                user.save()
                return Response({'status': 200, 'message': 'Password Changed!!'})
            return Response({'status': 200, 'message': 'Password Not Matched!!'})
        return Response({'status': 404, 'message': 'User Not Found!'})


class ViewApi(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UsersSerializers(user, many=True)
        return Response({'status': 200, 'payload' : serializer.data})

class ViewParticularApi(APIView):
    def get(self, request, id):
        print(id)
        user = User.objects.filter(user_id=id).first()
        print(user.email)
        if user:
            serializer = UsersSerializers(user)
            print(serializer.data)
            return Response({'status': 200, 'payload': serializer.data})
        return Response({'status': 404 ,'message':'User Not Found'})


class LogoutApi(APIView):
    def post(self, request):
        email = request.data['email']
        user = User.objects.filter(email=email).first()
        if user:
            user.logged_in = False
            user.save()
            return Response({'status': 200,'message': 'User Logged Out!!'})
        return Response({'status': 404, 'message': 'User Not Found!'})


class OTPValidation(APIView):
    def post(self, request):
        otp = request.data['otp']
        email = request.data['email']
        user = User.objects.filter(email=email).first()
        if user:
            if user.otp == otp:
                user.otp = ''
                user.save()
                return Response({'status': 200, 'message': 'User Validated!!'})
            return Response({'status': 401,'message': 'OTP Not Matched!'})
        return Response({'status': 404, 'message': 'User Not Found!'})


class ResendOtp(APIView):
    def post(self, request):
        email = request.data['email']
        x = random.randint(1000, 9999)
        otp_generated = str(x)
        send_mail(
            'Subject here',
            otp_generated,
            'bhowmikarghajit@gmail.com',
            [email],
            fail_silently=False,
        )
        user = User.objects.filter(email=email).first()
        user.otp = otp_generated
        user.save()
        return Response({'status': 200, 'message': 'Otp Sent!!'})

# Create your views here.

# Generating UIDs
def generate_UID(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits) for i in range(length))
    return 'MOK-' + uid