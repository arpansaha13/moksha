from rest_framework.serializers import ModelSerializer
from .models import Team, TeamMember
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


class TeamMemberSerializer(ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'
