from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import *
from .models import *
from login.models import *
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterEvent(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        event = request.data['event_name']
        user = User.objects.filter(user_id=user_id)
        # print(user)
        # if user:
        #     user_solo = SoloEvent.objects.filter(user_id=user_id)

        #     if user_solo:
        #         pass

        return Response({'message': 'User not found!'})
