# Generated by Django 4.1.4 on 2023-02-16 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0005_alter_jobpost_job_expired'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobpost',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
