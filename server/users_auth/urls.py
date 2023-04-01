from django.urls import path
from .views import *

urlpatterns = [
    path('check-auth', CheckAuth.as_view()),
    path('login', LoginApi.as_view()),
    path('register', RegisterApi.as_view()),
    path('forgot-password', ForgotApi.as_view()),
    path('reset-password', ChangePasswordApi.as_view()),
    path('logout', LogoutApi.as_view()),
    path('otp', OTPValidation.as_view()),
    path('resend-otp', ResendOtp.as_view()),
]
