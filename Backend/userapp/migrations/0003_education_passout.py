# Generated by Django 4.1.4 on 2022-12-14 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0002_remove_education_passout'),
    ]

    operations = [
        migrations.AddField(
            model_name='education',
            name='passout',
            field=models.IntegerField(default=2021),
        ),
    ]
