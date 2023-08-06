# Generated by Django 3.1.7 on 2023-02-26 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='avatar',
            field=models.ImageField(blank=True, upload_to='photo/avatars/%Y/%m'),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='cover_image',
            field=models.ImageField(blank=True, upload_to='photo/covers/%Y/%m'),
        ),
    ]