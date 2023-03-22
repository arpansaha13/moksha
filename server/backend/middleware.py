from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponse
from functools import wraps
import jwt
from login.models import User

def jwt_exempt(view_func):
    def wrapped_view(*args, **kwargs):
        return view_func(*args, **kwargs)
    wrapped_view.jwt_exempt_flag = True
    return wraps(view_func)(wrapped_view)

class JwtMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, *view_args, **view_kwargs):
        if getattr(view_func, 'jwt_exempt_flag', False):
            return None

        token = request.COOKIES.get('jwt')

        print(token)
        if not token:
            return HttpResponse('Unauthenticated', status=401)
        try:
            payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return HttpResponse('Token Expired! Log in again.', status=401)

        auth_user = User.objects.filter(user_id=payload['id']).first()

        if not auth_user:
            return HttpResponse('Invalid token', status=404)

        request.auth_user = auth_user

        return None
