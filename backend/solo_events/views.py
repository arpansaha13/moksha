from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import *
from .models import *
from login.models import *
from rest_framework.views import APIView
from rest_framework.response import Response
import secrets
import string


class RegisterEvent(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        event_id = request.data['event_id']

        user = User.objects.filter(user_id=user_id).first()
        # print(user)
        if user:
            user_solo = SoloEvent.objects.filter(user_id=user_id, event_id=event_id).first()
            if user_solo:
                return Response({'status': 409, 'message': "User already registered for the event!"})
            
            serializer = SoloEventSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'status': 201, 'message': 'User registered successfully!!'})
        
        return Response({'status': 404, 'message': 'User not found!'})


# Create POST API for fetching registered solo and group events for a User.
class EventDetails(APIView):
    def post(self, request):
        user_id = request.data['user_id']

        user_events = SoloEvent.objects.filter(user_id=user_id).all()
        if user_events is None:
            return Response({'status': 404, 'message': "No registered solo events!"})
        
        serializer = SoloEventSerializers(user_events, many=True)

        return Response({'status': 200, 'payload': serializer.data})

class SoloEventsApi(APIView):
    def get(self, request):
        user = SoloEvent.objects.all()
        serializer = SoloEventSerializers(user, many=True)
        return Response({'status': 200, 'payload': serializer.data})

class TeamEventsApi(APIView):
    def get(self, request):
        user = TeamEvent.objects.all()
        serializer = TeamEventSerializers(user, many=True)
        return Response({'status': 200, 'payload': serializer.data})

class CreateTeam(APIView):
    def post(self, request):
        user_id = request.data['user_id']

        user = TeamDetail.objects.filter(leader=user_id).first()
        # print(user)
        if not user:
            serializer = TeamDetailsSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            user=TeamDetail.objects.filter(user_id=user_id).first()
            user.leader=user_id
            uid = generate_UID()
            user1=TeamDetail.objects.filter(team_id=uid).first()
            while user1:
                    uid = generate_UID()             
                    user1 = TeamDetail.objects.filter(team_id=uid).first()
            user.team_id=uid
            user.count+=1
            user.save()

            return Response({'status': 200,'payload':{'team_id': user.team_id}})
        
        return Response({'status': 400, 'message': 'Team Already Exists!'})

class JoinTeam(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        team_id = request.data['team_id']

        user = TeamDetail.objects.filter(team_id=team_id).first()
        # print(user)
        if user:
            if user.count<5:
                serializer = TeamDetailsSerializers(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                user1=TeamDetail.objects.filter(user_id=user_id).first()
                user1.team_name=user.team_name
                user.count+=1
                user.save()
                user1.save()
                return Response({'status': 200, 'message': 'Member Added!!'})
            return Response({'status': 400, 'message': 'Team Full!'})
        return Response({'status': 404, 'message': 'Team Doesn\'t Exists!'})

class EventRegistration(APIView):
    def post(self, request):
        user_id = request.data['user_id']

        user = TeamDetail.objects.filter(user_id=user_id).first()
        # print(user)
        if user:
            if user.count<5:
                serializer = TeamDetailsSerializers(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                user1=TeamDetail.objects.filter(user_id=user_id).first()
                user1.team_name=user.team_name
                user.count+=1
                user.save()
                user1.save()
                return Response({'status': 200, 'message': 'Member Added!!'})
            return Response({'status': 400, 'message': 'Team Full!'})
        return Response({'status': 404, 'message': 'Team Doesn\'t Exist!'})

def generate_UID(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits) for i in range(length))
    return 'T-' + uid

