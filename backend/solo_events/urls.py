from rest_framework.urls import path
from .views import *
from django.urls import re_path

urlpatterns = [
    path('event', RegisterEvent.as_view()),
    path('details/<str:id>', EventDetails.as_view()),
    path('details',EventDetailsUserName.as_view()),
    path('teamdetails',DetailsTeamName.as_view()),
    path('viewdetailssolo',SoloEventsApi.as_view()),
    path('viewdetailsteam',TeamEventsApi.as_view()),
    path('createteam',CreateTeam.as_view()),
    path('jointeam',JoinTeam.as_view()),
    path('eventregistration',TeamEventRegistration.as_view()),
    path('eventall', EventAll.as_view()),
    path('eventparticulars', EventParticular.as_view()),
]
