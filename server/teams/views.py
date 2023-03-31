from django.db.models import Q
from rest_framework.serializers import ReturnDict, ReturnList
from .serializers import TeamSerializers, TeamUserRegistrationsSerializers
from .models import Team, TeamUserRegistrations
from users.models import User
from users.serializers import SpecificSerializers
from rest_framework.views import APIView
from rest_framework.response import Response
import secrets
import string

class GetTeam(APIView):
    def get(self, req, team_id):
        team = Team.objects.filter(team_id=team_id).first()
        serializer = TeamSerializers(team)
        return create_team_response(serializer.data)

class GetAuthUserCreatedTeam(APIView):
    def get(self, request):
        auth_user_created_team = Team.objects.filter(
            leader_id=request.auth_user.user_id
        ).first()

        if auth_user_created_team:
            serializer = TeamSerializers(auth_user_created_team)
            return create_team_response(serializer.data)

        return Response({ 'data': None }, status=200)

class GetAuthUserJoinedTeams(APIView):
    def get(self, request):
        auth_user_to_teams = TeamUserRegistrations.objects.filter(
            user_id=request.auth_user.user_id
        ).values_list('team_id', flat=True)

        auth_user_joined_teams = Team.objects.filter(
            Q(team_id__in=auth_user_to_teams)
            & ~Q(leader_id=request.auth_user.user_id)
        ).all()

        serializer = TeamSerializers(auth_user_joined_teams, many=True)
        return create_team_response(serializer.data)

class GetTeamMembers(APIView):
    def get(self, req, team_id):
        user_ids = TeamUserRegistrations.objects.filter(team_id=team_id).values_list('user_id')
        users = User.objects.filter(user_id__in=user_ids)

        serializer = SpecificSerializers(users, many=True)

        return Response({ 'data': serializer.data }, status=200)

class CreateTeam(APIView):
    def post(self, request):
        auth_user_team = Team.objects.filter(leader_id=request.auth_user.user_id).first()

        if not auth_user_team:
            if not request.data['team_name']:
                return Response({'message': 'No team name provided.'}, status=400)

            uid = generate_uid()
            temp_team = Team.objects.filter(team_id=uid).first()
            while temp_team:
                uid = generate_uid()
                temp_team = Team.objects.filter(team_id=uid).first()

            serializer = TeamSerializers({
                'team_id': uid,
                'team_name': request.data['team_name'],
                'leader_id': request.auth_user.user_id
            })
            serializer.is_valid(raise_exception=True)
            serializer.save()

            serializer = TeamUserRegistrationsSerializers({
                'team_id': uid,
                'user_id':request.auth_user.user_id
            })
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({'team_id': uid}, status=201)

        return Response({'message': 'A team is already created by the user.'}, status=400)

# class JoinTeam(APIView):
#     def post(self, request):
#         token = request.COOKIES['jwt']

#         if not token:
#             raise AuthenticationFailed('Unauthenticated')

#         try:
#             payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('Token Expired! Log in again.')

#         user_id = payload['id']
#         team_id = request.data['team_id']

#         user = TeamUserRegistrations.objects.filter(team_id=team_id).all()

#         user1 = Team.objects.filter(leader_id=user_id).first()
#         if user1:
#             return Response({'message': 'Each user can create only one team but join any!!'}, status=403)

#         if user:
#             if user.count < 5:
#                 format_data = {'team_id': team_id,'user_id':user_id}
#                 serializer = TeamUserRegistrationsSerializers(data=format_data)
#                 serializer.is_valid(raise_exception=True)
#                 serializer.save()
#                 return Response({'message': 'Member Added!!'}, status=201)
#             return Response({'message': 'Team Full!'}, status=400)
#         return Response({'message': 'Team does not Exist.'}, status=404)

def generate_uid(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'T-' + uid

def get_member_count(team_id):
    return TeamUserRegistrations.objects.filter(team_id=team_id).count()

def get_leader_name(leader_id):
    return User.objects.filter(user_id=leader_id).values_list('name', flat=True)[0]

def create_team_response(team_or_teams):
    def create_team_object(serialized):
        return {
            'id': serialized.get('id'),
            'team_id': serialized.get('team_id'),
            'team_name': serialized.get('team_name'),
            'leader_id': serialized.get('leader_id'),
            'leader_name': get_leader_name(serialized.get('leader_id')),
            'member_count': get_member_count(serialized.get('team_id')),
        }

    if type(team_or_teams) is ReturnDict:
        return Response({ 'data': create_team_object(team_or_teams) }, status=200)

    if type(team_or_teams) is ReturnList:
        data = []

        for team in team_or_teams:
            data.append(create_team_object(team))

        return Response({ 'data': data }, status=200)
