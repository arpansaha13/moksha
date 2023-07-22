from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('/solo/registration', SoloContestRegistration.as_view()),
    path('/team/registration', TeamContestRegistration.as_view()),
]
