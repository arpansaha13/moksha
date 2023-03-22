from rest_framework.urls import path
from .views import *
from django.urls import re_path

urlpatterns = [
    path('solo/register',SoloContestRegister.as_view()),
    path('solo/register/check/<slug:contest_slug>',CheckSoloRegistration.as_view()),
    path('solo/register/cancel/<slug:contest_slug>',CancelSoloRegistration.as_view()),
    # path('team-contest/register',TeamContestRegister.as_view()),
]
