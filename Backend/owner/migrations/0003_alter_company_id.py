# Generated by Django 4.1.4 on 2022-12-23 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('owner', '0002_alter_company_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='id',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]