# Generated by Django 4.2.1 on 2023-05-15 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_remove_onlinecourse_syllabus'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='chpt',
            field=models.IntegerField(default=1),
        ),
    ]
