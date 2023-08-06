from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from django.urls import path, re_path, include

from apps.user.views import DeleteUserView, GoogleLoginView, UserPermissionSettingsUpdateView, UserPermissionSettingsView
urlpatterns = [

    path('google/logincreate/', GoogleLoginView.as_view(), name='login_google'),
    path('google/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('google/token/verify/',  TokenVerifyView.as_view(), name='token_verify'),
    path('delete_user/', DeleteUserView.as_view(), name='delete_user'),
    path('user/settingspermissions/', UserPermissionSettingsView.as_view(), name='get_settings'),
    path('user/updatesettingspermissions/', UserPermissionSettingsUpdateView.as_view(), name='update_settings'),

]