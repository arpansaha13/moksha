from rest_framework import serializers
from .models import User

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SpecificSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar_idx', 'name', 'institution_name', 'phone_no', 'email', 'username', 'user_id']
