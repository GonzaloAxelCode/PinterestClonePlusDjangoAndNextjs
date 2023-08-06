from django.db import models


class Languages(models.TextChoices):
    Español = 'Spanish',
    Ingles = 'English',
