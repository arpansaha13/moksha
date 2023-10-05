from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('/<slug:club_slug>/<slug:contest_slug>', GetContestRegistrations.as_view()),
    path('/solo/registration', SoloContestRegistration.as_view()),
    path('/team/registration', TeamContestRegistration.as_view()),
]
