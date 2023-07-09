from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('/solo/register', SoloContestRegister.as_view()),
    path('/solo/register/check/<int:contest_id>', CheckSoloRegistration.as_view()),
    path('/solo/register/cancel/<int:contest_id>', CancelSoloRegistration.as_view()),
    # path('team-contest/register',TeamContestRegister.as_view()),
]
