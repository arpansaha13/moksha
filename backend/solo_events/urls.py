from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('event', RegisterEvent.as_view()),
]
