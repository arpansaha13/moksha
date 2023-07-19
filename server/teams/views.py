from django.db.models import Q
from common.exceptions import BadRequest, Conflict
from .serializers import TeamSerializer
from .models import Team, TeamMember
from users.models import User
from invites.models import Invite, InviteStatus
from users.serializers import UserSerializer
from invites.serializers import InviteSerializer
from contests.serializers import ContestSerializer, TeamContestRegistrationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .helpers import get_team
from invites.helpers import verify_team_leader
import secrets
import string


class BaseEndpoint(APIView):
    # Create team
    def post(self, request):
        team_name = request.POST['team_name']

        if not team_name:
            raise BadRequest({'message': 'No team name provided.'})

        if Team.objects.filter(leader=request.auth_user.user_id).exists():
            raise Conflict({'message': 'A team is already created by the user.'})

        if Team.objects.filter(team_name__iexact=team_name).exists():
            raise Conflict(message='This team name is already taken.')

        uid = generate_uid()

        while Team.objects.filter(team_id=uid).exists():
            uid = generate_uid()

        # transaction
        new_team = Team(
            team_id=uid,
            team_name=team_name,
            leader=request.auth_user
        )
        new_team.save()

        new_team_member = TeamMember(
            team=new_team,
            user=request.auth_user
        )
        new_team_member.save()

        return Response({'team_id': uid}, status=201)


class GetTeam(APIView):
    def get(self, req, team_id):
        team = get_team(team_id)
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
            Q(team=team_id)
            & Q(status=InviteStatus.PENDING)
        ).values_list('user', flat=True)

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


class GetRegisteredTeamContests(APIView):
    def get(self, request, team_id):
        team = get_team(team_id)

        serializer = TeamSerializer(
            team,
            empty=True,
            fields={
                'registered_team_contests': TeamContestRegistrationSerializer(
                    read_only=True,
                    many=True,
                    fields={'contest': ContestSerializer(read_only=True)}
                )
            }
        )

        return Response({'data': serializer.data['registered_team_contests']}, status=200)


class GetPendingInvites(APIView):
    def get(self, request, team_id):
        team = Team.objects.filter(team_id=team_id).only('leader').first()

        verify_team_leader(team, request.auth_user)

        pending_invites = team.pending_invites.filter(status=InviteStatus.PENDING).all()  # type: ignore

        serializer = InviteSerializer(
            pending_invites,
            many=True,
            fields={'user': UserSerializer()}
        )

        return Response({'data': serializer.data}, status=200)


def generate_uid(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'T-' + uid
