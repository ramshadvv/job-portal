# Generated by Django 4.1.4 on 2022-12-23 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comapny_name', models.CharField(blank=True, max_length=255, null=True)),
                ('cmp_place', models.CharField(blank=True, max_length=255, null=True)),
                ('cmp_phone', models.CharField(blank=True, max_length=255, null=True)),
                ('cmp_address', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]