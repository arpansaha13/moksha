from django.db.models import Q
from rest_framework.serializers import ReturnDict, ReturnList
from .serializers import TeamSerializers
from .models import Team, TeamUserRegistrations
from users.models import User
from invites.models import Invite, InviteStatus
from users.serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
import secrets
import string

class BaseEndpoint(APIView):
    def post(self, request):
        auth_user_team = Team.objects.filter(leader=request.auth_user.user_id).first()

        if not auth_user_team:
            if not request.data['team_name']:
                return Response({'message': 'No team name provided.'}, status=400)

            uid = generate_uid()
            temp_team = Team.objects.filter(team_id=uid).first()
            while temp_team:
                uid = generate_uid()
                temp_team = Team.objects.filter(team_id=uid).first()

            new_team = Team(
                team_id = uid,
                team_name = request.data['team_name'],
                leader = request.auth_user.user_id
            )
            new_team.save()

            new_team_registration = TeamUserRegistrations(
                team = new_team,
                user = request.auth_user
            )
            new_team_registration.save()

            return Response({'team_id': uid}, status=201)

        return Response({'message': 'A team is already created by the user.'}, status=400)

class GetTeam(APIView):
    def get(self, req, team_id):
        team = Team.objects.filter(team_id=team_id).first()
        serializer = TeamSerializers(team)
        return create_team_response(serializer.data)

class GetAuthUserCreatedTeam(APIView):
    def get(self, request):
        auth_user_created_team = Team.objects.filter(
            leader=request.auth_user.user_id
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
            & ~Q(leader=request.auth_user.user_id)
        ).all()

        serializer = TeamSerializers(auth_user_joined_teams, many=True)
        return create_team_response(serializer.data)

class GetTeamMembers(APIView):
    def get(self, req, team_id):
        user_ids = TeamUserRegistrations.objects.filter(team_id=team_id).values_list('user_id')
        users = User.objects.filter(user_id__in=user_ids)

        serializer = UserSerializer(users, many=True)

        return Response({ 'data': serializer.data }, status=200)

class GetUninvitedUsers(APIView):
    def get(self, request, team_id):
        username = request.GET.get('username', None)
        limit = request.GET.get('limit', 10)

        team_members = TeamUserRegistrations.objects.filter(team_id=team_id).values_list('user_id', flat=True)
        pending_invites = Invite.objects.filter(
            Q(team_id=team_id)
            & Q(status=InviteStatus.PENDING)
        ).values_list('user_id', flat=True)

        users = User.objects.filter(
            Q(username__icontains=username)
            & ~Q(user_id=request.auth_user.user_id)
            & ~Q(user_id__in=team_members)
            & ~Q(user_id__in=pending_invites)
        ).all()[0:limit]

        data = []
        for user in users:
            serializer = UserSerializer(user)
            data.append(serializer.data)

        return Response({ 'data': data }, status=200)

def generate_uid(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'T-' + uid

def get_member_count(team_id):
    return TeamUserRegistrations.objects.filter(team_id=team_id).count()

def get_leader_name(leader):
    return User.objects.filter(user_id=leader).values_list('name', flat=True)[0]

def create_team_response(team_or_teams):
    def create_team_object(serialized):
        return {
            'id': serialized.get('id'),
            'team_id': serialized.get('team_id'),
            'team_name': serialized.get('team_name'),
            'leader': serialized.get('leader'),
            'leader_name': get_leader_name(serialized.get('leader')),
            'member_count': get_member_count(serialized.get('team_id')),
        }

    if type(team_or_teams) is ReturnDict:
        return Response({ 'data': create_team_object(team_or_teams) }, status=200)

    if type(team_or_teams) is ReturnList:
        data = []

        for team in team_or_teams:
            data.append(create_team_object(team))

        return Response({ 'data': data }, status=200)
