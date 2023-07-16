from rest_framework.serializers import ModelSerializer
from .models import Contest, SoloContestRegistration, TeamContestRegistration, TeamContestUserRegistration
from users.serializers import UserSerializer


class ContestSerializer(ModelSerializer):
    class Meta:
        model = Contest
        fields = '__all__'


class SoloContestSerializer(ModelSerializer):
    class Meta:
        model = SoloContestRegistration
        fields = '__all__'


class RelatedSoloContestSerializer(ModelSerializer):
    contest = ContestSerializer()

    class Meta:
        model = SoloContestRegistration
        fields = '__all__'


class TeamContestUserRegistrationSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = TeamContestUserRegistration
        fields = ['user']


class TeamContestRegistrationSerializer(ModelSerializer):
    registered_members = TeamContestUserRegistrationSerializer(read_only=True, many=True)

    class Meta:
        model = TeamContestRegistration
        fields = '__all__'
