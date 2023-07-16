from rest_framework.urls import path
from .views import *

urlpatterns = [
    # TODO: Bring these 3 solo contest apis under same class - post, get and delete respectively
    path('/solo/register', SoloContestRegister.as_view()),
    path('/solo/register/check/<int:contest_id>', CheckSoloRegistration.as_view()),
    path('/solo/register/cancel/<int:contest_id>', CancelSoloRegistration.as_view()),

    path('/team/registration', TeamContestRegistration.as_view()),
]
