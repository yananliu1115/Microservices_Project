# Generated by Django 3.1.1 on 2020-09-10 16:07

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0020_auto_20200905_2204'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='projectmeta',
            unique_together={('name', 'owner')},
        ),
    ]
