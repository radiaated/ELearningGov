# Generated by Django 4.2.1 on 2023-05-17 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_alter_userdetail_academic_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='buycourse',
            name='pidx',
            field=models.CharField(blank=True, max_length=24, null=True),
        ),
        migrations.AddField(
            model_name='buycourse',
            name='total_amount',
            field=models.IntegerField(blank=True, default=1000, null=True),
        ),
        migrations.AddField(
            model_name='buycourse',
            name='transaction_id',
            field=models.CharField(blank=True, max_length=24, null=True),
        ),
        migrations.AddField(
            model_name='buystudymat',
            name='pidx',
            field=models.CharField(blank=True, max_length=24, null=True),
        ),
        migrations.AddField(
            model_name='buystudymat',
            name='total_amount',
            field=models.IntegerField(blank=True, default=1000, null=True),
        ),
        migrations.AddField(
            model_name='buystudymat',
            name='transaction_id',
            field=models.CharField(blank=True, max_length=24, null=True),
        ),
    ]