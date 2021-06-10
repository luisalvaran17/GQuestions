from django.contrib import admin
from rest_framework import serializers
from .models import GeneracionModel
from .models import TipoPreguntaModel
from .models import GeneracionTextoModel
from .models import GeneracionPreguntaModel
from .models import ExamenModel
from .models import CalificacionModel
from .models import Account
from .models import RespuestaCuerpoModel
from .models import ExamenConfiguracionModel
from .models import ExamenModel
from .models import RespuestaPreguntaExamenModel

# Register your models here.

# *************************************************** #
# **** model admin de generacion (Configuracion) **** #
# *************************************************** #
class GeneracionAdmin(admin.ModelAdmin):
    list_display = ('id', 'n_examenes', 'longit_texto', 'n_preguntas', 'inicio_oracion', 'fecha_generacion', 'account')

class TipoPreguntaAdmin(admin.ModelAdmin):
    list_display = ('generacion', 'pregunta_abierta', 'opcion_multiple', 'completacion')


# *************************************************** #
# ******* model admin de generacion de textos ******* #
# *************************************************** #
class GeneracionTextoAdmin(admin.ModelAdmin):
    list_display = ('id_texto', 'cuerpo_texto', 'es_editado', 'es_regenerado', 'generacion')


# *************************************************** #
# ******* model admin de generacion Preguntas ******* #
# *************************************************** #
class GeneracionPreguntaAdmin(admin.ModelAdmin):
    list_display = ('id_pregunta', 'pregunta_cuerpo', 'respuesta_correcta', 'generacion_texto')

class RespuestaCuerpoAdmin(admin.ModelAdmin):
    list_display = ('generacion_pregunta', 'resp_unica', 'opcion_multiple', 'completacion')


# *************************************************** #
# ************ model admin de Examen **************** #
# *************************************************** #
class ExamenConfiguracionAdmin(admin.ModelAdmin):
    list_display = ('id_configuracion_examen', 'title_exam', 'contrasena_exam', 'n_intentos', 'fecha_hora_ini','fecha_hora_fin', 'duracion', 'generacion')

class ExamenAdmin(admin.ModelAdmin):
    list_display = ('id_examen', 'assigned_to', 'texto', 'contestado', 'fecha_contestado', 'examen_configuracion')

# *************************************************** #
# ********** model admin de Calificacion ************ #
# *************************************************** #
class CalificacionAdmin(admin.ModelAdmin):
    list_display = ('id_calificacion', 'nota', 'retroalim', 'examen')

class RespuestaPreguntaExamenAdmin(admin.ModelAdmin):
    list_display = ('id', 'examen', 'generacion_pregunta', 'respuesta_usuario', 'calificacion_pregunta')

# Register your models here.
admin.site.register(GeneracionModel, GeneracionAdmin)
admin.site.register(TipoPreguntaModel, TipoPreguntaAdmin)
admin.site.register(ExamenConfiguracionModel, ExamenConfiguracionAdmin)
admin.site.register(ExamenModel, ExamenAdmin)
admin.site.register(GeneracionPreguntaModel, GeneracionPreguntaAdmin)
admin.site.register(GeneracionTextoModel, GeneracionTextoAdmin)
admin.site.register(CalificacionModel, CalificacionAdmin)
admin.site.register(RespuestaCuerpoModel, RespuestaCuerpoAdmin)
admin.site.register(RespuestaPreguntaExamenModel, RespuestaPreguntaExamenAdmin)