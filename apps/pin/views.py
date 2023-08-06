from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from urllib.parse import unquote
from rest_framework.views import APIView
from apps.board.models import Board, BoardCollaborator, BoardCollaboratorPermission
from .serializers import PinSerializer
from .models import Pin

from rest_framework.permissions import IsAuthenticated
# Create your views here.
class PinCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PinSerializer

    def post(self, request, *args, **kwargs):
        # Obtener los datos del request
        title = request.data.get('title')
        pin_about = request.data.get('pin_about')
        description = request.data.get('description')
        destination_link = request.data.get('destination_link')
        image = request.data.get('image')
        board_id = request.data.get('board_id')

        # Verificar si ya existe un pin con ese nombre
        if Pin.objects.filter(title=title).exists():
            return Response({'message': 'Ya existe un pin con ese nombre'}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener el board correspondiente al board_id
        try:
            board = Board.objects.get(id=board_id)
        except Board.DoesNotExist:
            return Response({'message': 'No existe un board con ese ID'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el usuario es el dueño del Board o un colaborador con los permisos adecuados
        is_owner = board.user == request.user
        
        try:
            collaborator = BoardCollaborator.objects.get(user=request.user, board=board)
        except BoardCollaborator.DoesNotExist:
            collaborator = None

        if not is_owner and (collaborator is None or 'add_pin' not in collaborator.permissions.values_list('permission', flat=True)):
            return Response({'message': 'No tienes permiso para agregar un pin en este Board'}, status=status.HTTP_403_FORBIDDEN)

        # Crear el objeto Pin y guardar los datos
        pin = Pin(title=title, pin_about=pin_about, description=description, destination_link=destination_link, image=image, board=board, user=request.user)
        pin.save()

        # Serializar el objeto Pin y devolver la respuesta
        serializer = PinSerializer(pin)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PinsAllView(generics.ListCreateAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


class PinsListView(APIView):
    
    def get(self, request, *args, **kwargs):
        try:
            user_pins = Pin.objects.filter(user=request.user)
            serializer = PinSerializer(user_pins, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_404_NOT_FOUND)


class PinView(APIView):
    def get(self, request, title):
        try:
            decoded_title = unquote(title)
            pin = Pin.objects.get(title=decoded_title)
            data = {
                'id': pin.id,
                'title': pin.title,
                'description': pin.description,
                'pin_about': pin.pin_about,
                'image': pin.image.url if pin.image else None,
                'source_url': pin.source_url,
                'destination_link': pin.destination_link,
                'category': pin.category,
                'created_at': pin.created_at.isoformat(),
                'repin_count': pin.repin_count,
                'like_count': pin.like_count,
                'buy_link': pin.buy_link,
                'price': pin.price,
                'is_active': pin.is_active,
                'is_public': pin.is_public,
            }
            tags = []
            for tag in pin.tags.all():
                tags.append(tag.name)
            data['tags'] = tags
            return Response(data, status=status.HTTP_200_OK)
        except Pin.DoesNotExist:
            return Response({'error': 'Pin not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class PinListByBoard(APIView):
    def get(self, request, id_board):
        try:
            board = Board.objects.get(pk=id_board)
        except Board.DoesNotExist:
            return Response("Board not found.", status=status.HTTP_404_NOT_FOUND)
        pins = Pin.objects.filter(board=board)
        if not pins.exists():
            return Response("No pins found for this board.", status=status.HTTP_204_NO_CONTENT)
        serializer = PinSerializer(pins, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PinDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        try:
            pin_id = kwargs['id_pin']
            pin = get_object_or_404(Pin, id=pin_id, user=request.user)
            pin.delete()
            return JsonResponse({'success': True})
        except Pin.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Pin does not exist'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
        

class PinUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PinSerializer

    def put(self, request, id_pin):
        try:
            pin = Pin.objects.get(pk=id_pin)
        except Pin.DoesNotExist:
            return Response({"detail": "El pin que quieres actualizar no existe."}, status=status.HTTP_404_NOT_FOUND)

        if pin.user != request.user:
            return Response({"detail": "No tienes permiso para actualizar este pin."}, status=status.HTTP_403_FORBIDDEN)

        pin.title = request.data.get('title', pin.title)
        pin.description = request.data.get('description', pin.description)
        pin.pin_about = request.data.get('pin_about', pin.pin_about)
        pin.destination_link = request.data.get('destination_link', pin.destination_link)
        pin.comment_permissions = request.data.get('comment_permissions', pin.comment_permissions)
        pin.recommendations = request.data.get('recommendations', pin.recommendations)

        try:
            board_id = request.data['board_id']
            board = Board.objects.get(pk=board_id)
            pin.board = board
        except (KeyError, Board.DoesNotExist):
            pass


                # Actualizamos la imagen del pin si se envió una en la petición
        image = request.FILES.get('image', None)
        if image:
            pin.image = image    
        pin.save()

        serializer = PinSerializer(pin)
        return Response(serializer.data)
    