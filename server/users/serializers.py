from rest_framework.serializers import ModelSerializer
from .models import User


class AuthUserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'otp']


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'otp', 'phone_no', 'email']
