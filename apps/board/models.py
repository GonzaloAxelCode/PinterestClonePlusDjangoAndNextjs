from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import ArrayField
# Create your models here.


class Board(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    cover_image = models.ImageField(upload_to='photo/boards/%Y/%m', null=True, blank=True)
    is_private = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    followers = models.ManyToManyField(User, blank=True, related_name='following_boards')
    is_personalisation= models.BooleanField(default=True)
    #collaborators = models.ManyToManyField(User, through='BoardCollaborator', related_name='boards')
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
    

class BoardCollaborator(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    permissions=models.ManyToManyField("BoardCollaboratorPermission", related_name='board_permissions')
    date_joined = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('board', 'user')
        verbose_name_plural = 'Board Collaborators'


class BoardCollaboratorPermission(models.Model):
    PERMISSION_CHOICES = [
        ('add_pin', 'Add pin'),
        ('delete_pin', 'Delete pin'),
        ('move_pin', 'Move pin'),
        ('add_section', 'Add section'),
        ('delete_section', 'Delete section'),
        ('move_section', 'Move section'),
        ('comment', 'Comment'),
        ('react', 'React'),
        ('invite_collaborator', 'Invite collaborator'),
        ('remove_collaborator', 'Remove collaborator'),
    ]

    #collaborator = models.ForeignKey(BoardCollaborator, on_delete=models.CASCADE, related_name='permissions')
    permission = models.CharField(max_length=20, choices=PERMISSION_CHOICES)

    def __str__(self):
        return self.permission

