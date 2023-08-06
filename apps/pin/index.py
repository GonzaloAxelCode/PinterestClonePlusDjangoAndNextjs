
from apps.pin.models import Pin

from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from core.settings import ALGOLIA
@register(Pin)
class PinIndex(AlgoliaIndex):
    fields = ('title', 'description', 'pin_about', 'category')
    searchable_fields = ['title', 'description', 'pin_about', 'category']
    settings = {'searchableAttributes': ['title', 'description', 'pin_about', 'category','get_image_url']}
    custom_ranking = ['-created_at']

    index_name = ALGOLIA['PINS_INDEX']