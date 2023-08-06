from django.shortcuts import render

# Create your views here.
from algoliasearch.search_client import SearchClient
from django.http import JsonResponse
from django.views import View
from django.http import JsonResponse
from django.views import View
from algoliasearch_django import raw_search
from rest_framework.response import Response

from rest_framework.views import APIView
from apps.pin.models import Pin
from apps.user_profile.models import UserProfile
from django.contrib.auth import get_user_model

from core.settings import ALGOLIA
User = get_user_model()

client = SearchClient.create(ALGOLIA['APPLICATION_ID'], ALGOLIA['API_KEY'])


class SearchView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')
        search_type = request.GET.get('rs', '')
        
        attributes_to_retrieve = ['title', 'description', 'pin_about', 'category']
        ranking = ['typo', 'geo', 'words', 'proximity', 'attribute', 'exact', 'custom']
        

        data = {
    
            }
        
        try:
            # para pins
            

            
            if search_type == 'pins':
                search_params = {
                    'attributesToRetrieve': attributes_to_retrieve,
                    'hitsPerPage': 10,
                    'ranking': ranking,
                    'restrictSearchableAttributes': ['title', 'description', 'pin_about', 'category'],
                    'queryType': 'prefixLast',
                    'minWordSizefor1Typo': 3,
                    'minWordSizefor2Typos': 7,
                    'advancedSyntax': True
                }
                index = client.init_index(ALGOLIA['PINS_INDEX'])
                results = index.search(query, search_params)
                pins_search = {
                    'results': results['hits'],
                    'query': query,
                    'search_type': search_type
                }

                for pin in pins_search['results']:
                    pin_obj = Pin.objects.get(id=pin['objectID'])
                    pin['user_id'] = pin_obj.user.id
                    pin['image_pin'] = pin_obj.image.url if pin_obj.image else None
                data["pins"] = pins_search 

            elif search_type == 'boards':
                search_params = {
                    'attributesToRetrieve': attributes_to_retrieve,
                    'hitsPerPage': 10,
                    'ranking': ranking,
                    'restrictSearchableAttributes': ['name', 'description', 'category'],
                    'queryType': 'prefixLast',
                    'minWordSizefor1Typo': 3,
                    'minWordSizefor2Typos': 7,
                    'advancedSyntax': True
                }
                index = client.init_index(ALGOLIA['BOARDS_INDEX'])
                results = index.search(query, search_params)
                boards_search = {
                    'results': results['hits'],
                    'query': query,
                    'search_type': search_type
                }
                
                # Agregando URLs de 3 pins para cada board
                for board in boards_search['results']:
                    board_id = board['objectID']
                    board_pins = Pin.objects.filter(board_id=board_id)
                    if board_pins.exists():
                        board_pins_urls = board_pins.values_list('image', flat=True)[:3]
                        board['board_pins'] = list(board_pins_urls)
                        board['num_pins'] = board_pins.count()
                    else:
                        board['board_pins'] = []


                data["boards"] = boards_search
            elif search_type == 'users':
                search_params = {
                    'hitsPerPage': 10,
                    'restrictSearchableAttributes': ['email', 'username', 'first_name', 'last_name'],
                    'queryType': 'prefixLast',
                    'minWordSizefor1Typo': 3,
                    'minWordSizefor2Typos': 7,
                    'advancedSyntax': True
                }
                index = client.init_index(ALGOLIA['USERACCOUNT_INDEX'])
                results = index.search(query, search_params)
                users_search = {
                    'results': results['hits'],
                    'query': query,
                    'search_type': search_type
                }
                for user in users_search['results']:
                    # agergando el avatar
                    user_obj = User.objects.get(id=user['objectID'])
                    user_profile = UserProfile.objects.get(user=user_obj)
                    user['avatar'] = user_profile.avatar.url if user_profile.avatar else None
                    #agregando 4 pins
                    user_pins = Pin.objects.filter(user_id=user['objectID'])
                    if user_pins.exists():
                        user_pins_urls = user_pins.values_list('image', flat=True)[:4]
                        user['user_pins'] = list(user_pins_urls)
                    else:
                        user['user_pins'] = []

                    user_profile = UserProfile.objects.filter(user_id=user['objectID']).first()
                    if user_profile:
                        user['followers_count'] = user_profile.followers.count()
                    else:
                        user['followers_count'] = 0

                data["users"] = users_search


            else:
                return Response({'error': 'Invalid search type :' + search_type })
        
        except Exception as e:
            return Response({'error__search': str(e)})
        



        return Response(data)