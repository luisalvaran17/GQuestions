from django.contrib import admin
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

# Register your models here.

# *************************************************** #
# **** model admin de generacion (Configuracion) **** #
# *************************************************** #
class GeneracionAdmin(admin.ModelAdmin):
    list_display = ('id', 'n_examenes', 'longit_texto', 'n_preguntas', 'inicio_oracion')

class TipoPreguntaAdmin(admin.ModelAdmin):
    list_display = ('generacion', 'pregunta_abierta', 'opcion_multiple', 'completacion')


class GeneracionUsuarioAdmin(admin.ModelAdmin):
    list_display = ('generacion', 'account')


# *************************************************** #
# ******* model admin de generacion de textos ******* #
# *************************************************** #
class GeneracionTextoAdmin(admin.ModelAdmin):
    list_display = ('id_texto', 'cuerpo_texto', 'es_editado', 'es_regenerado')

class Generacion_GeneracionTextoAdmin(admin.ModelAdmin):
    list_display = ('generacion_texto', 'generacion')



# *************************************************** #
# ******* model admin de generacion Preguntas ******* #
# *************************************************** #
class GeneracionPreguntaAdmin(admin.ModelAdmin):
    list_display = ('id_pregunta', 'pregunta_cuerpo', 'respuesta_correcta')

class RespuestaCuerpoAdmin(admin.ModelAdmin):
    list_display = ('generacion_pregunta', 'resp_unica', 'opcion_multiple', 'completacion')

class GeneracionTextoPreguntaAdmin(admin.ModelAdmin):
    list_display = ('generacion_pregunta', 'generacion_texto')



# *************************************************** #
# ************ model admin de Examen **************** #
# *************************************************** #
class ExamenAdmin(admin.ModelAdmin):
    list_display = ('id_examen', 'title_exam', 'contrasena_exam', 'n_intentos', 'fecha_hora_ini','fecha_hora_fin','fecha_hora_visualizacion')

class UsuarioExamenGeneracionAdmin(admin.ModelAdmin):
    list_display = ('account', 'examen', 'generacion')


# *************************************************** #
# ********** model admin de Calificacion ************ #
# *************************************************** #
class CalificacionAdmin(admin.ModelAdmin):
    list_display = ('id_calificacion', 'nota', 'retroalim')

class CalificacionUsuarioAdmin(admin.ModelAdmin):
    list_display = ('id_calificacion', 'id_examen')


# Register your models here.
admin.site.register(Generacion, GeneracionAdmin)
admin.site.register(TipoPregunta, TipoPreguntaAdmin)
admin.site.register(Examen, ExamenAdmin)
admin.site.register(GeneracionPregunta, GeneracionPreguntaAdmin)
admin.site.register(GeneracionTexto, GeneracionTextoAdmin)
admin.site.register(Calificacion, CalificacionAdmin)
admin.site.register(UsuarioExamenGeneracion, UsuarioExamenGeneracionAdmin)
admin.site.register(GeneracionUsuario, GeneracionUsuarioAdmin)
admin.site.register(RespuestaCuerpo, RespuestaCuerpoAdmin)
admin.site.register(Generacion_GeneracionTexto, Generacion_GeneracionTextoAdmin)
admin.site.register(GeneracionTextoPregunta, GeneracionTextoPreguntaAdmin)
admin.site.register(CalificacionUsuario, CalificacionUsuarioAdmin)
