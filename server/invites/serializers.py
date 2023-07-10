from rest_framework.serializers import ModelSerializer
from .models import Invite
from teams.serializers import TeamSerializer
from users.serializers import UserSerializer

class InviteSerializer(ModelSerializer):
    class Meta:
        model = Invite
        fields = ['id', 'team', 'user']

class RelatedInviteTeamSerializer(ModelSerializer):
    team = TeamSerializer()

    class Meta:
        model = Invite
        fields = ['id', 'team', 'user']

class RelatedInviteUserSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Invite
        fields = ['id', 'team', 'user']
