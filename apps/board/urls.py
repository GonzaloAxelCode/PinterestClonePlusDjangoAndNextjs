from django.urls import path
from .views import BoardAddCollaboratorView, BoardCollaboratorDeletePermissionView, BoardCollaboratorGrantPermissionView, BoardCollaboratorListView, BoardCollaboratorPermissionListView, BoardCreateView, BoardAllListView, BoardDeactivateView, BoardListView, BoardRetrieveView, BoardUpdateView

urlpatterns = [
    # ... otras URLs ...
    path("boards/",BoardAllListView.as_view(),name="list_boards"),
    
    path("boards/me/",BoardListView.as_view(),name="list_boards_user"),
    path("boards/<str:username>/retrieve/<str:name>/",BoardRetrieveView.as_view(),name="board_retrieve"),

    
    path('boards/create/', BoardCreateView.as_view(), name='board_create'),
    path('boards/updated/<int:board_id>/', BoardUpdateView.as_view(), name='board_update'),
    path("boards/add_colaborator/<int:board_id>/",BoardAddCollaboratorView.as_view(),name="board_updated"),

    path("boards/collaborators/<int:board_id>/",BoardCollaboratorListView.as_view(),name="board_collaborators"),
    path("boards/collaborator/permissions/<int:collaborator_id>/",BoardCollaboratorPermissionListView.as_view(),name="board_collaborators"),

    path("boards/collaborator/grant_permissions/<int:board_collaborator_id>/",BoardCollaboratorGrantPermissionView.as_view(),name="board_collaborator_grantpermission"),
    path("boards/<int:board_id>/collaborator/<int:collaborator_id>/permission/<int:permission_id>/delete/",BoardCollaboratorDeletePermissionView.as_view(),name="delete_permission_colaborator_idboard"),
    path("boards/desactive/<int:board_id>/",BoardDeactivateView.as_view(),name="board_desactive")



    # ... otras URLs ...
]