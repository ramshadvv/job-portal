# Generated by Django 4.1.4 on 2023-02-19 10:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0006_jobpost_is_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobpost',
            name='job_expired',
            field=models.DateField(default=datetime.date(2023, 3, 6)),
        ),
    ]
