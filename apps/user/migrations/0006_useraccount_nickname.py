# Generated by Django 3.1.7 on 2023-02-27 02:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_auto_20230226_2055'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='nickname',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
