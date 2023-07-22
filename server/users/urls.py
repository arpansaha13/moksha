from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('', GetUsers.as_view()),
    path('/me', GetAuthUser.as_view()),
    path('/me/created-team', GetAuthUserCreatedTeam.as_view()),
    path('/me/joined-teams', GetAuthUserJoinedTeams.as_view()),
    path('/me/received-team-invites', GetAuthUserReceivedTeamInvites.as_view()),
    path('/me/registered-solo-contests', GetAuthUserSoloContests.as_view()),
    path('/me/registered-team-contests', GetAuthUserTeamContests.as_view()),
]
