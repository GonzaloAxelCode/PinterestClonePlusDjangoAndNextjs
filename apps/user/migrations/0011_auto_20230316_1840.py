# Generated by Django 3.1.7 on 2023-03-16 23:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0010_commentespecificwords_userpermissionsettings'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userpermissionsettings',
            old_name='user_account',
            new_name='user',
        ),
    ]
