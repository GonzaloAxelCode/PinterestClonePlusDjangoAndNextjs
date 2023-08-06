from rest_framework import serializers
from apps.pin.serializers import PinSerializer

from apps.user.serializers import UserSerializer
from .models import Board, BoardCollaboratorPermission
from .models import BoardCollaborator

class BoardSerializer(serializers.ModelSerializer):
    #user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    #pins = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user = serializers.StringRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    pins = PinSerializer(many=True, read_only=True)

    class Meta:
        model = Board
        fields = (      'id', 'name', 'description','is_active', 'category', 'user', 'created_at', 'updated_at', 'is_private', 'pins')
        read_only_fields = ('id', 'created_at', 'updated_at', 'pins')





class BoardCollaboratorPermissionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BoardCollaboratorPermission
        fields = ['id','permission']


class BoardCollaboratorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    permissions = BoardCollaboratorPermissionSerializer(many=True, read_only=True)
    class Meta:
        model = BoardCollaborator
        fields = ['id', 'user', 'date_joined', 'permissions',"board"]