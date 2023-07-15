from django.db.models import Q
from .serializers import TeamSerializer
from .models import Team, TeamMember
from users.models import User
from invites.models import Invite, InviteStatus
from users.serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
import secrets
import string


class BaseEndpoint(APIView):
    # Create team
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
                team_id=uid,
                team_name=request.POST['team_name'],
                leader=request.auth_user
            )
            new_team.save()

            new_team_member = TeamMember(
                team=new_team,
                user=request.auth_user
            )
            new_team_member.save()

            return Response({'team_id': uid}, status=201)

        return Response({'message': 'A team is already created by the user.'}, status=400)


class GetTeam(APIView):
    def get(self, req, team_id):
        team = Team.objects.filter(team_id=team_id).first()
        serializer = TeamSerializer(team)
        return Response({'data': serializer.data}, status=200)


class GetAuthUserCreatedTeam(APIView):
    def get(self, request):
        auth_user_created_team = Team.objects.filter(leader=request.auth_user.user_id).first()

        if auth_user_created_team:
            serializer = TeamSerializer(auth_user_created_team)
            return Response({'data': serializer.data}, status=200)

        return Response({'data': None}, status=200)


class GetAuthUserJoinedTeams(APIView):
    def get(self, request):
        auth_user_to_teams = TeamMember.objects.filter(
            user=request.auth_user.user_id
        ).values_list('team', flat=True)

        auth_user_joined_teams = Team.objects.filter(
            Q(team_id__in=auth_user_to_teams)
            & ~Q(leader=request.auth_user.user_id)
        ).all()

        serializer = TeamSerializer(auth_user_joined_teams, many=True)
        return Response({'data': serializer.data}, status=200)


class GetTeamMembers(APIView):
    def get(self, req, team_id):
        user_ids = TeamMember.objects.filter(team_id=team_id).values_list('user_id')
        users = User.objects.filter(user_id__in=user_ids)

        serializer = UserSerializer(users, many=True)

        return Response({'data': serializer.data}, status=200)


class GetUninvitedUsers(APIView):
    def get(self, request, team_id):
        username = request.GET.get('username', None)
        limit = request.GET.get('limit', 10)

        team_members = TeamMember.objects.filter(team=team_id).values_list('user', flat=True)
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

        return Response({'data': data}, status=200)


def generate_uid(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'T-' + uid
