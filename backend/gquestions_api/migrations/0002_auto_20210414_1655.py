# Generated by Django 3.1.7 on 2021-04-14 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gquestions_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generacion',
            name='id',
            field=models.CharField(max_length=255, primary_key=True, serialize=False),
        ),
    ]
