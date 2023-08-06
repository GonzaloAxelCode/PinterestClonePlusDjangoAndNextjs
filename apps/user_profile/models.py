from apps.user.countries import Countries
from django.contrib.postgres.fields import ArrayField
from apps.user.countries import Countries
from apps.user.languages import Languages
from django.db import models
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL
# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    about_me = models.TextField(blank=True)
    website = models.URLField(blank=True)
    
    gener = models.CharField(max_length=100, blank=True)
    country_region = models.CharField(
        max_length=255, choices=Countries.choices, default=Countries.Peru)
    languages = models.CharField(
        max_length=255, choices=Languages.choices, default=Languages.Español)
    
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True)
    cover_image = models.ImageField(upload_to='photo/covers/%Y/%m', blank=True)
    avatar = models.ImageField(upload_to='photo/avatars/%Y/%m', blank=True)

    def get_thumbnail_avatar(self):
        return self.avatar.url

    def get_thumbnail_cover(self):
        return self.cover_image.url