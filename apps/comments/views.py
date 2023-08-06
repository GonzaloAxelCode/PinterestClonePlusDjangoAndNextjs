from django.utils import timezone

from django.http import Http404, JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.comments.models import Comment, CommentLike, CommentReport
from apps.pin.models import Pin
from apps.user.serializers import UserSerializer
from .serializers import CommentSerializer
from rest_framework import generics, permissions, status
from django.core.exceptions import ObjectDoesNotExist
from django.views import View
from django.utils.decorators import method_decorator

from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count
from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.exceptions import NotFound, PermissionDenied
class CommentCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        # Obtenemos los datos del request
        
        pin_id = kwargs.get('pin_id')
        text = request.data.get('text')
        user = request.user

        # Validamos que el pin exista
        try:
            pin = Pin.objects.get(id=pin_id)
        except Pin.DoesNotExist:
            return Response({'message': 'El pin no existe'}, status=status.HTTP_404_NOT_FOUND)

        # Creamos el comentario
        comment = Comment()
        comment.pin = pin
        comment.user = user
        comment.text = text

        # Guardamos el comentario y serializamos la respuesta
        comment.save()
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CommentListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer
    def get(self, request, pin_id):
        try:
            pin = Pin.objects.get(id=pin_id)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Pin does not exist'}, status=404)
        
        comments = Comment.objects.filter(pin=pin)
        comment_list = []
        for comment in comments:
            replies_count = comment.replies.filter(is_active=True).count()
            comment_list.append({
                'id': comment.id,
                'user': comment.user.username,
                'text': comment.text,
                'created_at': comment.created_at,
                'is_active': comment.is_active,
                'updated_at': comment.updated_at,
                'like_count': comment.like_count,
                'helpful_count': comment.helpful_count,
                 'replies_count': replies_count
            })
            
        return JsonResponse({'comments': comment_list})
    


class AddCommentReplyView(APIView):
    """
    View para agregar una respuesta a un comentario
    """
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        parent_id = kwargs.get('parent_id')
        #comment = get_object_or_404(Comment, id=parent_id)
        comment = Comment.objects.get(id=parent_id, is_active=True)
        #   comment = get_object_or_404(Comment.objects.filter(id=parent_id, is_active=True))

        #text = request.POST.get('text', None)
        text = request.data['text']

        # Validar que el usuario tenga permiso para agregar una respuesta al comentario
        if not request.user.is_authenticated :
            return JsonResponse({'error': 'No tiene permiso para realizar esta acción.'}, status=403)

        # Validar que el texto no esté vacío
        if not text:
            return JsonResponse({'error': 'El texto de la respuesta no puede estar vacío.'}, status=400)

        # Crear la respuesta y guardarla en la base de datos
        reply = Comment.objects.create(user=request.user, pin=comment.pin, parent=comment, text=text)

        return JsonResponse({'success': f'Respuesta agregada correctamente con id {reply.id}.'}, status=201)




class ListCommentRepliesView(APIView):
    

    """
    View para enlistar las respuestas de un comentario
    """
    def get(self, request, *args, **kwargs):
        parent_id = kwargs.get('parent_id')
        try:
            comment = Comment.objects.get(id=parent_id)
        except Comment.DoesNotExist:
            return Response({'error': f'Comment with id {parent_id} does not exist'}, status=status.HTTP_404_NOT_FOUND)



        comment = get_object_or_404(Comment, id=parent_id)
        #comment = Comment.objects.get(id=parent_id, is_active=True)

        # Obtener las respuestas del comentario
        replies = comment.replies.filter(is_active=True)


        # Serializar las respuestas para enviarlas en la respuesta HTTP
        serialized_replies = []
        for reply in replies:
            serialized_replies.append({
                'id': reply.id,
                'parent_id':parent_id,

                'user_id': reply.user.id,
                'username': reply.user.username,

                'text': reply.text,
                'is_active': reply.is_active,
                'created_at': reply.created_at.isoformat(),
                'updated_at': reply.updated_at.isoformat(),
                'like_count': reply.like_count,
                'helpful_count': reply.helpful_count,
                'is_liked': CommentLike.objects.filter(user=request.user, comment=reply, like_type=1).exists() if request.user.is_authenticated else False,
                'is_disliked': CommentLike.objects.filter(user=request.user, comment=reply, like_type=-1).exists() if request.user.is_authenticated else False,
                'is_helpful': CommentLike.objects.filter(user=request.user, comment=reply, like_type=3).exists() if request.user.is_authenticated else False,
                'is_reported': CommentReport.objects.filter(user=request.user, comment=reply).exists() if request.user.is_authenticated else False,
            })


        return Response({'replies': serialized_replies},status=200)
    

class DeleteCommentView(APIView):
    def delete(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        
        # Verificar que el usuario actual sea el propietario del comentario
        if comment.user != request.user:
            return Response({"detail": "No tienes permiso para eliminar este comentario."}, status=status.HTTP_403_FORBIDDEN)

        # Verificar si el comentario tiene respuestas
        if comment.replies.exists():
            comment.is_active = False
            comment.save()
            return Response({"detail": "Este comentario tiene respuestas por lo tanto ha sido desactivado.Si quieres eliminarlo  activa tus persmisos en el perfil de usuario."}, status=status.HTTP_204_NO_CONTENT)
        
        # Desactivar el comentario
        comment.is_active = False
        comment.save()
        return Response({"detail": "El comentario ha sido desactivado."}, status=status.HTTP_204_NO_CONTENT)    

class CountCommentsView(APIView):
    def get(self, request, pin_id):
        try:
            pin = Pin.objects.get(id=pin_id)
        except Pin.DoesNotExist:
            return Response({'detail': 'Pin not found'}, status=404)

        comments = Comment.objects.filter(pin=pin, is_active=True).annotate(replies_count=Count('replies'))
        comments_count = comments.count()
        replies_count = comments.aggregate(total_replies=Count('replies'))['total_replies']

        data = {
            'total_comments': comments_count,
            'total_replies': replies_count,
            'comments': []
        }

        for comment in comments:
            data['comments'].append({
                'comment_id': comment.id,
                
                'replies_count': comment.replies_count
            })

        return Response(data)


class CommentLikeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)
        except ObjectDoesNotExist:      
            return JsonResponse({'error': 'Comment does not exist'}, status=404)

        # Check if the user already liked the comment
        if comment.likes.filter(id=request.user.id).exists():
            comment_like = CommentLike.objects.get(comment=comment, user=request.user)
            if comment_like.is_like:
                return JsonResponse({'error': 'You already liked this comment'}, status=400)
            else:
                comment_like.is_like = True
                comment_like.save()
                return JsonResponse({'success': 'Comment liked again'}, status=200)
        # Create a new CommentLike object and increment the like_count
        comment_like = CommentLike.objects.create(comment=comment, user=request.user)
        comment_like.is_like = True
        comment.like_count += 1
        comment.save()

        return JsonResponse({'success': 'Comment liked'})

class CommentdRemoveLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)
        except ObjectDoesNotExist:      
            return JsonResponse({'error': 'Comment does not exist'}, status=404)

        # Check if the user already disliked the comment
        comment_dislike = comment.likes.filter(id=request.user.id).first()
        if not comment_dislike:
            return JsonResponse({'error': 'No has dado like antes'}, status=400)

        # Check if the user already liked the comment, and remove the like
        
        comment_like = CommentLike.objects.get(comment=comment, user=request.user)
        if comment_like:
            comment_like.is_like = False
            comment_like.save()
            comment.like_count -= 1
            if comment.like_count < 0:
                comment.like_count = 0

        return JsonResponse({'success': 'Comment disliked'})
    



class CommentLikeUsersAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        comment_id = self.kwargs.get('comment_id')
        comment = Comment.objects.filter(id=comment_id).first()

        if not comment:
            return User.objects.none()

        # Get all CommentLike objects for the comment
        comment_likes = CommentLike.objects.filter(comment=comment,is_like=True)

        # Get all unique users that have liked or disliked the comment
        user_ids = set([like.user_id for like in comment_likes])

        # Get User objects for each user_id
        users = User.objects.filter(id__in=user_ids)

        return users

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        comment_id = self.kwargs.get('comment_id')
        data = {
            'comment_id': comment_id,
            'users_is_liked': serializer.data
        }
        return Response(data)
    

class CommentUpdateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id, user=request.user)
        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found.")
        except Exception as e:
            raise PermissionDenied(detail=str(e))

        # Get the new text value from the request data
        text = request.data.get("text")

        # Update the comment with the new text value and the current timestamp
        comment.text = text
        comment.updated_at = timezone.now()
        comment.save()

        # Return a success response with the updated comment data
        return JsonResponse({
            "success": "Comment updated successfully.",
            "comment": {
                "id": comment.id,
                "user": comment.user.id,
                "pin": comment.pin.id,
                "text": comment.text,
                "created_at": comment.created_at,
                "updated_at": comment.updated_at,
                "like_count": comment.like_count,
                "helpful_count": comment.helpful_count,
            }
        })