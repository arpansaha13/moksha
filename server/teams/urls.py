from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('<slug:team_id>', GetTeam.as_view()),
    path('create', CreateTeam.as_view()),
    # path('team-contest/register',TeamContestRegister.as_view()),
]
