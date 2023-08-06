
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from apps.user_profile.models import UserProfile
from apps.user_profile.serializers import UserProfileSerializer
from django.core.exceptions import ObjectDoesNotExist
User = get_user_model()



class UserProfileView(APIView):
    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
            profile = UserProfile.objects.get(user=user)
        except ObjectDoesNotExist:
            return Response({'detail': 'User does not exist'}, status=404)
        
        serializer = UserProfileSerializer(profile, context={'request': request})
        return Response(serializer.data, status=200)