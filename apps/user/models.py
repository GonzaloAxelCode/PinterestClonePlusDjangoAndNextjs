
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from rest_framework.authtoken.models import Token
from django.db import models
from rest_framework.permissions import BasePermission
from google.auth.transport import requests
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction

from apps.user_profile.models import UserProfile




class UserManager(BaseUserManager):
    def create_user(self, email,username, password=None, **extra_fields):
        if not email:
            raise ValueError('El email debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(email=email,  username=username ,**extra_fields)
        user.set_password(password)
        
        user.save(using=self._db)
        profile = UserProfile.objects.create(user=user)
        profile.save()

        settings = UserPermissionSettings.objects.create(user=user)
        settings.save()
       
        return user

    def create_superuser(self, email, username,password, **extra_fields):
        user = self.create_user(email, username,password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

 
class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_registered_with_google = models.BooleanField(default=False,blank=True)
    desactivate_account = models.BooleanField(default=False)
    
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.username

    def get_full_name(self):
        if self.first_name and self.last_name:
            return f'{self.first_name} {self.last_name}'
        return self.username
    def get_short_name(self):
        return self.username
    

from django.contrib.auth import get_user_model
User = get_user_model()
class CommentEspecificWords(models.Model):
    
    word_name = models.CharField(max_length=200,blank=True,null=True)
    def __str__(self): 
        return self.word_name
    

class UserPermissionSettings(models.Model):
    CAN_MENTIONS_CHOICES = [
        ("anyone_on_pinterest","Anyone on Pinterest"),
        ("only_people_you_follow","Only people you follow"),
        ("turn_off_mentions","Turn off mentions for you"),
    ]
    CAN_SEND_MESSAGES = [
        ("direct_messages","Direct messages"),
        ("message_requests","Message requests"),
        ("ignore","Ignore"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True) 


    can_mentions =models.CharField(max_length=50, choices=CAN_MENTIONS_CHOICES,blank=True) 

    hidden_me_comments_especific_words = models.ManyToManyField("CommentEspecificWords",related_name="comment_especific_words", blank=True)     
    hidden_others_comments_especific_words = models.ManyToManyField("CommentEspecificWords",related_name="comment_especific_words_others", blank=True)     

    messages_friends= models.CharField(max_length=50, choices=CAN_SEND_MESSAGES,blank=True)
    messages_followers= models.CharField(max_length=50, choices=CAN_SEND_MESSAGES,blank=True)
    messages_following= models.CharField(max_length=50, choices=CAN_SEND_MESSAGES,blank=True)
    messages_contact= models.CharField(max_length=50, choices=CAN_SEND_MESSAGES,blank=True)
    messages_others= models.CharField(max_length=50, choices=CAN_SEND_MESSAGES,blank=True)
    
    
    show_on_standard_pins =models.BooleanField(default=True)
    show_on_idea_pins=models.BooleanField(default=True)
    auto_play_videos=models.BooleanField(default=True)


