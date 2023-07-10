from rest_framework.serializers import ModelSerializer
from .models import Team, TeamUserRegistration
from .models import User


class TeamSerializer(ModelSerializer):
    class LeaderSerializer(ModelSerializer):
        class Meta:
            model = User
            fields = ['user_id', 'name']

    leader = LeaderSerializer()

    class Meta:
        model = Team
        fields = '__all__'


class TeamUserRegistrationSerializer(ModelSerializer):
    class Meta:
        model = TeamUserRegistration
        fields = '__all__'
