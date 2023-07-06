from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar_idx', 'name', 'institution', 'phone_no', 'email', 'username', 'user_id']
