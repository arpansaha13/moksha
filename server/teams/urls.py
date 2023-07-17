from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('', BaseEndpoint.as_view()),
    path('/created', GetAuthUserCreatedTeam.as_view()),  # TODO: move this to users app
    path('/joined', GetAuthUserJoinedTeams.as_view()),  # TODO: move this to users app
    path('/<slug:team_id>', GetTeam.as_view()),
    path('/<slug:team_id>/members', GetTeamMembers.as_view()),
    path('/<slug:team_id>/search/uninvited-users', GetUninvitedUsers().as_view()),
    path('/<slug:team_id>/registered-contests', GetRegisteredTeamContests().as_view())
]
