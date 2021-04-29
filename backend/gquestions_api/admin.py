from django.contrib import admin
from .models import *

# Register your models here.


## model admin de generacion (Configuracion)
class GeneracionAdmin(admin.ModelAdmin):
    list_display = ('id', 'n_examenes', 'longit_texto', 'n_preguntas', 'inicio_oracion')

class TipoPreguntaAdmin(admin.ModelAdmin):
    list_display = ('generacion', 'pregunta_abierta', 'opcion_multiple', 'completacion')


class GeneracionUsuarioAdmin(admin.ModelAdmin):
    list_display = ('generacion', 'account')




## model admin de generacion Textos
class GeneracionTextoAdmin(admin.ModelAdmin):
    list_display = ('id_texto', 'cuerpo_texto', 'es_editado', 'es_regenerado')


class Generacion_GeneracionTextoAdmin(admin.ModelAdmin):
    list_display = ('generacion_texto', 'generacion')




## Model admin de generacion Preguntas
class GeneracionPreguntaAdmin(admin.ModelAdmin):
    list_display = ('id_pregunta', 'pregunta_cuerpo', 'respuesta_correcta')

class RespuestaCuerpoAdmin(admin.ModelAdmin):
    list_display = ('generacion_pregunta', 'resp_unica', 'opcion_multiple', 'completacion')

class GeneracionTextoPreguntaAdmin(admin.ModelAdmin):
    list_display = ('generacion_pregunta', 'generacion_texto')




class ExamenAdmin(admin.ModelAdmin):
    list_display = ('id_examen', 'title_exam', 'contrasena_exam', 'n_intentos', 'fecha_hora_ini','fecha_hora_fin','fecha_hora_visualizacion')




class CalificacionAdmin(admin.ModelAdmin):
    list_display = ('id_calificacion', 'nota', 'retroalim')


class UsuarioExamenGeneracionAdmin(admin.ModelAdmin):
    list_display = ('email', 'id_exam', 'cod_generacion')



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
