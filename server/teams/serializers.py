from rest_framework.serializers import ModelSerializer
from .models import Team, TeamUserRegistrations

class TeamSerializers(ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class TeamUserRegistrationsSerializers(ModelSerializer):
    class Meta:
        model = TeamUserRegistrations
        fields = '__all__'
