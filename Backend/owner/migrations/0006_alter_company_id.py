# Generated by Django 4.1.4 on 2022-12-26 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('owner', '0005_company_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]