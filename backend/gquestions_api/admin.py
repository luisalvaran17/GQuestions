from django.contrib import admin
from .models import *

# Register your models here.


class GeneracionAdmin(admin.ModelAdmin):
    list_display = ('id', 'n_examenes', 'longit_texto', 'n_preguntas', 'inicio_oracion')

class TipoPreguntaAdmin(admin.ModelAdmin):
    list_display = ('generacion', 'pregunta_abierta', 'opcion_multiple', 'completacion')


class GeneracionUsuarioAdmin(admin.ModelAdmin):
    list_display = ('generacion', 'account')














class GeneracionPreguntaAdmin(admin.ModelAdmin):
    list_display = ('id_pregunta', 'pregunta_cuerpo', 'respuesta_cuerpo', 'respuesta_correcta')

class ExamenAdmin(admin.ModelAdmin):
    list_display = ('id_examen', 'title_exam', 'contrasena_exam', 'n_intentos', 'fecha_hora_ini','fecha_hora_fin','fecha_hora_visualizacion')


class GeneracionTextoAdmin(admin.ModelAdmin):
    list_display = ('id_texto', 'cuerpo_texto', 'es_editado', 'es_regenerado')

class CalificacionAdmin(admin.ModelAdmin):
    list_display = ('id_calificacion', 'nota', 'retroalim')


class UsuarioExamenGeneracionAdmin(admin.ModelAdmin):
    list_display = ('email', 'id_exam', 'cod_generacion')

class Generacion_GeneracionTextoAdmin(admin.ModelAdmin):
    list_display = ('id_texto', 'cod_generacion')

class GeneracionTextoPreguntaAdmin(admin.ModelAdmin):
    list_display = ('id_pregunta', 'id_texto')

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
admin.site.register(Generacion_GeneracionTexto, Generacion_GeneracionTextoAdmin)
admin.site.register(GeneracionTextoPregunta, GeneracionTextoPreguntaAdmin)
admin.site.register(CalificacionUsuario, CalificacionUsuarioAdmin)
