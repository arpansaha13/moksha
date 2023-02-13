from django.db.models import fields
from rest_framework import serializers
from .models import *

# Created modelSerializer for each user


class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = SoloEvent
        fields = '__all__'