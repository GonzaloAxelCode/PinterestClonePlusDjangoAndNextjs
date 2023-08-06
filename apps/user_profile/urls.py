
from django.urls import path, re_path, include

from apps.user_profile.views import UserProfileView
urlpatterns = [
    path('user/profile/<str:username>/', UserProfileView.as_view(), name='user_profile'),
]