from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('create', CreateTeam.as_view()),
    path('created', GetAuthUserCreatedTeam.as_view()),
    path('joined', GetAuthUserJoinedTeams.as_view()),
    path('<slug:team_id>', GetTeam.as_view()),
    path('<slug:team_id>/members', GetTeamMembers.as_view()),
    path('<slug:team_id>/search/uninvited-users', GetUninvitedUsers().as_view()),
    # path('team-contest/register',TeamContestRegister.as_view()),
]
