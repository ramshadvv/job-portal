# Generated by Django 4.1.4 on 2023-01-10 06:36

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('adminapp', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('owner', '0009_company_is_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='PurchasePlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transact_id', models.CharField(max_length=100)),
                ('purchased_date', models.DateField(auto_now_add=True)),
                ('expiry_date', models.DateField(default=datetime.date(2024, 1, 10))),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='adminapp.subscriptionplan')),
            ],
        ),
    ]
