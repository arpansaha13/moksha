from django.db.models import fields
from rest_framework import serializers
from .models import *

# Created modelSerializer for each user

class SoloContestSerializers(serializers.ModelSerializer):
    class Meta:
        model = SoloContestRegistrations
        fields = '__all__'

class TeamContestDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TeamContestRegistrations
        fields = '__all__'
