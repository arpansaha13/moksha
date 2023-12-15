from functools import wraps
from django.http import HttpResponseForbidden



def login_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden("Unauthorized")
        return view_func(request, *args, **kwargs)
    return _wrapped_view
