from django.shortcuts import get_object_or_404
from django.http import HttpResponseForbidden, JsonResponse

from apps.board.models import Board

def board_active_required(view_func):
    def wrapper(request, board_id, *args, **kwargs):
        board = get_object_or_404(Board, id=board_id, is_active=True)
       # if not board.is_active:
            
            #return JsonResponse({'message': 'El tablero está desactivado'}, status=401)

        return view_func(request, board, *args, **kwargs)
    return wrapper