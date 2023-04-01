from django.urls import path
from .views import *

urlpatterns = [
    path('/check-auth', CheckAuth.as_view()),
    path('/login', Login.as_view()),
    path('/register', Register.as_view()),
    path('/forgot-password', ForgotPassword.as_view()),
    path('/reset-password', ChangePassword.as_view()),
    path('/logout', Logout.as_view()),
    path('/otp', OTPValidation.as_view()),
    path('/resend-otp', ResendOtp.as_view()),
]
