# Generated by Django 5.0.6 on 2024-10-29 16:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0081_alumnicredentials'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alumnicredentials',
            name='linkedin_id',
        ),
    ]
