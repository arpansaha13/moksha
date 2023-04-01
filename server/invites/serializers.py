from rest_framework.serializers import ModelSerializer
from .models import Invite
from teams.serializers import TeamSerializers
from users.serializers import SpecificSerializers

class InviteSerializer(ModelSerializer):
    class Meta:
        model = Invite
        fields = ['id', 'team', 'user']

class RelatedInviteTeamSerializer(ModelSerializer):
    team = TeamSerializers()

    class Meta:
        model = Invite
        fields = ['id', 'team', 'user']

class RelatedInviteUserSerializer(ModelSerializer):
    user = SpecificSerializers()

    class Meta:
        model = Invite
        fields = ['id', 'team', 'user']
