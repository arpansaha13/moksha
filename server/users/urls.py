from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('', GetUsers.as_view()),
    path('/me', GetAuthUser.as_view()),
    path('/me/received-team-invites', GetAuthUserReceivedTeamInvites.as_view()),
    path('/me/registered-contests/solo', GetAuthUserSoloContests.as_view()),
    path('/me/registered-contests/team', GetAuthUserTeamContests.as_view()),
]
