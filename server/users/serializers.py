from rest_framework.serializers import ModelSerializer
from .models import User


class AuthUserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'email_verified']


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'email_verified', 'phone_no', 'email']
