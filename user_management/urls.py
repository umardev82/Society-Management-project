# user_management/urls.py
from django.urls import path
from .views import LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    # path('otp-login/', OTPLoginView.as_view(), name='otp-login'),
]
