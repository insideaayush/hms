# Generated by Django 2.0.2 on 2018-03-27 14:51

from django.db import migrations
import djrichtextfield.models


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0002_auto_20180327_1428'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=djrichtextfield.models.RichTextField(),
        ),
    ]
