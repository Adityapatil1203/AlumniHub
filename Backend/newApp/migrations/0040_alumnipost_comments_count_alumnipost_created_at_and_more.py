# Generated by Django 5.0.6 on 2024-10-04 02:46

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0039_remove_hodprincipalprofile_publications_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='alumnipost',
            name='comments_count',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='alumnipost',
            name='created_at',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='alumnipost',
            name='image_url',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='alumnipost',
            name='is_published',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AddField(
            model_name='alumnipost',
            name='is_visible_to_alumni',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='alumnipost',
            name='is_visible_to_public',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='alumnipost',
            name='is_visible_to_students',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='alumnipost',
            name='shares_count',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='alumnipost',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
