from django.contrib import admin
from .models import Board, BoardCollaborator, BoardCollaboratorPermission


admin.site.register(Board)
admin.site.register(BoardCollaborator)
admin.site.register(BoardCollaboratorPermission)