from django.urls import path
from .views import *

urlpatterns = [
    path('create', CreateInvite.as_view()),
    path('withdraw', WithdrawInvite.as_view()),
    path('<slug:team_id>', GetPendingInvites.as_view()),
    # path('<int:invite_id>/accept', AcceptInvite.as_view()),
    # path('<int:invite_id>/reject', RejectInvite.as_view()),
]
