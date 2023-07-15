# Generated by Django 4.2.1 on 2023-05-17 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_remove_buystudymat_study_mat_remove_buystudymat_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='category',
            field=models.CharField(choices=[('prof_dev', 'Professional Development'), ('creative_arts', 'Creative Arts'), ('health_wellness', 'Health and Wellness'), ('language', 'Language Learning'), ('vocational_trade', 'Vocational and Trade Skills'), ('environmental_studies', 'Environmental Studies'), ('social_sciences', 'Social Sciences'), ('law_studies:', 'Law and Legal Studies:')], max_length=100),
        ),
        migrations.AlterField(
            model_name='onlinecourse',
            name='category',
            field=models.CharField(choices=[('prof_dev', 'Professional Development'), ('creative_arts', 'Creative Arts'), ('health_wellness', 'Health and Wellness'), ('language', 'Language Learning'), ('vocational_trade', 'Vocational and Trade Skills'), ('environmental_studies', 'Environmental Studies'), ('social_sciences', 'Social Sciences'), ('law_studies:', 'Law and Legal Studies:')], max_length=100),
        ),
        migrations.AlterField(
            model_name='studymaterial',
            name='category',
            field=models.CharField(choices=[('prof_dev', 'Professional Development'), ('creative_arts', 'Creative Arts'), ('health_wellness', 'Health and Wellness'), ('language', 'Language Learning'), ('vocational_trade', 'Vocational and Trade Skills'), ('environmental_studies', 'Environmental Studies'), ('social_sciences', 'Social Sciences'), ('law_studies:', 'Law and Legal Studies:')], max_length=100),
        ),
    ]
