# Generated by Django 4.1.11 on 2023-09-22 12:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ExpressFoodApp', '0007_livreur_location'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Client',
            new_name='Users',
        ),
    ]