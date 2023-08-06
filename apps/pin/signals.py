import algoliasearch_django as algoliasearch

from apps.pin.models import Pin
algoliasearch.register(Pin)

