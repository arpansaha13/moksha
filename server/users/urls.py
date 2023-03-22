from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('', GetUsers.as_view()),
    path('me', GetAuthUser.as_view()),
]
