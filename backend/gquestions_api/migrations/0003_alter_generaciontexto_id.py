# Generated by Django 3.2 on 2021-04-24 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gquestions_api', '0002_alter_generaciontexto_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generaciontexto',
            name='id',
            field=models.IntegerField(max_length=255, primary_key=True, serialize=False),
        ),
    ]
