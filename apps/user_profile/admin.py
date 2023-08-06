from django.contrib import admin

# Register your models here.
from apps.user_profile.models import UserProfile

admin.site.register(UserProfile)
