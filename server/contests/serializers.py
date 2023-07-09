from rest_framework.serializers import ModelSerializer
from .models import Contest, SoloContestRegistration, TeamContestRegistration

class ContestSerializer(ModelSerializer):
    class Meta:
        model = Contest
        fields = '__all__'

class SoloContestSerializer(ModelSerializer):
    class Meta:
        model = SoloContestRegistration
        fields = '__all__'

class RelativeSoloContestSerializer(ModelSerializer):
    team = ContestSerializer()

    class Meta:
        model = SoloContestRegistration
        fields = '__all__'

class TeamContestSerializer(ModelSerializer):
    class Meta:
        model = TeamContestRegistration
        fields = '__all__'
