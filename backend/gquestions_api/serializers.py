from rest_framework import serializers
from .models import *

class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = ('id_examen', 'title_exam', 'contrasena_exam', 'n_intentos', 'fecha_hora_ini','fecha_hora_fin','fecha_hora_visualizacion')

class GeneracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generacion
        fields = ('cod_generacion', 'n_examenes', 'longit_texto', 'n_preguntas')

class GeneracionPreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneracionPregunta
        fields = ('id_pregunta', 'pregunta_cuerpo', 'respuesta_cuerpo', 'respuesta_correcta')

class GeneracionTextoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneracionTexto
        fields = ('id_texto', 'cuerpo_texto', 'es_editado', 'es_regenerado')

class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion
        fields = ('id_calificacion', 'nota', 'retroalim')

class TipoPreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPregunta
        fields = ('cod_generacion', 'pregunta_abierta', 'opcion_multiple', 'completacion')

class UsuarioExamenGeneracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioExamenGeneracion
        fields = ('email', 'id_exam', 'cod_generacion')

class GeneracionUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneracionUsuario
        fields = ('cod_generacion', 'email')

class Generacion_GeneracionTextoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generacion_GeneracionTexto
        fields = ('id_texto', 'cod_generacion')

class GeneracionTextoPreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneracionTextoPregunta
        fields = ('id_pregunta', 'id_texto')

class CalificacionUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalificacionUsuario
        fields = ('id_calificacion', 'id_examen') """