from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from users.models import User
from functools import wraps
from typing import Any, Dict
import jwt
import environ

env = environ.Env()
environ.Env.read_env()


def jwt_exempt(view_func):
    def wrapped_view(*args, **kwargs):
        return view_func(*args, **kwargs)
    wrapped_view.jwt_exempt_flag = True
    return wraps(view_func)(wrapped_view)


def validate_token(auth_token) -> Dict[str, Any] | None:
    if not auth_token:
        return None

    try:
        payload = jwt.decode(auth_token, env('JWT_SECRET'), algorithms=[env('JWT_ALGO')])
    except jwt.ExpiredSignatureError:
        return None

    return payload


def validate_session(session_token) -> Dict[str, Any] | None:
    if not session_token:
        return None

    try:
        payload = jwt.decode(session_token, env('JWT_SECRET'), algorithms=[env('JWT_ALGO')])
    except jwt.ExpiredSignatureError:
        return None

    return payload


class JwtMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, *view_args, **view_kwargs):
        # if request.path.startswith('/admin/'):
        #     return None

        if getattr(view_func, 'jwt_exempt_flag', False):
            return None

        AUTH_TOKEN = request.COOKIES.get('auth')
        payload = validate_token(AUTH_TOKEN)

        if payload is None:
            SESSION_TOKEN = request.COOKIES.get('session')
            payload = validate_session(SESSION_TOKEN)

        if payload is None:
            return JsonResponse({'message': 'Unauthenticated'}, status=403)

        auth_user = User.objects.filter(user_id=payload['id']).first()

        if not auth_user:
            return JsonResponse({'message': 'Invalid token'}, status=404)

        request.auth_user = auth_user

        return None
