# Generated by Django 3.2 on 2021-06-10 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gquestions_api', '0002_rename_generacoin_pregunta_respuestapreguntaexamenmodel_generacion_pregunta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calificacionmodel',
            name='nota',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
