from rest_framework.serializers import ModelSerializer
from .models import User


class AuthUserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'password_updated_at']


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['email', 'phone_no', 'password', 'password_updated_at']
