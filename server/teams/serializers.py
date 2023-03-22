from rest_framework import serializers
from .models import *

class TeamSerializers(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class TeamUserRegistrationsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TeamUserRegistrations
        fields = '__all__'
