# Generated by Django 5.0.6 on 2024-10-03 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0033_alter_user_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='full_name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]