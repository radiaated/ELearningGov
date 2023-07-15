# Generated by Django 4.2.1 on 2023-05-16 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_alter_userdetail_academic_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetail',
            name='academic_level',
            field=models.CharField(blank=True, choices=[('sec', 'Secondary'), ('hsec', 'Higher Secondary'), ('bch', 'Bachelor'), ('mst', 'Master')], max_length=100, null=True),
        ),
    ]
