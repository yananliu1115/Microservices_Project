# Generated by Django 3.1 on 2020-08-20 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datasets', '0001_initial'),
        ('projects', '0014_auto_20200820_0256'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projectmeta',
            name='datasets',
        ),
        migrations.AddField(
            model_name='project',
            name='datasets',
            field=models.ManyToManyField(default=None, to='datasets.Dataset'),
        ),
    ]
