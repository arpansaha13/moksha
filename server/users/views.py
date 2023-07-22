from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.serializers import CharField
from .models import User
from .serializers import AuthUserSerializer, UserSerializer
from invites.models import InviteStatus
from invites.serializers import InviteSerializer
from teams.serializers import TeamSerializer, TeamMemberSerializer
from contests.serializers import ContestSerializer, SoloContestRegistrationSerializer, TeamContestRegistrationSerializer, TeamContestUserRegistrationSerializer


class GetAuthUser(APIView):
    def get(self, request):
        serializer = AuthUserSerializer(request.auth_user)
        return Response({'data': serializer.data}, status=200)


class GetUsers(APIView):
    def get(self, request):
        username = request.GET.get('username', None)
        limit = request.GET.get('limit', 10)

        if username is None:
            return Response({'data': []}, status=200)

        users = User.objects.filter(
            Q(username__icontains=username)
            & ~Q(user_id=request.auth_user.user_id)
        ).all()[0:limit]

        serializer = UserSerializer(users, many=True)

        return Response({'data': serializer.data}, status=200)


class GetAuthUserCreatedTeam(APIView):
    def get(self, request):
        created_team = request.auth_user.created_team.first()

        if created_team:
            serializer = TeamSerializer(created_team)
            return Response({'data': serializer.data}, status=200)

        return Response({'data': None, 'message': 'No team found'}, status=200)


class GetAuthUserJoinedTeams(APIView):
    def get(self, request):
        created_team = request.auth_user.created_team
        user_memberships = request.auth_user.user_memberships.filter(~Q(team__team_id=created_team)).all()

        serializer = TeamMemberSerializer(
            user_memberships,
            many=True,
            read_only=True,
            fields={'team': TeamSerializer()}
        )
        return Response({'data': serializer.data}, status=200)


class GetAuthUserReceivedTeamInvites(APIView):
    def get(self, request):
        received_invites = request.auth_user.received_invites.filter(status=InviteStatus.PENDING).all()

        serializer = InviteSerializer(
            received_invites,
            many=True,
            read_only=True,
            fields={'team': TeamSerializer(
                empty=True,
                fields={'team_id': CharField(), 'team_name': CharField()}
            )}
        )

        return Response({'data': serializer.data}, status=200)


class GetAuthUserSoloContests(APIView):
    def get(self, request):
        solo_contest_regs = request.auth_user.registered_solo_contests.only('contest').all()

        serializer = SoloContestRegistrationSerializer(
            solo_contest_regs,
            read_only=True,
            many=True,
            fields={'contest': ContestSerializer(read_only=True)}
        )
        return Response({'data': serializer.data}, status=200)


class GetAuthUserTeamContests(APIView):
    def get(self, request):
        contest_id = request.GET.get('contest_id', None)

        # All registered contest of auth user's created team
        if contest_id is None:
            team_contest_regs = request.auth_user.team_contest_registrations.only('team_contest_registration').all()

            serializer = TeamContestUserRegistrationSerializer(
                team_contest_regs,
                read_only=True,
                empty=True,
                many=True,
                fields={
                    'team_contest_registration': TeamContestRegistrationSerializer(
                        fields={
                            'contest': ContestSerializer(),
                            'team': TeamSerializer(
                                empty=True,
                                fields={'team_id': CharField(), 'team_name': CharField()}
                            )
                        }
                    )
                }
            )

            return Response({'data': serializer.data}, status=200)

        # A particular contest registration of auth user's created team
        team_contest_reg = request.auth_user.team_contest_registrations.only('team_contest_registration').filter(team_contest_registration__contest=contest_id).first()

        if team_contest_reg is None:
            return Response({'data': None, 'message': 'No registration found'})

        serializer = TeamContestUserRegistrationSerializer(
            team_contest_reg,
            read_only=True,
            empty=True,
            fields={
                'team_contest_registration': TeamContestRegistrationSerializer(
                    read_only=True,
                    fields={
                        'team': TeamSerializer(read_only=True),
                        'registered_members': TeamContestUserRegistrationSerializer(many=True)
                    }
                )
            }
        )
        return Response({'data': serializer.data}, status=200)
