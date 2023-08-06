from django.contrib.auth import get_user_model
from django.conf import settings
from algoliasearch_django import AlgoliaIndex

from algoliasearch_django.decorators import register
from core.settings import ALGOLIA

User = get_user_model()
@register(User)
class UserAccountIndex(AlgoliaIndex):
    fields = ('email', 'username', 'first_name', 'last_name')
    searchable_fields = ['email', 'username', 'first_name', 'last_name']
    settings = {'searchableAttributes': ['email', 'username', 'first_name', 'last_name']}
    index_name = ALGOLIA['USERACCOUNT_INDEX']