from rest_framework import serializers
from .models import GeneracionModel
from .models import TipoPreguntaModel
from .models import GeneracionTextoModel
from .models import GeneracionPreguntaModel
from .models import ExamenConfiguracionModel
from .models import ExamenModel
from .models import CalificacionModel
from .models import CalificacionUsuarioModel
from .models import Account
from .models import RespuestaCuerpoModel
from accounts.serializers import AccountSerializerForNested

# pylint: disable=maybe-no-member

# ******************************************** #
# *** Serializers Preguntas de los textos **** #
# ******************************************** #
class RespuestaCuerpoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaCuerpoModel
        fields = "__all__"

class GeneracionPreguntaSerializer(serializers.ModelSerializer):
    respuestas_cuerpo = RespuestaCuerpoSerializer(read_only=True, many=False)
    class Meta:
        model = GeneracionPreguntaModel
        fields = "__all__"

## CREATE
class GeneracionPreguntaCreateSerializer(serializers.ModelSerializer):
    generacion_texto = serializers.PrimaryKeyRelatedField(many=False, queryset=GeneracionTextoModel.objects.all())
    class Meta:
        model = GeneracionTextoModel
        fields = ('id_pregunta', 'pregunta_cuerpo', 'respuesta_correcta', 'generacion_texto')

# ******************************************** #
# ***** Serializers Generacion de textos ***** #
# ******************************************** #
class GeneracionTextoSerializer(serializers.ModelSerializer):
    preguntas = GeneracionPreguntaSerializer(read_only=True, many=True)
    class Meta:
        model = GeneracionTextoModel
        fields = "__all__"

## CREATE
class GeneracionTextoCreateSerializer(serializers.ModelSerializer):
    generacion = serializers.PrimaryKeyRelatedField(many=False, queryset=GeneracionModel.objects.all())
    class Meta:
        model = GeneracionTextoModel
        fields = ('id_texto', 'cuerpo_texto', 'es_editado', 'es_regenerado', 'generacion')

# ******************************************** #
# *********** Serializers Examen ************* #
# ******************************************** #
class ExamenSerializer(serializers.ModelSerializer):
    texto = serializers.PrimaryKeyRelatedField(many=False, queryset=GeneracionTextoModel.objects.all())
    examen_configuracion = serializers.PrimaryKeyRelatedField(many=False, queryset=ExamenConfiguracionModel.objects.all())
    class Meta:
        model = ExamenModel
        fields = "__all__"

class ExamenUpdateSerializer(serializers.ModelSerializer):
    id_examen = serializers.CharField(required=False)
    texto = serializers.CharField(required=False)
    examen_configuracion = serializers.CharField(required=False)
    class Meta:
        model = ExamenModel
        fields = "__all__"

class ExamenConfiguracionSerializer(serializers.ModelSerializer):
    generacion = serializers.PrimaryKeyRelatedField(many=False, queryset=GeneracionModel.objects.all())
    examenes = ExamenSerializer(read_only=True, many=True)
    class Meta:
        model = ExamenConfiguracionModel
        fields = "__all__"

# ******************************************** #
# ******** Serializers Calificaciones ******** #
# ******************************************** #
class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalificacionModel
        fields = ('id_calificacion', 'nota', 'retroalim')

class CalificacionUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalificacionUsuarioModel
        fields = ('id_calificacion', 'id_examen') 


# ******************************************** #
# ***** Serializers Generacion (config) ****** #
# ******************************************** #
class TipoPreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPreguntaModel
        fields = "__all__"

class GeneracionSerializer(serializers.ModelSerializer):
    account = AccountSerializerForNested(read_only=True, many=False)
    generaciones_texto = GeneracionTextoSerializer(read_only=True, many=True)
    generacion_examenes = ExamenConfiguracionSerializer(read_only=True, many=True)
    tipos_pregunta = TipoPreguntaSerializer(read_only=True, many=False)
    class Meta:
        model = GeneracionModel
        fields = "__all__"

class GeneracionSimplificadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneracionModel
        fields = ('id', 'n_examenes', 'longit_texto', 'n_preguntas', 'inicio_oracion', 'fecha_generacion', 'account')

## CREATE
class GeneracionCreateSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(many=False, queryset=Account.objects.all())
    class Meta:
        model = GeneracionModel
        fields = ('id', 'n_examenes', 'longit_texto', 'n_preguntas', 'inicio_oracion', 'account')