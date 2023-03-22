from django.shortcuts import render
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import *
from .models import *
from login.models import *
from solo_events.models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
import random
import secrets
import string
import jwt
import datetime
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
class CreateInvite(APIView):
    def post(self, request):
        team_id=request.data.get('team_id')
        user_id=request.data.get('user_id')
        user = Invite.objects.filter(team_id=team_id,user_id=user_id,status='pending').first()
        user1=TeamUserRegistrations.objects.filter(team_id=team_id,user_id=user_id).first()
        if user1:
            return Response({'message': 'Already in Team'}, status=409)
        if not user:
           serializer = InviteSerializers(data=request.data)
           serializer.is_valid(raise_exception=True)
           serializer.save()
           return Response({'message': 'Invite Created'}, status=200)
        return Response({'message': 'Already Invited'}, status=409)

class ViewInvite(APIView):
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
            new_password = request.data['new_password']
            user = Invite.objects.filter(user_id=payload['id'],status='pending').all()
            details=[]
            if user:
                for i in user:
                    serializer = SpecificInviteSerializers(i)
                    details.append(serializer.data)
                # response.cookies['reset'].update(
                #     {"samesite": "None", "secure": True})
                # response.delete_cookie('reset')
                response.data = {
                    'payload': details,
                }
                response.status_code = 200
                return response
            response.data = {
                'payload': details,
            }
            response.status_code = 200
            return response
        except:
            return Response({'message': 'Unauthorized.'}, status=401)

class AcceptInvite(APIView):
    def get(self, request,id):
        user = Invite.objects.filter(id=id).first()
        if user:
            if user.status!='accepted':
               user.status='accepted'
               return Response({'message': 'Accepted'}, status=200)
            return Response({'message': 'Already Accepted'}, status=404)
        return Response({'message': 'Invite Not Found'}, status=404)

class RejectInvite(APIView):
    def get(self, request,id):
        user = Invite.objects.filter(id=id).first()
        if user:
            if user.status!='rejected':
               user.status='rejected'
               return Response({'message': 'Rejected'}, status=200)
            return Response({'message': 'Already Rejected'}, status=404)
        return Response({'message': 'Invite Not Found'}, status=404)