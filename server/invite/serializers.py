from django.db.models import fields
from rest_framework import serializers
from .models import *

class InviteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Invite
        fields = '__all__'

class SpecificInviteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Invite
        fields = ['team_id']