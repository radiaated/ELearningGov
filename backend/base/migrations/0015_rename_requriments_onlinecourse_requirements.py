# Generated by Django 4.2.1 on 2023-05-24 12:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_onlinecourse_author_onlinecourse_language_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='onlinecourse',
            old_name='requriments',
            new_name='requirements',
        ),
    ]