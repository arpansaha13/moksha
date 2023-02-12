from django.shortcuts import render,redirect
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
# from django.core.mail import send_mail

class RegisterApi(APIView):
    def post(self, request):
        email=request.data['email']
        if request.data['password']==request.data['confirm_password']:
            # send_mail(
            #     'Subject here',
            #     'Here is the message.',
            #     'from@gmail.com',
            #     ['to@gmail.com'],
            #     fail_silently=False,
            # )
            user = User.objects.filter(email=email).first()
            if user is None:
                serializer = UsersSerializers(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response({'message': 'User added successfully!'})
            return Response({'message': 'User already Exists!'})
        return Response({'message': 'Password Not Matched!'})

class LoginApi(APIView):
    def post(self, request):
        email=request.data['email']
        user = User.objects.filter(email=email).first()
        if user:
            if user.password==request.data['password']:
                user.logged_in=True
                user.save()
                return Response({'message': 'User logged in!!'})
            return Response({'message': 'Invalid Password!!'})
        return Response({'message': 'User Not Found!'})

class ForgotApi(APIView):
    def post(self, request):
        email=request.data['email']
        password=request.data['new_password']
        user = User.objects.filter(email=email).first()
        if user:
            user.password=password
            user.save()
            return Response({'message': 'Password Changed!!'})
        return Response({'message': 'User Not Found!'})

class ViewApi(APIView):
    def get(self,request):
        user = User.objects.all()
        serializer = UsersSerializers(user, many=True)
        return Response(serializer.data)

class LogoutApi(APIView):
    def post(self, request):
        email=request.data['email']
        user = User.objects.filter(email=email).first()
        if user:
            user.logged_in=False
            user.save()
            return Response({'message': 'User Logged Out!!'})
        return Response({'message': 'User Not Found!'})

                
        
# Create your views here.
