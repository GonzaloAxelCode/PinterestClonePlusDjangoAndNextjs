
from django.urls import path

from apps.comments.views import AddCommentReplyView, CommentCreateView, CommentLikeAPIView, CommentLikeUsersAPIView, CommentListView, CommentUpdateAPIView, CommentdRemoveLikeView, CountCommentsView, DeleteCommentView, ListCommentRepliesView
urlpatterns = [
    # ... otras URLs ...
    path("comment/pin/<int:pin_id>/",CommentCreateView.as_view(),name="comment_to_pin_create"),
    path("comments/pin/<int:pin_id>/",CommentListView.as_view(),name="comment_list_id_pin"),
    path('comment/reply/create/<int:parent_id>/', AddCommentReplyView.as_view(), name='comment_reply_create'),
    path('comments/reply/list/<int:parent_id>/', ListCommentRepliesView.as_view(), name='comment_reply_list'),
    path('comment/delete/<int:comment_id>/', DeleteCommentView.as_view(), name='delete_comment'),
    path('comments/count/<int:pin_id>/', CountCommentsView.as_view(), name='comment_reply_list'),
    path('comments/<int:comment_id>/add_like/', CommentLikeAPIView.as_view(), name='comment-like'),
    path('comments/<int:comment_id>/remove_like/', CommentdRemoveLikeView.as_view(), name='comment-unliked'),
    path('comments/<int:comment_id>/likes/users/',CommentLikeUsersAPIView.as_view(), name="list_users_liked_comment"),
    path('comments/<int:comment_id>/update/',CommentUpdateAPIView.as_view(), name="update_comment")
]