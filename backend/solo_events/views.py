from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import *
from .models import *
from login.models import *
from rest_framework.views import APIView
from rest_framework.response import Response
import secrets
import string
events={'E-1':["dance",3],'E-2':["singing",2],'E-3':["drama",5],'E-4':["acting",1]}

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
            print(request.data)
            serializer = SoloEventSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'status': 201, 'message': 'User registered successfully!!'})
        
        return Response({'status': 404, 'message': 'User not found!'})


# Create POST API for fetching registered solo and group events for a User.
class EventDetails(APIView):
    def post(self, request):
        user_id = request.data['user_id']

        SE_events = SoloEvent.objects.filter(user_id=user_id).all()
        TE_events=TeamEvent.objects.filter(user_id=user_id).all()
        if SE_events is None and TE_events is None:
            return Response({'status': 404, 'message': "No registered solo events!"})
        
        serializer = SoloEventSerializers(SE_events, many=True)
        serializer1 = TeamEventSerializers(TE_events, many=True)

        return Response({'status': 200, 'payload1': serializer.data, 'payload2': serializer1.data})

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
        user1=TeamDetail.objects.filter(leader=user_id).first()
        if user1:
            return Response({'status': 200, 'message': 'Each user can create only one team but join any!!'})
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

class TeamEventRegistration(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        event_id=request.data['event_id']
        user = TeamDetail.objects.filter(user_id=user_id,leader=user_id).first()
        # print(user)
        if user:
            user1=TeamEvent.objects.filter(team_id=user.team_id,event_id=event_id).first()
            if user1:
                return Response({'status': 200, 'message': 'Team Already Registered'})
            team_size=events[event_id][1]
            for i in range(1,team_size+1):
                field="Participant"+str(i)

                try:
                    if request.data[field]:
                        user2=TeamEvent.objects.filter(user_id=request.data[field],event_id=event_id).first()
                        
                        user3=TeamDetail.objects.filter(user_id=request.data[field],team_id=user.team_id).first()
                        if not user3:
                            return Response({'status': 200, 'message': 'Invalid Operation'})
                        
                        if user2:
                            return Response({'status': 200, 'message': field+' Already Registered'})
                        format_data={'user_id':request.data[field],'team_id':user.team_id,'team_name':user.team_name,'event_id':request.data['event_id'],'event_name':events[event_id][0],'leader':user.user_id}
                        serializer = TeamEventSerializers(data=format_data)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()
                except:
                    break
            return Response({'status': 200, 'message': 'Event Registered'})
        return Response({'status': 403, 'message': 'Invalid Registration'})

def generate_UID(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits) for i in range(length))
    return 'T-' + uid

