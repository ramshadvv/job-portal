# Generated by Django 4.1.4 on 2023-02-16 11:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('owner', '0015_alter_purchaseplan_expiry_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchaseplan',
            name='expiry_date',
            field=models.DateField(default=datetime.date(2023, 3, 18)),
        ),
    ]
