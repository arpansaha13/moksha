
from django.db.models import Q
from django.db import transaction, IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Invite, InviteStatus
from teams.models import Team, TeamMember
from users.models import User
from common.exceptions import Conflict, BadRequest, InternalServerError
from teams.helpers import get_team
from .helpers import verify_invite, verify_team_leader


class BaseEndpoint(APIView):
    # Create invite
    def post(self, request):
        team_id = request.data['team_id']
        user_id = request.data['user_id']

        team = Team.objects.filter(team_id=team_id).first()

        verify_team_leader(team, request.auth_user)

        user = User.objects.filter(user_id=user_id).first()

        if not user:
            raise BadRequest(message='Invalid user_id')

        if Invite.objects.filter(
            Q(user_id=user_id)
            & Q(team_id=team_id)
            & Q(status=InviteStatus.PENDING)
        ).exists():
            raise Conflict(message='User has already been invited.')

        try:
            with transaction.atomic():
                if TeamMember.objects.filter(
                    Q(user=user_id)
                    & Q(team=team_id)
                ).exists():
                    raise Conflict(message='User is already in team')

                new_invite = Invite(team=team, user=user)
                new_invite.save()
        except IntegrityError:
            raise InternalServerError(message='Some error occurred. Could not invite.')

        return Response({'message': 'Invited'}, status=201)

    # Withdraw invite
    def delete(self, request):
        team_id = request.data.get('team_id')
        user_id = request.data.get('user_id')

        team = Team.objects.filter(team_id=team_id).only('leader').first()

        verify_team_leader(team, request.auth_user)

        if not User.objects.filter(user_id=user_id).exists():
            raise NotFound({'message': 'User not found.'})

        try:
            with transaction.atomic():
                invite = Invite.objects.filter(
                    Q(user_id=user_id)
                    & Q(team_id=team_id)
                    & Q(status=InviteStatus.PENDING)
                ).first()

                if not invite:
                    raise NotFound({'message': 'Invite does not exist.'})

                invite.delete()
        except IntegrityError:
            raise InternalServerError(message='Some error occurred. Could not withdraw invite.')

        return Response({'message': 'Invite has been withdrawn'}, status=200)


class AcceptInvite(APIView):
    def patch(self, _, invite_id):
        invite = Invite.objects.filter(id=invite_id).first()

        try:
            with transaction.atomic():
                invite = verify_invite(invite)

                invite.status = InviteStatus.ACCEPTED
                invite.save()

                joined_user = TeamMember(team=invite.team, user=invite.user)
                joined_user.save()

                team = get_team(invite.team.team_id)
                team.member_count += 1
                team.save()
        except IntegrityError:
            raise InternalServerError(message='Some error occurred. Could not accept invite.')

        return Response({'message': 'Invite accepted'}, status=200)


class RejectInvite(APIView):
    def patch(self, _, invite_id):
        invite = Invite.objects.filter(id=invite_id).first()

        try:
            with transaction.atomic():
                invite = verify_invite(invite)

                invite.status = InviteStatus.REJECTED
                invite.save()
        except IntegrityError:
            raise InternalServerError(message='Some error occurred. Could not reject invite.')

        return Response({'message': 'Invite rejected'}, status=200)
