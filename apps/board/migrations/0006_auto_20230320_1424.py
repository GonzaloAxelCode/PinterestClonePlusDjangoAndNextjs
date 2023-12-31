# Generated by Django 3.1.7 on 2023-03-20 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0005_board_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='board',
            name='collaborators',
        ),
        migrations.RemoveField(
            model_name='boardcollaboratorpermission',
            name='collaborator',
        ),
        migrations.AddField(
            model_name='boardcollaborator',
            name='permissions',
            field=models.ManyToManyField(related_name='board_permissions', to='board.BoardCollaboratorPermission'),
        ),
        migrations.AlterField(
            model_name='board',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
