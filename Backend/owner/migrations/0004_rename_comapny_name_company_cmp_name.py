# Generated by Django 4.1.4 on 2022-12-23 06:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('owner', '0003_alter_company_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='comapny_name',
            new_name='cmp_name',
        ),
    ]
