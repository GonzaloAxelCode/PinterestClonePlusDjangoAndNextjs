from apps.board.models import Board
from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from core.settings import ALGOLIA

@register(Board)
class BoardIndex(AlgoliaIndex):
    fields = ('name', 'description', 'category', )
    searchable_fields = ['name', 'description', 'category', ]
    settings = {'searchableAttributes': ['name', 'description', 'category', ]}
    index_name = ALGOLIA['BOARDS_INDEX']