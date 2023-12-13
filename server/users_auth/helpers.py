from django.utils import timezone
from datetime import timedelta
import jwt
import environ

env = environ.Env()
environ.Env.read_env()


def create_auth_token(user_id: str) -> str:
    TIMEZONE_NOW = timezone.now()

    payload = {
        'id': user_id,
        'exp': TIMEZONE_NOW + timedelta(seconds=int(env('JWT_VALIDATION_SECONDS'))),
        'iat': TIMEZONE_NOW,
    }

    return jwt.encode(payload, env('JWT_SECRET'), algorithm=env('JWT_ALGO'))


def create_session_token(user_id: str) -> str:
    payload = {
        'id': user_id,
        'iat': timezone.now(),
    }

    return jwt.encode(payload, env('JWT_SECRET'), algorithm=env('JWT_ALGO'))
