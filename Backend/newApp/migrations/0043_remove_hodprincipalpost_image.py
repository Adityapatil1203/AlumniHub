# Generated by Django 5.0.6 on 2024-10-04 05:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0042_hodprincipalpost'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hodprincipalpost',
            name='Image',
        ),
    ]