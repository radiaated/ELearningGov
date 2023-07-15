# Generated by Django 4.2.1 on 2023-05-15 16:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_remove_buystudymat_study_mat_remove_buystudymat_user_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BuyStudyMat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('study_mat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buystudymat_studymat', to='base.studymaterial')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buystudymat_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BuyCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('online_course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buycourse_course', to='base.onlinecourse')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buycourse_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
