from django.conf import settings
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from rest_framework.exceptions import PermissionDenied

from django.db import transaction
from rest_framework.views import APIView
from rest_framework.decorators import  permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import authentication_classes
from google.oauth2 import id_token as google_id_token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from google.auth.transport import requests

from apps.user.models import CommentEspecificWords, UserAccount, UserPermissionSettings
from apps.user.serializers import UserPermissionSettingsSerializer
from apps.user_profile.models import UserProfile
from django.contrib.auth import get_user_model
User = get_user_model()


@authentication_classes([])
@permission_classes([AllowAny])
class GoogleLoginView(APIView):
    def post(self, request):
        id_token = request.data.get('id_token')
        if id_token:
            try:
                # Verificar el token de ID de Google y obtener la información de usuario
                
                
                info = google_id_token.verify_oauth2_token(id_token, requests.Request(), settings.GOOGLE_CLIENT_ID)

                # Buscar una cuenta existente en la base de datos correspondiente al correo electrónico de Google
                user = User.objects.filter(email=info['email']).first()
                is_new_account = False

                if not user:
                    # Si no se encuentra un usuario con el correo electrónico de Google, crear uno nuevo
                    user = UserAccount(email=info['email'], username=info['given_name'])
                    user.is_registered_with_google = True 
                    user.username =  info['given_name']
                    user.is_active = True
                    
                    user.first_name = info['given_name']
                    is_new_account = True     
                    
                    user.save()
                    #crear el objeto de perfil usuario 
                    with transaction.atomic():
                        UserProfile.objects.create(user=user)
                        UserPermissionSettings.objects.create(user=user)
                # Generar tokens de acceso y actualización para el usuario
                refresh = RefreshToken.for_user(user)
                access = refresh.access_token

                # Guardar el usuario en la base de datos
                
                user.save()
                
                # Devolver los tokens de acceso y actualización en un diccionario
                return Response({
                    'access': str(access),
                    'refresh': str(refresh),
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'username': user.username,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'date_joined': user.date_joined,
                        'is_active': user.is_active,
                        'is_staff': user.is_staff,
                        'is_superuser': user.is_superuser,
                        'is_registered_with_google': user.is_registered_with_google,
                        'desactivate_account': user.desactivate_account,
                        'is_new_account': is_new_account
                    }
                }, status=status.HTTP_200_OK)

            except ValueError:
                # Si no se puede verificar el token de ID de Google, retornar error
                return Response({'error': 'Invalid ID token'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'ID token not provided'}, status=status.HTTP_400_BAD_REQUEST)
    



class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        # Obtener el usuario a eliminar
        user = request.user

        # Eliminar el usuario y sus tokens
        user.delete()
        Token.objects.filter(user=user).delete()

        return Response({"mensaje": "Usuario eliminado exitosamente"}, status=204)
    

class TokenRefreshView(TokenRefreshView):
    pass

class TokenVerifyView(TokenVerifyView):
    pass



class UserPermissionSettingsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        
       
        try:
            user_permission_settings = UserPermissionSettings.objects.get(user_account=request.user)
        except UserPermissionSettings.DoesNotExist:
            return JsonResponse({'error': 'UserPermissionSettings does not exist'}, status=404)

            

        # Comprobar si el usuario autenticado es el propietario del objeto UserAccount correspondiente
        if request.user!= user_permission_settings.user_account:
            raise PermissionDenied("You are not authorized to view this resource")



        data = {
            'can_mentions': user_permission_settings.can_mentions,
            'hidden_me_comments_especific_words': list(user_permission_settings.hidden_me_comments_especific_words.values_list('word_name', flat=True)),
            'hidden_others_comments_especific_words': list(user_permission_settings.hidden_others_comments_especific_words.values_list('word_name', flat=True)),
            'messages_friends': user_permission_settings.messages_friends,
            'messages_followers': user_permission_settings.messages_followers,
            'messages_following': user_permission_settings.messages_following,
            'messages_contact': user_permission_settings.messages_contact,
            'messages_others': user_permission_settings.messages_others,
            'show_on_standard_pins': user_permission_settings.show_on_standard_pins,
            'show_on_idea_pins': user_permission_settings.show_on_idea_pins,
            'auto_play_videos': user_permission_settings.auto_play_videos,
        }

        return JsonResponse(data)
    



class UserPermissionSettingsUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get_user_permission_settings(self, request):
        try:
            user_permission_settings = UserPermissionSettings.objects.get(user_account=request.user)
            return user_permission_settings
        except UserPermissionSettings.DoesNotExist:
            return None

    def put(self, request, *args, **kwargs):
        user_permission_settings = self.get_user_permission_settings(request)
        if not user_permission_settings:
            return JsonResponse({'error': 'UserPermissionSettings does not exist'}, status=404)
        if user_permission_settings.user_account != request.user:
            return JsonResponse({'error': 'You are not authorized to perform this action'}, status=403)

        can_mentions = request.data.get('can_mentions')
        if can_mentions:
            user_permission_settings.can_mentions = can_mentions

        messages_friends = request.data.get('messages_friends')
        if messages_friends:
            user_permission_settings.messages_friends = messages_friends

        messages_followers = request.data.get('messages_followers')
        if messages_followers:
            user_permission_settings.messages_followers = messages_followers

        messages_following = request.data.get('messages_following')
        if messages_following:
            user_permission_settings.messages_following = messages_following

        messages_contact = request.data.get('messages_contact')
        if messages_contact:
            user_permission_settings.messages_contact = messages_contact

        messages_others = request.data.get('messages_others')
        if messages_others:
            user_permission_settings.messages_others = messages_others

        show_on_standard_pins = request.data.get('show_on_standard_pins')
        if show_on_standard_pins is not None:
            user_permission_settings.show_on_standard_pins = show_on_standard_pins

        show_on_idea_pins = request.data.get('show_on_idea_pins')
        if show_on_idea_pins is not None:
            user_permission_settings.show_on_idea_pins = show_on_idea_pins

        auto_play_videos = request.data.get('auto_play_videos')
        if auto_play_videos is not None:
            user_permission_settings.auto_play_videos = auto_play_videos
        

        # actulizar los campos de array

        hidden_me_comments_especific_words = request.data.get('hidden_me_comments_especific_words')
        if hidden_me_comments_especific_words:
            # elimina todos los elementos anteriores de la lista
            user_permission_settings.hidden_me_comments_especific_words.clear()
            # agrega los nuevos elementos a la lista
            for word_name in hidden_me_comments_especific_words:
                word, created = CommentEspecificWords.objects.get_or_create(word_name=word_name)
                user_permission_settings.hidden_me_comments_especific_words.add(word)

        hidden_others_comments_especific_words = request.data.get('hidden_others_comments_especific_words')
        if hidden_others_comments_especific_words:
            # elimina todos los elementos anteriores de la lista
            user_permission_settings.hidden_others_comments_especific_words.clear()
            # agrega los nuevos elementos a la lista
            for word_name in hidden_others_comments_especific_words:
                word, created = CommentEspecificWords.objects.get_or_create(word_name=word_name)
                user_permission_settings.hidden_others_comments_especific_words.add(word)

        try:
            user_permission_settings.save()
            serializer = UserPermissionSettingsSerializer(user_permission_settings)

            return Response({'message': 'UserPermissionSettings updated successfully', 'data': serializer.data})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=200)