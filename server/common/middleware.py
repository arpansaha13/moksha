from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from functools import wraps
import jwt
from users.models import User
import environ

env = environ.Env()
environ.Env.read_env()


def jwt_exempt(view_func):
    def wrapped_view(*args, **kwargs):
        return view_func(*args, **kwargs)
    wrapped_view.jwt_exempt_flag = True
    return wraps(view_func)(wrapped_view)


class JwtMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, *view_args, **view_kwargs):
        if request.path.startswith('/admin/'):
            return None

        if getattr(view_func, 'jwt_exempt_flag', False):
            return None

        token = request.COOKIES.get('jwt')

        if not token:
            return JsonResponse({'message': 'Unauthenticated'}, status=403)
        try:
            payload = jwt.decode(token, env('JWT_SECRET'), algorithms=[env('JWT_ALGO')])
        except jwt.ExpiredSignatureError:
            return JsonResponse({'message': 'Token Expired! Log in again.'}, status=403)

        auth_user = User.objects.filter(user_id=payload['id']).first()

        if not auth_user:
            return JsonResponse({'message': 'Invalid token'}, status=404)

        request.auth_user = auth_user

        return None
