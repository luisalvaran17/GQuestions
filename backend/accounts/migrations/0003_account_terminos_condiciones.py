# Generated by Django 3.2 on 2021-05-14 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_account_organizacion'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='terminos_condiciones',
            field=models.BooleanField(default=False),
        ),
    ]
