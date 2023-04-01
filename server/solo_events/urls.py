from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('/event', RegisterEvent.as_view()),
    path('/details/<str:id>', EventDetails.as_view()),
    path('/details',EventDetailsUserName.as_view()),
    path('/teamdetails',DetailsTeamName.as_view()),
    path('/viewdetailssolo',SoloEventsApi.as_view()),
    path('/viewdetailsteam',TeamEventsApi.as_view()),
    path('/eventregistration',TeamEventRegistration.as_view()),
    path('/teams/joined',JoinedTeamsApi.as_view()),
    path('/teams/created',CreatedTeamsApi.as_view()),
    path('/<slug:team_id>/users',TeamUserDetails.as_view()),
]
