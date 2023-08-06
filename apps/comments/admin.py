
# Register your models here.
from django.contrib import admin
from .models import Comment, CommentLike, CommentReport


admin.site.register(Comment)
admin.site.register(CommentLike)
admin.site.register(CommentReport)