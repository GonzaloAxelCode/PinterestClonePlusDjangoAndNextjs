# Generated by Django 3.1.7 on 2023-03-11 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_useraccount_is_registered_with_google'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='avatar',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='cover_image',
        ),
        migrations.AddField(
            model_name='useraccount',
            name='desactivate_account',
            field=models.BooleanField(default=False),
        ),
    ]
