from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RelatedInviteUserSerializer
from .models import Invite, InviteStatus
from teams.models import Team, TeamUserRegistrations
from users.models import User

class BaseEndpoint(APIView):
    # Create invite
    def post(self, request):
        team_id = request.data.get('team_id')
        user_id = request.data.get('user_id')

        team = Team.objects.filter(team_id=team_id).first()

        verify_team_leader(team, request.auth_user)

        user = User.objects.filter(user_id=user_id).first()

        if not user:
            return Response({'message': 'Invalid user_id'}, status=400)

        if TeamUserRegistrations.objects.filter(Q(user_id=user_id) & Q(team_id=team_id)).exists():
            return Response({'message': 'User is already in team'}, status=409)

        if Invite.objects.filter(Q(user_id=user_id) & Q(team_id=team_id)).exists():
            return Response({'message': 'User has already been invited'}, status=409)

        new_invite = Invite(team=team, user=user)
        new_invite.save()

        return Response({'message': 'Invited'}, status=200)

    # Withdraw invite
    def delete(self, request):
        team_id = request.data.get('team_id')
        user_id = request.data.get('user_id')

        team = Team.objects.filter(team_id=team_id).only('leader_id').first()

        verify_team_leader(team, request.auth_user)

        if not User.objects.filter(user_id=user_id).exists():
            return Response({'message': 'Invalid user_id'}, status=400)

        invite = Invite.objects.filter(
            Q(user_id=user_id)
            & Q(team_id=team_id)
            & Q(status=InviteStatus.PENDING)
        ).first()

        if not invite:
            return Response({'message': 'No such invite exists'}, status=400)

        invite.delete()
        return Response({'message': 'Invite has been withdrawn'}, status=200)

class GetPendingInvites(APIView):
    def get(self, request, team_id):
        team = Team.objects.filter(team_id=team_id).only('leader_id').first()

        verify_team_leader(team, request.auth_user)

        invites = Invite.objects.select_related('team').filter(
            Q(team_id=team_id) & Q(status=InviteStatus.PENDING)
        ).all()

        serializer = RelatedInviteUserSerializer(invites, many=True)
        return Response({'data': serializer.data}, status=200)

# class AcceptInvite(APIView):
#     def get(self, request, invite_id):
#         user = Invite.objects.filter(id=invite_id).first()
#         if user:
#             if user.status!='accepted':
#                user.status='accepted'
#                return Response({'message': 'Accepted'}, status=200)
#             return Response({'message': 'Already Accepted'}, status=404)
#         return Response({'message': 'Invite Not Found'}, status=404)

# class RejectInvite(APIView):
#     def get(self, request, invite_id):
#         user = Invite.objects.filter(id=invite_id).first()
#         if user:
#             if user.status!='rejected':
#                user.status='rejected'
#                return Response({'message': 'Rejected'}, status=200)
#             return Response({'message': 'Already Rejected'}, status=404)
#         return Response({'message': 'Invite Not Found'}, status=404)

def verify_team_leader(team, auth_user):
    if team is None:
        return Response({'message': 'Invalid team_id'}, status=400)

    # Only team leader should be able to deal with invites
    if auth_user.user_id != team.leader_id:
        return Response({'message': 'Forbidden'}, status=403)
