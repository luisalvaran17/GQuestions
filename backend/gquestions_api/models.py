from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.

ROL_USER = (('Estudiante', 'Estudiante'), 
            ('Docente', 'Docente'),
            )

class Examen(models.Model):
    id_examen = models.AutoField(primary_key=True, null=False)
    title_exam = models.CharField(max_length=200, default='Sin título')
    contrasena_exam = models.CharField(max_length=200, null=False)
    n_intentos = models.SmallIntegerField(default=1)
    fecha_hora_ini = models.DateField(null=False)
    fecha_hora_fin = models.DateField(null=False)
    fecha_hora_visualizacion = models.DateField(null=False)
    def _str_(self):
        return self.id_examen

class Generacion(models.Model):
    cod_generacion = models.IntegerField(primary_key=True, null=False)
    n_examenes = models.SmallIntegerField(null=False)
    longit_texto = models.IntegerField(default=200)
    n_preguntas = models.SmallIntegerField(null=False)
    def _str_(self):
        return self.cod_generacion

class GeneracionPregunta(models.Model):
    id_pregunta = models.AutoField(primary_key=True, null=False)
    pregunta_cuerpo = models.CharField(max_length=1000)
    respuesta_cuerpo = models.CharField(max_length=1000)
    respuesta_correcta = models.CharField(max_length=1000)
    def _str_(self):
        return self.id_pregunta

class GeneracionTexto(models.Model):
    id_texto = models.AutoField(primary_key=True, null=False)
    cuerpo_texto = models.CharField(max_length=2000)
    es_editado = models.BooleanField(default=False)
    es_regenerado = models.BooleanField(default=False)
    def _str_(self):
        return self.id_texto

class Calificacion(models.Model):
    id_calificacion = models.AutoField(primary_key=True)
    nota = models.DecimalField(decimal_places=3, max_digits=10)
    retroalim = models.CharField(max_length=3000, default='Sin descripción')
    def _str_(self):
        return self.id_calificacion

class TipoPregunta(models.Model):
    cod_generacion = models.OneToOneField(Generacion, on_delete=models.CASCADE, primary_key=True)
    pregunta_abierta = models.BooleanField(null=False, default=True)
    opcion_multiple = models.BooleanField(null=False, default=True)
    completacion = models.BooleanField(null=False, default=False)
    def _str_(self):
        return self.cod_generacion
        
class UsuarioExamenGeneracion(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    id_exam =  models.ForeignKey(Examen, on_delete=models.CASCADE)
    cod_generacion =  models.ForeignKey(Generacion, on_delete=models.CASCADE)

class GeneracionUsuario(models.Model):
    cod_generacion = models.ForeignKey(Generacion, on_delete=models.CASCADE)
    username = models.ForeignKey(User, on_delete=models.CASCADE)

class RespuestaCuerpo(models.Model):
    id_pregunta = models.OneToOneField(GeneracionPregunta, on_delete = models.CASCADE, primary_key=True, null=False)
    resp_unica = models.CharField(max_length=1000)
    opcion_multiple = models.CharField(max_length=100)
    completacion = models.CharField(max_length=2000)
    def _str_(self):
        return self.id_pregunta

class Generacion_GeneracionTexto(models.Model):
    id_texto = models.ForeignKey(GeneracionTexto, on_delete=models.CASCADE)
    cod_generacion = models.ForeignKey(Generacion, on_delete=models.CASCADE)

class GeneracionTextoPregunta(models.Model):
    id_pregunta = models.ForeignKey(GeneracionPregunta, on_delete=models.CASCADE)
    id_texto = models.ForeignKey(GeneracionTexto, on_delete=models.CASCADE)

class CalificacionUsuario(models.Model): #Corregir CalificacionExamen
    id_calificacion = models.ForeignKey(Calificacion, on_delete=models.CASCADE)
    id_examen = models.ForeignKey(Examen, on_delete=models.CASCADE)