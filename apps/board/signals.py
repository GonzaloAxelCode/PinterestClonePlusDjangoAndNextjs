import algoliasearch_django as algoliasearch

from apps.board.models import Board


algoliasearch.register(Board)


