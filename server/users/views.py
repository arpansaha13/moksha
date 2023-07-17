from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.serializers import CharField
from .models import User
from .serializers import AuthUserSerializer, UserSerializer
from invites.models import InviteStatus
from invites.serializers import InviteSerializer
from teams.serializers import TeamSerializer
from contests.models import SoloContestRegistration
from contests.serializers import ContestSerializer, SoloContestRegistrationSerializer


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


class GetAuthUserReceivedTeamInvites(APIView):
    def get(self, request):
        received_invites = request.auth_user.received_invites.filter(status=InviteStatus.PENDING).all()

        serializer = InviteSerializer(
            received_invites,
            many=True,
            fields={'team': TeamSerializer(
                read_only=True,
                empty=True,
                fields={'team_id': CharField(), 'team_name': CharField()}
            )}
        )

        return Response({'data': serializer.data}, status=200)


class GetAuthUserSoloContests(APIView):
    def get(self, request):
        solo_regs = SoloContestRegistration.objects.select_related('contest').filter(user=request.auth_user).all()

        serializer = SoloContestRegistrationSerializer(
            solo_regs, many=True,
            fields={'contest': ContestSerializer(read_only=True)}
        )
        return Response({'data': serializer.data}, status=200)
