from django.urls import path
from .views import *
from invite.views import *

urlpatterns = [
    path('login', LoginApi.as_view()),
    path('register', RegisterApi.as_view()),
    path('forgot-password', ForgotApi.as_view()),
    path('reset-password', ChangePasswordApi.as_view()),
    path('logout', LogoutApi.as_view()),
    path('otp', OTPValidation.as_view()),
    path('resend-otp', ResendOtp.as_view()),
    path('particular/createinvite',CreateInvite.as_view()),
    path('particular/invites',ViewInvite.as_view()),
    path('particular/invites/<int:id>/accept',AcceptInvite.as_view()),
    path('particular/invites/<int:id>/reject',RejectInvite.as_view()),
]
