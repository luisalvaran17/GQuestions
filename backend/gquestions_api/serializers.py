from rest_framework import serializers
from .models import Generacion
from .models import TipoPregunta
from .models import GeneracionUsuario
from .models import GeneracionTexto
from .models import Generacion_GeneracionTexto
from .models import GeneracionPregunta
from .models import Examen
from .models import Calificacion
from .models import CalificacionUsuario
from .models import Account
from .models import UsuarioExamenGeneracion
from .models import GeneracionTextoPregunta
from .models import RespuestaCuerpo

# pylint: disable=maybe-no-member

# ******************************************** #
# ***** Serializers Generacion (config) ****** #
# ******************************************** #
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


# ******************************************** #
# ***** Serializers Generacion de textos ***** #
# ******************************************** #
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


# ******************************************** #
# *** Serializers Preguntas de los textos **** #
# ******************************************** #
class GeneracionPreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneracionPregunta
        fields = ('id_pregunta', 'pregunta_cuerpo', 'respuesta_correcta')

class RespuestaCuerpoSerializer(serializers.ModelSerializer):
    generacion_pregunta = serializers.PrimaryKeyRelatedField(many=False, queryset=GeneracionPregunta.objects.all())
    class Meta:
        model = RespuestaCuerpo
        fields = ('generacion_pregunta', 'resp_unica','opcion_multiple', 'completacion')

class GeneracionTextoPreguntaSerializer(serializers.ModelSerializer):
    generacion_pregunta = serializers.PrimaryKeyRelatedField(many=False, queryset=GeneracionPregunta.objects.all())
    generacion_texto = serializers.PrimaryKeyRelatedField(many=False, queryset=GeneracionTexto.objects.all())
    class Meta:
        model = GeneracionTextoPregunta
        fields = ('generacion_pregunta', 'generacion_texto')


# ******************************************** #
# *********** Serializers Examen ************* #
# ******************************************** #
class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = ('id_examen', 'title_exam', 'contrasena_exam', 'n_intentos', 'fecha_hora_ini','fecha_hora_fin','fecha_hora_visualizacion')

class UsuarioExamenGeneracionSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(many=False, queryset=Account.objects.all())
    examen = serializers.PrimaryKeyRelatedField(many=False, queryset=Examen.objects.all())
    generacion = serializers.PrimaryKeyRelatedField(many=False, queryset=Generacion.objects.all())
    class Meta:
        model = UsuarioExamenGeneracion
        fields = ('account', 'examen', 'generacion')


# ******************************************** #
# ******** Serializers Calificaciones ******** #
# ******************************************** #
class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion
        fields = ('id_calificacion', 'nota', 'retroalim')

class CalificacionUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalificacionUsuario
        fields = ('id_calificacion', 'id_examen') 