from django.db.models import fields
from rest_framework import serializers
from .models import *

# Created modelSerializer for each user


class SoloEventSerializers(serializers.ModelSerializer):
    class Meta:
        model = SoloEvent
        fields = '__all__'

class TeamEventSerializers(serializers.ModelSerializer):
    class Meta:
        model = TeamEvent
        fields = '__all__'

class TeamDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TeamDetail
        fields = '__all__'

class EventDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = EventDetail
        fields = '__all__'