# Generated by Django 4.1.11 on 2023-09-22 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ExpressFoodApp', '0005_delete_commande'),
    ]

    operations = [
        migrations.AlterField(
            model_name='livreur',
            name='availability',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='plats',
            name='availability',
            field=models.BooleanField(default=True),
        ),
    ]
