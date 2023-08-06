from django.urls import path
from .views import PinCreateView, PinDeleteView, PinListByBoard, PinUpdateView, PinView, PinsAllView, PinsListView

urlpatterns = [
    path('pins/all/', PinsAllView.as_view(), name='all_pins'),
    path('pins/me/', PinsListView.as_view(), name='pins_user'),
    
    
    path('pins/create/', PinCreateView.as_view(), name='create_pin'),
    path('pins/board/<int:id_board>/', PinListByBoard.as_view(), name='create_pin'),

    path('pin/<str:title>/', PinView.as_view(), name='pin_by_title'),





    path('pin/<int:id_pin>/delete/', PinDeleteView.as_view(), name='create_pin'),
    path('pin/<int:id_pin>/update/', PinUpdateView.as_view(), name='update_pin'),
]