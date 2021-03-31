# Generated by Django 3.1.7 on 2021-03-24 03:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Calificacion',
            fields=[
                ('id_calificacion', models.AutoField(primary_key=True, serialize=False)),
                ('nota', models.DecimalField(decimal_places=3, max_digits=10)),
                ('retroalim', models.CharField(default='Sin descripción', max_length=3000)),
            ],
        ),
        migrations.CreateModel(
            name='Examen',
            fields=[
                ('id_examen', models.AutoField(primary_key=True, serialize=False)),
                ('title_exam', models.CharField(default='Sin título', max_length=200)),
                ('contrasena_exam', models.CharField(max_length=200)),
                ('n_intentos', models.SmallIntegerField(default=1)),
                ('fecha_hora_ini', models.DateField()),
                ('fecha_hora_fin', models.DateField()),
                ('fecha_hora_visualizacion', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Generacion',
            fields=[
                ('cod_generacion', models.IntegerField(primary_key=True, serialize=False)),
                ('n_examenes', models.SmallIntegerField()),
                ('longit_texto', models.IntegerField(default=200)),
                ('n_preguntas', models.SmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='GeneracionPregunta',
            fields=[
                ('id_pregunta', models.AutoField(primary_key=True, serialize=False)),
                ('pregunta_cuerpo', models.CharField(max_length=1000)),
                ('respuesta_cuerpo', models.CharField(max_length=1000)),
                ('respuesta_correcta', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='GeneracionTexto',
            fields=[
                ('id_texto', models.AutoField(primary_key=True, serialize=False)),
                ('cuerpo_texto', models.CharField(max_length=2000)),
                ('es_editado', models.BooleanField(default=False)),
                ('es_regenerado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='RespuestaCuerpo',
            fields=[
                ('id_pregunta', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='gquestions_api.generacionpregunta')),
                ('resp_unica', models.CharField(max_length=1000)),
                ('opcion_multiple', models.CharField(max_length=100)),
                ('completacion', models.CharField(max_length=2000)),
            ],
        ),
        migrations.CreateModel(
            name='TipoPregunta',
            fields=[
                ('cod_generacion', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='gquestions_api.generacion')),
                ('pregunta_abierta', models.BooleanField(default=True)),
                ('opcion_multiple', models.BooleanField(default=True)),
                ('completacion', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='UsuarioExamenGeneracion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod_generacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gquestions_api.generacion')),
                ('email', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('id_exam', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gquestions_api.examen')),
            ],
        ),
        migrations.CreateModel(
            name='GeneracionUsuario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod_generacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gquestions_api.generacion')),
                ('email', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GeneracionTextoPregunta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_pregunta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gquestions_api.generacionpregunta')),
                ('id_texto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gquestions_api.generaciontexto')),
            ],
        ),
        migrations.CreateModel(
            name='Generacion_GeneracionTexto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod_generacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gquestions_api.generacion')),
                ('id_texto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gquestions_api.generaciontexto')),
            ],
        ),
        migrations.CreateModel(
            name='CalificacionUsuario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_calificacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gquestions_api.calificacion')),
                ('id_examen', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gquestions_api.examen')),
            ],
        ),
    ]