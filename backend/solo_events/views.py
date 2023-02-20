from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import *
from .models import *
from login.models import *
from rest_framework.views import APIView
from rest_framework.response import Response
import secrets
import string
events = {'E-1': ["dance", 3], 'E-2': ["singing", 2],
          'E-3': ["drama", 5], 'E-4': ["acting", 1]}

# SOLO EVENT APIs


class RegisterEvent(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        event_id = request.data['event_id']

        user = User.objects.filter(user_id=user_id).first()
        # print(user)
        if user:
            user_solo = SoloEvent.objects.filter(
                user_id=user_id, event_id=event_id).first()
            if user_solo:
                return Response({'message': "User already registered for the event!"}, status=400)
            print(request.data)
            serializer = SoloEventSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'User registered successfully!!'}, status=201)

        return Response({'message': 'User not found!'}, status=404)

# GET DETAILS APIs


class EventDetails(APIView):
    def get(self, request, id):
        SE_events = SoloEvent.objects.filter(user_id=id).all()
        TE_events = TeamEvent.objects.filter(user_id=id).all()

        serializer = SoloEventSerializers(SE_events, many=True)
        serializer1 = TeamEventSerializers(TE_events, many=True)

        if serializer.data == [] and serializer1.data == []:
            return Response({'message': "No registered events!"}, status=404)

        return Response({'message': 'Success', 'payload': {'solo_event': serializer.data, 'team_event': serializer1.data}}, status=200)


class SoloEventsApi(APIView):
    def get(self, request):
        user = SoloEvent.objects.all()
        serializer = SoloEventSerializers(user, many=True)
        return Response({'message': 'Success', 'payload': serializer.data}, status=200)


class TeamEventsApi(APIView):
    def get(self, request):
        user = TeamEvent.objects.all()
        serializer = TeamEventSerializers(user, many=True)
        return Response({'message': 'Success', 'payload': serializer.data}, status=200)


# EVENT DB APIs
class EventAll(APIView):
    def get(self, request):
        user = EventDetail.objects.all()
        serializer = EventDetailSerializers(user, many=True)
        return Response({'message': 'Success', 'payload': serializer.data}, status=200)


class EventParticular(APIView):
    def post(self, request):
        event_id = request.data['event_id']
        user = EventDetail.objects.filter(event_id=event_id).first()
        if user is None:
            return Response({'message': 'No such event found'}, status=404)
        serializer = EventDetailSerializers(user)
        return Response({'message': 'Success', 'payload': serializer.data}, status=200)


class AddEvent(APIView):
    def post(self, request):
        event_id = request.data['event_id']
        user = EventDetail.objects.filter(event_id=event_id).first()
        if user:
            return Response({'message': 'Event already exists'}, status=400)
        
        serializer = EventDetailSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Event added successfully'}, status=200)


# TEAM EVENT APIs
class CreateTeam(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        user_1 = User.objects.filter(user_id=user_id).first()
        if user_1 is None:
            return Response({'message': 'Unregistered User!'}, status=403)
        
        user = TeamDetail.objects.filter(leader=user_id).first()
        # print(user)
        if not user:
            serializer = TeamDetailsSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            user = TeamDetail.objects.filter(user_id=user_id).first()
            user.leader = user_id
            uid = generate_UID()
            user1 = TeamDetail.objects.filter(team_id=uid).first()
            while user1:
                uid = generate_UID()
                user1 = TeamDetail.objects.filter(team_id=uid).first()
            user.team_id = uid
            user.count += 1
            user.save()

            return Response({'message': 'Team created successfully!!', 'payload': {'team_id': user.team_id}}, status=201)

        return Response({'message': 'Team Already Exists!'}, status=400)


class JoinTeam(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        team_id = request.data['team_id']

        user = TeamDetail.objects.filter(team_id=team_id).first()
        user1 = TeamDetail.objects.filter(leader=user_id).first()
        if user1:
            return Response({'message': 'Each user can create only one team but join any!!'}, status=403)
        # print(user)
        if user:
            if user.count < 5:
                serializer = TeamDetailsSerializers(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                user1 = TeamDetail.objects.filter(user_id=user_id).first()
                user1.team_name = user.team_name
                user.count += 1
                user.save()
                user1.save()
                return Response({'message': 'Member Added!!'}, status=201)
            return Response({'message': 'Team Full!'}, status=400)
        return Response({'message': 'Team Doesn\'t Exists!'}, status=404)


class TeamEventRegistration(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        event_id = request.data['event_id']
        user = TeamDetail.objects.filter(
            user_id=user_id, leader=user_id).first()
        # print(user)
        if user:
            user1 = TeamEvent.objects.filter(
                team_id=user.team_id, event_id=event_id).first()
            if user1:
                return Response({'message': 'Team Already Registered'}, status=400)
            team_size = events[event_id][1]
            for i in range(1, team_size+1):
                field = "Participant"+str(i)

                try:
                    if request.data[field]:
                        user2 = TeamEvent.objects.filter(
                            user_id=request.data[field], event_id=event_id).first()

                        user3 = TeamDetail.objects.filter(
                            user_id=request.data[field], team_id=user.team_id).first()
                        if not user3:
                            return Response({'message': 'Participant belongs to another Team'}, status=400)

                        if user2:
                            return Response({'message': field+' Already Registered'}, status=409)
                        format_data = {'user_id': request.data[field], 'team_id': user.team_id, 'team_name': user.team_name,
                                       'event_id': request.data['event_id'], 'event_name': events[event_id][0], 'leader': user.user_id}
                        serializer = TeamEventSerializers(data=format_data)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()
                except:
                    break
            return Response({'message': 'Team event registered successfully!'}, status=200)
        return Response({'message': 'Only Leader can register for Team Events'}, status=403)


def generate_UID(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'T-' + uid
