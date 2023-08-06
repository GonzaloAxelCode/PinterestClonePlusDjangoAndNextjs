from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.user.serializers import UserSerializer

from .models import UserProfile


User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    #avatar = serializers.ImageField(source='user_profile.avatar')
    #cover_image = serializers.ImageField(source='user_profile.cover_image')

    class Meta:
        model = UserProfile
        fields = ['user', 'username', 'email', 'first_name', 'last_name', 'country_region',
                  'gener', 'languages',  'about_me', 'website']

class UserProfileDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'country_region', 'gener', 'languages', 'about_me', 'website']