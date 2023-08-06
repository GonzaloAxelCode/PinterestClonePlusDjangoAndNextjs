from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.user.models import CommentEspecificWords, UserPermissionSettings


User = get_user_model()


class UserAcountCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "get_full_name",
            "get_short_name"
        )
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name','is_active',
                  'is_staff', 'is_superuser']
        
class CommentEspecificWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentEspecificWords
        fields = ('id', 'word_name')


class UserPermissionSettingsSerializer(serializers.ModelSerializer):
    hidden_me_comments_especific_words = CommentEspecificWordsSerializer(many=True, required=False)
    hidden_others_comments_especific_words = CommentEspecificWordsSerializer(many=True, required=False)

    class Meta:
        model = UserPermissionSettings
        fields = (
            'can_mentions',
            'hidden_me_comments_especific_words',
            'hidden_others_comments_especific_words',
            'messages_friends',
            'messages_followers',
            'messages_following',
            'messages_contact',
            'messages_others',
            'show_on_standard_pins',
            'show_on_idea_pins',
            'auto_play_videos',
        )

    def update(self, instance, validated_data):
        instance.can_mentions = validated_data.get('can_mentions', instance.can_mentions)
        instance.messages_friends = validated_data.get('messages_friends', instance.messages_friends)
        instance.messages_followers = validated_data.get('messages_followers', instance.messages_followers)
        instance.messages_following = validated_data.get('messages_following', instance.messages_following)
        instance.messages_contact = validated_data.get('messages_contact', instance.messages_contact)
        instance.messages_others = validated_data.get('messages_others', instance.messages_others)
        instance.show_on_standard_pins = validated_data.get('show_on_standard_pins', instance.show_on_standard_pins)
        instance.show_on_idea_pins = validated_data.get('show_on_idea_pins', instance.show_on_idea_pins)
        instance.auto_play_videos = validated_data.get('auto_play_videos', instance.auto_play_videos)

        hidden_me_comments_especific_words_data = validated_data.pop('hidden_me_comments_especific_words', [])
        hidden_me_comments_especific_words = []
        for word_data in hidden_me_comments_especific_words_data:
            word_id = word_data.get('id', None)
            if word_id:
                word = CommentEspecificWords.objects.get(id=word_id)
                word.word = word_data.get('word_name', word.word)
                word.save()
                hidden_me_comments_especific_words.append(word)
            else:
                word = CommentEspecificWords.objects.create(**word_data)
                hidden_me_comments_especific_words.append(word)
        instance.hidden_me_comments_especific_words.set(hidden_me_comments_especific_words)

        hidden_others_comments_especific_words_data = validated_data.pop('hidden_others_comments_especific_words', [])
        hidden_others_comments_especific_words = []
        for word_data in hidden_others_comments_especific_words_data:
            word_id = word_data.get('id', None)
            if word_id:
                word = CommentEspecificWords.objects.get(id=word_id)
                word.word = word_data.get('word_name', word.word)
                word.save()
                hidden_others_comments_especific_words.append(word)
            else:
                word = CommentEspecificWords.objects.create(**word_data)
                hidden_others_comments_especific_words.append(word)
        instance.hidden_others_comments_especific_words.set(hidden_others_comments_especific_words)

        instance.save()
        return instance
