import algoliasearch_django as algoliasearch

#from apps.board.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

algoliasearch.register(User)



