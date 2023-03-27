# Generated by Django 4.1.4 on 2023-01-15 22:32

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('owner', '0015_alter_purchaseplan_expiry_date'),
        ('staff', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobpost',
            name='is_approved',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='job_company',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='owner.company'),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='job_descri',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='job_expired',
            field=models.DateField(default=datetime.date(2023, 1, 31)),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='job_qualif',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='job_requir',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='job_respon',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='job_staff',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
