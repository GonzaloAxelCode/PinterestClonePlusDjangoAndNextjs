from django.forms import ValidationError
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status
from urllib.parse import unquote

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from apps.board.decorators import board_active_required
from django.utils.decorators import method_decorator
from apps.board.serializers import  BoardCollaboratorPermissionSerializer, BoardCollaboratorSerializer, BoardSerializer


from .models import Board, BoardCollaborator, BoardCollaboratorPermission

from rest_framework import generics, permissions
from rest_framework.exceptions import NotFound, ValidationError
from django.db.models import Q
from django.contrib.auth import get_user_model
User = get_user_model()


class BoardCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        try:
            # Ensure required fields are present
            name = request.data['name']
            description = request.data['description']
            category = request.data['category']
        except KeyError:
            return Response({'error': 'Missing required field(s).'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if board name already exists for this user
        if Board.objects.filter(name=name, user=request.user).exists():
            return Response({'error': 'A board with this name already exists.'}, 
                            status=status.HTTP_400_BAD_REQUEST)
    
        # Check if user is active
        if not request.user.is_active:
            return Response({'error': 'User is not active.'}, status=status.HTTP_400_BAD_REQUEST)

        # Save board
        board = Board(name=name, description=description, category=category, user=request.user)
        board.save()
        serializer = BoardSerializer(board)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    


class BoardRetrieveView(APIView):
    #permission_classes = [IsAuthenticated]

    def get(self, request, username, name, format=None):
        try:
            # Get board by name and user
            decoded_name = unquote(name)
            board = Board.objects.get(name=decoded_name, user__username=username)
            serializer = BoardSerializer(board)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Board.DoesNotExist:
            return Response({'error': 'Board not found.'}, status=status.HTTP_404_NOT_FOUND)

class BoardAllListView(generics.ListAPIView):
    serializer_class = BoardSerializer
    permission_classes = []

    def get(self, request, *args, **kwargs):
        try:
            #boards = Board.objects.all()
            boards = Board.objects.filter(is_active=True)
        except Board.DoesNotExist:
            return Response({"message": "No se encontraron tableros."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(boards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class BoardListView(generics.ListAPIView):
    serializer_class = BoardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            #boards = Board.objects.filter(Q(user=request.user) | Q(collaborators=request.user)).distinct()
            boards = Board.objects.filter(Q(user=request.user), is_active=True).distinct()
        except Board.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(boards, many=True)
        return Response({ "boards" : serializer.data})






class BoardUpdateView(generics.UpdateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [permissions.IsAuthenticated]

    #@method_decorator(board_active_required)
    def put(self, request, *args, **kwargs):
        # Obtener el board a actualizar
        board_id = kwargs.get('board_id')
        try:
            board = Board.objects.get(pk=board_id)
        except Board.DoesNotExist:
            return Response({'message': 'El board no existe'}, status=status.HTTP_404_NOT_FOUND)

        # Verificar que el usuario sea el dueño del board
        if request.user != board.user:
            return Response({'message': 'No tienes permisos para editar este board'}, status=status.HTTP_403_FORBIDDEN)

        # Actualizar el board con los datos enviados en el request
        serializer = self.get_serializer(board, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






#COLABORATORS

class BoardAddCollaboratorView(generics.CreateAPIView):
    serializer_class = BoardCollaboratorSerializer
    permission_classes = [permissions.IsAuthenticated]

    #@method_decorator(board_active_required)
    def post(self, request, *args, **kwargs):
        # Obtenemos el tablero a través del ID en la URL
        board_id = kwargs.get('board_id')
        try:
            board = Board.objects.get(pk=board_id)
        except Board.DoesNotExist:
            raise ValidationError('El tablero no existe.')

        # Verificamos si el usuario que hace la solicitud es el propietario del tablero
        if request.user != board.user:
            raise PermissionDenied('Solo el propietario del tablero puede agregar colaboradores.')

        email = request.data.get('email')
        if not email:
            raise ValidationError('Se requiere una dirección de correo electrónico para agregar un colaborador.')

        try:
            collaborator = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            raise ValidationError('No se encontró un usuario con esta dirección de correo electrónico.')

        # Verificamos si el colaborador ya está asociado con el tablero
        if BoardCollaborator.objects.filter(user=collaborator, board=board).exists():
            raise ValidationError('El usuario ya es colaborador del tablero.')

        # Creamos el objeto de colaborador del tablero con los permisos por defecto
        collaborator_object = BoardCollaborator.objects.create(user=collaborator, board=board)

        # Serializamos la respuesta y la devolvemos junto con el código de estado 201 (creado)
        serializer = self.serializer_class(collaborator_object)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class BoardCollaboratorListView(generics.ListAPIView):
    serializer_class = BoardCollaboratorSerializer
    permission_classes = [permissions.AllowAny]

    #@method_decorator(board_active_required)   
    def get(self, request, *args, **kwargs):
        board_id = kwargs.get('board_id')
        try:
            board = Board.objects.get(pk=board_id)
        except Board.DoesNotExist:
            return Response({"detail": "El tablero no existe."}, status=status.HTTP_404_NOT_FOUND)

        collaborators = board.collaborators.all()

        if collaborators.exists():
            board_collaborators = BoardCollaborator.objects.filter(board=board).select_related('user').prefetch_related('permissions')
            serializer = BoardCollaboratorSerializer(board_collaborators, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No hay colaboradores para este tablero."}, status=status.HTTP_404_NOT_FOUND)


class BoardCollaboratorPermissionListView(generics.ListAPIView):
    serializer_class = BoardCollaboratorPermissionSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        collaborator_id = kwargs.get('collaborator_id')
        try:
            collaborator = BoardCollaborator.objects.get(pk=collaborator_id)
        except BoardCollaborator.DoesNotExist:
            return Response({"detail": "El colaborador no existe."}, status=status.HTTP_404_NOT_FOUND)

        permissions = collaborator.permissions.all()

        if permissions.exists():
            serializer = self.serializer_class(permissions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Este colaborador no tiene permisos."}, status=status.HTTP_404_NOT_FOUND)
        

class BoardCollaboratorGrantPermissionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, board_collaborator_id):
        try:
            collaborator = get_object_or_404(BoardCollaborator, id=board_collaborator_id)
            board = collaborator.board

            # Check if user making request is the owner of the board
            if request.user != board.user:
                return Response({'error': 'Only the board owner can assign permissions.'}, status=status.HTTP_403_FORBIDDEN)

            # Check if the board id in the request data matches the board id of the collaborator
            board_id = request.data.get('board_id')
            if not board_id:
                return Response({'error': 'Board id not provided.'}, status=status.HTTP_400_BAD_REQUEST)
            if str(board_id) != str(board.id):
                return Response({'error': 'Permissions can only be assigned to the specified board.'}, status=status.HTTP_400_BAD_REQUEST)

            # Get the list of permissions from the request data
            permissions_data = request.data.get('permissions', [])

            # Serialize each permission and add it to the collaborator's permissions
            for permission_data in permissions_data:
                permission_serializer = BoardCollaboratorPermissionSerializer(data=permission_data)
                permission_serializer.is_valid(raise_exception=True)

                # Check if permission already exists for the collaborator
                if collaborator.permissions.filter(permission=permission_serializer.validated_data['permission']).exists():
                    return Response({'error': f'Permission {permission_serializer.validated_data["permission"]} already exists.'}, status=status.HTTP_400_BAD_REQUEST)

                permission_serializer.save(collaborator=collaborator)

            return Response({'success': 'Permissions added successfully.'}, status=status.HTTP_200_OK)

        except BoardCollaborator.DoesNotExist:
            return Response({'error': 'Board collaborator does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


class BoardCollaboratorDeletePermissionView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #@method_decorator(board_active_required)
    def delete(self, request, board_id, collaborator_id, permission_id):
        try:
            # Check if user making request is the owner of the board
            board = get_object_or_404(Board, id=board_id, user=request.user)
            collaborator = get_object_or_404(BoardCollaborator, id=collaborator_id, board=board)
            permission = get_object_or_404(BoardCollaboratorPermission, id=permission_id, collaborator=collaborator)

            permission.delete()

            return Response({'success': 'Permission deleted successfully.'}, status=status.HTTP_200_OK)

        except Board.DoesNotExist:
            return Response({'error': 'Board does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        except BoardCollaborator.DoesNotExist:
            return Response({'error': 'Board collaborator does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        except BoardCollaboratorPermission.DoesNotExist:
            return Response({'error': 'Board collaborator permission does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class BoardDeactivateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    #@method_decorator(board_active_required)
    def put(self, request, board_id):
        try:
            board = Board.objects.get(id=board_id)
        except Board.DoesNotExist:
            return Response({'error': 'Board no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Verificar si el usuario actual es el dueño del board
        if request.user != board.user:
            return Response({'error': 'Solo el dueño del board puede desactivarlo.'}, status=status.HTTP_403_FORBIDDEN)

        board.is_active = False
        board.save()

        return Response({'success': 'Board desactivado exitosamente.'}, status=status.HTTP_200_OK)