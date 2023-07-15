# Generated by Django 4.2.1 on 2023-05-16 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_remove_userdetail_full_address_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetail',
            name='academic_level',
            field=models.CharField(blank=True, choices=[('Secondary', 'sec'), ('Higher Secondary', 'hsec'), ('Bachelor', 'bch'), ('Master', 'mst')], max_length=100, null=True),
        ),
    ]