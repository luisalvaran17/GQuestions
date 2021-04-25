from rest_framework import serializers
from .models import *

# pylint: disable=maybe-no-member

class GeneracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generacion
        fields = ('id', 'n_examenes', 'longit_texto', 'n_preguntas', 'inicio_oracion')

class TipoPreguntaSerializer(serializers.ModelSerializer):
    generacion = serializers.PrimaryKeyRelatedField(many=False, queryset=Generacion.objects.all())
    class Meta:
        model = TipoPregunta
        fields = ('generacion', 'pregunta_abierta', 'opcion_multiple', 'completacion')


class GeneracionUsuarioSerializer(serializers.ModelSerializer):
    generacion = serializers.PrimaryKeyRelatedField(many=False, queryset=Generacion.objects.all())
    account = serializers.PrimaryKeyRelatedField(many=False, queryset=Account.objects.all())
    class Meta:
        model = GeneracionUsuario
        fields = ('generacion', 'account')






class GeneracionTextoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneracionTexto
        fields = ('id_texto', 'cuerpo_texto', 'es_editado', 'es_regenerado')

class Generacion_GeneracionTextoSerializer(serializers.ModelSerializer):
    generacion = serializers.PrimaryKeyRelatedField(many=False, queryset=Generacion.objects.all())
    generacion_texto = serializers.PrimaryKeyRelatedField(many=False, queryset=GeneracionTexto.objects.all())
    class Meta:
        model = Generacion_GeneracionTexto
        fields = ('generacion_texto', 'generacion')






class GeneracionPreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneracionPregunta
        fields = ('id_pregunta', 'pregunta_cuerpo', 'respuesta_cuerpo', 'respuesta_correcta')


class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = ('id_examen', 'title_exam', 'contrasena_exam', 'n_intentos', 'fecha_hora_ini','fecha_hora_fin','fecha_hora_visualizacion')



class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion
        fields = ('id_calificacion', 'nota', 'retroalim')



class UsuarioExamenGeneracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioExamenGeneracion
        fields = ('email', 'id_exam', 'cod_generacion')





class GeneracionTextoPreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneracionTextoPregunta
        fields = ('id_pregunta', 'id_texto')

class CalificacionUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalificacionUsuario
        fields = ('id_calificacion', 'id_examen') 