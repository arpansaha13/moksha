from django.db.models import fields
from rest_framework import serializers
from .models import *

# Created modelSerializer for each user


class SoloEventSerializers(serializers.ModelSerializer):
    class Meta:
        model = SoloEvent
        fields = '__all__'

class SoloContestSerializers(serializers.ModelSerializer):
    class Meta:
        model = SoloContestRegistrations
        fields = '__all__'

class TeamEventSerializers(serializers.ModelSerializer):
    class Meta:
        model = TeamEvent
        fields = '__all__'

class TeamSerializers(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class TeamUserRegistrationsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TeamUserRegistrations
        fields = '__all__'

class TeamContestDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TeamContestRegistrations
        fields = '__all__'
# class EventDetailSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = EventDetail
#         fields = '__all__'