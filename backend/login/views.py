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
                return Response({'message': 'User added successfully!!'}, status=201)
            return Response({'message': 'User already Exists!'}, status=409)
        return Response({'message': 'Password Not Matched!'}, status=400)


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
                    return Response({'message': 'User logged in!!'}, status=200)
                return Response({'message': 'Please validate your account using otp!!'}, status=403)
            return Response({'message': 'Invalid Password!!'}, status=400)
        return Response({'message': 'User Not Found!'}, status=404)


class ForgotApi(APIView):
    def post(self, request):
        email = request.data['email']
        user = User.objects.filter(email=email).first()
        if user:
            new_password = generate_password()
            send_mail(
                'Subject here',
                'Your new password is: '+new_password+'. Link will be here.',
                'bhowmikarghajit@gmail.com',
                [email],
                fail_silently=False,
            )
            user.password = new_password
            user.save()
            return Response({'message': 'A new password has been sent to your mail. Use it to set new password!'}, status=200)
        return Response({'message': 'User Not Found!'}, status=404)


class ChangePasswordApi(APIView):
    def post(self, request):
        email = request.data['email']
        old_password = request.data['old_password']
        new_password = request.data['new_password']
        user = User.objects.filter(email=email).first()
        if user:
            if user.password == old_password:
                user.password = new_password
                user.save()
                return Response({'message': 'Password Changed!!'}, status=200)
            return Response({'message': 'Password Not Matched!!'}, status=400)
        return Response({'message': 'User Not Found!'}, status=404)


class ViewApi(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UsersSerializers(user, many=True)
        return Response({'message': 'Success', 'payload': serializer.data}, status=200)


class ViewParticularApi(APIView):
    def get(self, request, id):
        user = User.objects.filter(user_id=id).first()
        if user:
            serializer = UsersSerializers(user)
            print(serializer.data)
            return Response({'message': 'Success', 'payload': serializer.data}, status=200)
        return Response({'message': 'User Not Found'}, status=404)


class LogoutApi(APIView):
    def post(self, request):
        email = request.data['email']
        user = User.objects.filter(email=email).first()
        if user:
            user.logged_in = False
            user.save()
            return Response({'message': 'User Logged Out!!'}, status=200)
        return Response({'message': 'User Not Found!'}, status=404)


class OTPValidation(APIView):
    def post(self, request):
        otp = request.data['otp']
        email = request.data['email']
        user = User.objects.filter(email=email).first()
        if user:
            if user.otp == otp:
                user.otp = ''
                user.save()
                return Response({'message': 'User Validated!!'}, status=200)
            return Response({'message': 'OTP Not Matched!'}, status=401)
        return Response({'message': 'User Not Found!'}, status=404)


class ResendOtp(APIView):
    def post(self, request):
        email = request.data['email']
        user = User.objects.filter(email=email).first()
        if user is None:
            return Response({'message': 'User Not Found!'}, status=404)
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
        return Response({'message': 'Otp Sent!!'}, status=200)

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