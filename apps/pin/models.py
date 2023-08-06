import datetime 
from django.contrib.auth import get_user_model
from apps.board.models import Board 
User = get_user_model() 
from django.db import models 
from algoliasearch_django import AlgoliaIndex

def generate_pin_image_path(instance, filename):
      return f'photos/{instance.board.name}/{datetime.datetime.now().strftime("%Y/%m")}/{filename}' 
class Pin(models.Model): 
    title = models.CharField(max_length=255, blank=True) 
    description = models.TextField(blank=True) 
    pin_about = models.TextField(blank=True) 
    image = models.ImageField(upload_to=generate_pin_image_path, blank=True, null=True) 
    source_url = models.URLField(blank=True) 
    destination_link = models.URLField(blank=True,null=True) 
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True) 
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='pins',null=True) 
    category = models.CharField(max_length=255, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True) 
    repin_count = models.PositiveIntegerField(default=0) 
    like_count = models.PositiveIntegerField(default=0) 
    tags = models.ManyToManyField('Tag', blank=True) 
    buy_link = models.URLField(blank=True) 
    price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True) 
    comment_permissions=models.BooleanField(default=True)
    recommendations=models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_public = models.BooleanField(default=True)  
    

    def __str__(self): 
        return self.title 
    def get_image_url(self):
        return self.image.url if self.image else ''


class Tag(models.Model): 
    name = models.CharField(max_length=50) 
    def __str__(self): 
        return self.name
    

