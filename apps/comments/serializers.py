from apps.comments.models import Comment

from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id","user","text","created_at","updated_at","like_count","helpful_count","pin"]