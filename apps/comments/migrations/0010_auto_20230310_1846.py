# Generated by Django 3.1.7 on 2023-03-10 23:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0009_auto_20230309_2200'),
    ]

    operations = [
        migrations.RenameField(
            model_name='commentlike',
            old_name='is_helpful',
            new_name='is_like',
        ),
        migrations.RemoveField(
            model_name='commentlike',
            name='is_love',
        ),
    ]