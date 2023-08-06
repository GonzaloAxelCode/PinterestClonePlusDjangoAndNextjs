from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model

from apps.pin.models import Pin
User = get_user_model()

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    pin = models.ForeignKey(Pin, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    text = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    like_count = models.PositiveIntegerField(default=0)
    helpful_count = models.PositiveIntegerField(default=0)
    likes = models.ManyToManyField(User, through='CommentLike', related_name='liked_comments')
    
class CommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE,null=True)
    is_like = models.BooleanField(default=True)


class CommentReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='reports')
    reason = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)