# Generated by Django 4.2.1 on 2023-05-24 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_rename_requriments_onlinecourse_requirements'),
    ]

    operations = [
        migrations.AddField(
            model_name='onlinecourse',
            name='avg_rating',
            field=models.IntegerField(blank=True, default=1, null=True),
        ),
    ]
