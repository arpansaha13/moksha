from rest_framework.serializers import ModelSerializer
from .models import User


class AuthUserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'phone_no', 'email']
