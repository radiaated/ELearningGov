# Generated by Django 4.2.1 on 2023-05-15 12:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_delete_userdetail'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='onlinecourse',
            name='syllabus',
        ),
    ]
