# Generated by Django 4.1.4 on 2023-01-15 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0002_jobpost_is_approved_alter_jobpost_job_company_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobpost',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
    ]
