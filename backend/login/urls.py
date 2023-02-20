from django.urls import path
from .views import *

urlpatterns = [
    path('login', LoginApi.as_view()),
    path('register', RegisterApi.as_view()),
    path('forgot-password', ForgotApi.as_view()),
    path('reset-password', ChangePasswordApi.as_view()),
    path('view', ViewApi.as_view()),
    path('logout', LogoutApi.as_view()),
    path('otp', OTPValidation.as_view()),
    path('resendotp', ResendOtp.as_view()),
    path('<str:id>',ViewParticularApi.as_view()),
]