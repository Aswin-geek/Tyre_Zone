from django.urls import path
from .views import *


urlpatterns = [
    path('check_email/', CheckEmail.as_view(), name='check_email'),
    path('register/', UserRegistrationView.as_view(), name='user_registration'),
    path('send_otp_email/', OtpMail.as_view(), name='send_otp_email'),
    path('login/', UserLoginView.as_view(), name='user_login'),
]