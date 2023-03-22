from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import *
from .models import *
from login.models import *
from login.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import secrets
import string
import jwt
events = {'E-1': ["dance", 3], 'E-2': ["singing", 2],
          'E-3': ["drama", 5], 'E-4': ["acting", 1]}

# SOLO EVENT APIs


class RegisterEvent(APIView):
    def post(self, request):
        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token Expired! Log in again.')

        user = User.objects.filter(user_id=payload['id']).first()
        event_id = request.data['event_id']

        if user:
            user_solo = SoloEvent.objects.filter(
                user_id=user.user_id, event_id=event_id).first()
            if user_solo:
                return Response({'message': "User already registered for the event!"}, status=400)

            serializer = SoloEventSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'User registered successfully!!'}, status=201)

        return Response({'message': 'User not found!'}, status=404)

# GET DETAILS APIs

class DetailsTeamName(APIView):
    def get(self, request):#?query_param e ?username=something link er last e
        # username=request.data['username']
        team_name=request.GET.get('team_name', None)
        user1=Team.objects.filter(team_name__icontains=team_name).all()
        user2=TeamEvent.objects.filter(team_name__icontains=team_name).all()
        team_details,participation=[],[]
        if not user1:
            return Response({'message': 'Team Not Found'}, status=404)
        for i in user1:
            serializer = TeamSerializers(i)
            team_details.append(serializer.data)

        if not user2:
            pass
        for i in user2:
            serializer = TeamEventSerializers(i)
            participation.append(serializer.data)
        return Response({'message': 'Success', 'payload': {'team_details': team_details,'team_participation':participation}}, status=200)

class EventDetails(APIView):
    def get(self, request, id):#?query_param e ?username=something link er last e
        SE_events = SoloEvent.objects.filter(user_id=id).all()
        TE_events = TeamEvent.objects.filter(user_id=id).all()

        serializer = SoloEventSerializers(SE_events, many=True)
        serializer1 = TeamEventSerializers(TE_events, many=True)

        # Arpan koise
        # if serializer.data == [] and serializer1.data == []:
        #     return Response({'message': "No registered events!"}, status=404)

        return Response({'message': 'Success', 'payload': {'solo_event': serializer.data, 'team_event': serializer1.data}}, status=200)

class EventDetailsUserName(APIView):
    def get(self, request):#?query_param e ?username=something link er last e
        # username=request.data['username']
        username=request.GET.get('username', None)
        user1=User.objects.filter(username=username).first()
        id=user1.id
        SE_events = SoloEvent.objects.filter(user_id=id).all()
        TE_events = TeamEvent.objects.filter(user_id=id).all()

        serializer = SoloEventSerializers(SE_events, many=True)
        serializer1 = TeamEventSerializers(TE_events, many=True)

        # Arpan koise
        # if serializer.data == [] and serializer1.data == []:
        #     return Response({'message': "No registered events!"}, status=404)

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
# class EventAll(APIView):
#     def get(self, request):
#         user = EventDetail.objects.all()
#         serializer = EventDetailSerializers(user, many=True)
#         return Response({'message': 'Success', 'payload': serializer.data}, status=200)


# class EventParticular(APIView):
#     def post(self, request):
#         event_id = request.data['event_id']
#         user = EventDetail.objects.filter(event_id=event_id).first()
#         if user is None:
#             return Response({'message': 'No such event found'}, status=404)
#         serializer = EventDetailSerializers(user)
#         return Response({'message': 'Success', 'payload': serializer.data}, status=200)


# class AddEvent(APIView):
#     def post(self, request):
#         event_id = request.data['event_id']
#         user = EventDetail.objects.filter(event_id=event_id).first()
#         if user:
#             return Response({'message': 'Event already exists'}, status=400)

#         serializer = EventDetailSerializers(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'message': 'Event added successfully'}, status=200)


# TEAM EVENT APIs
class CreateTeam(APIView):
    def post(self, request):
        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token Expired! Log in again.')

        user_1= User.objects.filter(user_id=payload['id']).first()
        if user_1 is None:
            return Response({'message': 'Unregistered User!'}, status=403)

        user = Team.objects.filter(leader_id=user_1.user_id).first()

        if not user:
            uid = generate_UID()
            user1 = Team.objects.filter(team_id=uid).first()
            while user1:
                uid = generate_UID()
                user1 = Team.objects.filter(team_id=uid).first()
            format_data = {'team_id': uid, 'team_name': request.data['team_name'],'leader_id':user_1.user_id}
            serializer = TeamSerializers(data=format_data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            format_data = {'team_id': uid,'user_id':user_1.user_id}
            serializer = TeamUserRegistrationsSerializers(data=format_data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({'message': 'Team created successfully!!', 'payload': {'team_id': user.team_id}}, status=201)

        return Response({'message': 'Team Already Exists!'}, status=400)


class JoinTeam(APIView):
    def post(self, request):
        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token Expired! Log in again.')

        user_id = payload['id']
        team_id = request.data['team_id']

        user = TeamUserRegistrations.objects.filter(team_id=team_id).all()

        user1 = Team.objects.filter(leader_id=user_id).first()
        if user1:
            return Response({'message': 'Each user can create only one team but join any!!'}, status=403)

        if user:
            if user.count < 5:
                format_data = {'team_id': team_id,'user_id':user_id}
                serializer = TeamUserRegistrationsSerializers(data=format_data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response({'message': 'Member Added!!'}, status=201)
            return Response({'message': 'Team Full!'}, status=400)
        return Response({'message': 'Team Doesnot Exists!'}, status=404)


class TeamEventRegistration(APIView):
    def post(self, request):
        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token Expired! Log in again.')

        user_id = payload['id']
        event_id = request.data['event_id']
        user = Team.objects.filter(
            leader=user_id).first()

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

                        user3 = TeamUserRegistrations.objects.filter(
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

class CreatedTeamsApi(APIView):
    def get(self, request):
        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token Expired! Log in again.')
        user_id=payload['id']
        user=Team.objects.filter(leader_id=user_id).all()
        joined_teams=[]
        if not user:
            return Response({'message': 'Success', 'payload': joined_teams}, status=200)
        for i in user:
            user3=TeamUserRegistrations.objects.filter(team_id=i.team_id).all()
            data={'team_id':i.team_id,'team_name':i.team_name,'team_count':user3.count}
            joined_teams.append(data)
        return Response({'message': 'Success', 'payload': joined_teams}, status=200)

class JoinedTeamsApi(APIView):
    def get(self, request):
        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token Expired! Log in again.')
        user_id=payload['id']
        user=Team.objects.filter(leader_id=user_id).first()
        if user:
            team_id=user.team_id

        user1=TeamUserRegistrations.objects.filter(user_id=user_id).all()
        joined_teams=[]
        if not user1:
            return Response({'message': 'Success', 'payload': joined_teams}, status=200)
        for i in user1:
            if user:
                if i.team_id!=team_id:
                    user2=Team.objects.filter(team_id=i.team_id).first()
                    user3=TeamUserRegistrations.objects.filter(team_id=i.team_id).all()
                    data={'team_id':i.team_id,'team_name':user2.team_name,'team_count':user3.count}
                    joined_teams.append(data)
            else:
                user2=Team.objects.filter(team_id=i.team_id).first()
                user3=TeamUserRegistrations.objects.filter(team_id=i.team_id).all()
                data={'team_id':i.team_id,'team_name':user2.team_name,'team_count':user3.count}
                joined_teams.append(data)
        return Response({'message': 'Success', 'payload': joined_teams}, status=200)

class TeamUserDetails(APIView):
    def get(self, request,team_id):#?query_param e ?username=something link er last e
        # username=request.data['username']
        user1=TeamUserRegistrations.objects.filter(team_id=team_id).all()
        joined_teams=[]
        if not user1:
            return Response({'message': 'Success', 'payload': joined_teams}, status=200)
        for i in user1:
            user3=User.objects.filter(user_id=i.user_id).first()
            serializer = SpecificSerializers(user3)
            joined_teams.append(serializer.data)
        return Response({'message': 'Success', 'payload': joined_teams}, status=200)

        # Arpan koise
        # if serializer.data == [] and serializer1.data == []:
        #     return Response({'message': "No registered events!"}, status=404)

        return Response({'message': 'Success', 'payload': {'solo_event': serializer.data, 'team_event': serializer1.data}}, status=200)

def generate_UID(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'T-' + uid
