from django.db import models
from django.conf import settings
from accounts.models import Account

# Create your models here.
INICIO_ORACION = (('Aleatorio', 'Aleatorio'), 
            ('Personalizado', 'Personalizado'),
            ('Completo', 'Completo'),
            )

# Tablas Generacion (Configuración)
class Generacion(models.Model):
    id  = models.CharField(primary_key=True, null=False, max_length=255)
    n_examenes = models.SmallIntegerField(null=False)
    longit_texto    = models.IntegerField(default=200)
    n_preguntas     = models.SmallIntegerField(null=False)
    inicio_oracion  = models.CharField(choices=INICIO_ORACION, max_length=30, null=False)
    def _str_(self):
        return self.id

class TipoPregunta(models.Model):
    generacion = models.OneToOneField(Generacion, on_delete=models.CASCADE, primary_key=True)
    pregunta_abierta = models.BooleanField(null=False, default=True)
    opcion_multiple = models.BooleanField(null=False, default=True)
    completacion = models.BooleanField(null=False, default=False)
    def _str_(self):
        return self.generacion

class GeneracionUsuario(models.Model):
    generacion = models.ForeignKey(Generacion, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    








# Tablas generacion Textos
class GeneracionTexto(models.Model):
    id_texto  = models.CharField(primary_key=True, null=False, max_length=255)
    #id_texto = models.IntegerField(primary_key=False, null=False)
    cuerpo_texto = models.TextField(max_length=2000)
    es_editado = models.BooleanField(default=False)
    es_regenerado = models.BooleanField(default=False)
    def _str_(self):
        return self.id_texto

class Generacion_GeneracionTexto(models.Model):
    generacion_texto = models.ForeignKey(GeneracionTexto, on_delete=models.CASCADE)
    generacion = models.ForeignKey(Generacion, on_delete=models.CASCADE)





# Tablas generacion preguntas 
class GeneracionPregunta(models.Model):
    id_pregunta = models.CharField(primary_key=True, null=False, max_length=255)
    pregunta_cuerpo = models.CharField(max_length=1000)
    #respuesta_cuerpo = models.CharField(max_length=1000) # todo: remove
    respuesta_correcta = models.CharField(max_length=1000)
    def _str_(self):
        return self.id_pregunta

class RespuestaCuerpo(models.Model):
    generacion_pregunta = models.OneToOneField(GeneracionPregunta, on_delete = models.CASCADE, primary_key=True, null=False)
    resp_unica = models.CharField(max_length=1000)
    opcion_multiple = models.CharField(max_length=100)
    completacion = models.CharField(max_length=2000)
    def _str_(self):
        return self.generacion_pregunta


class GeneracionTextoPregunta(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    generacion_pregunta = models.ForeignKey(GeneracionPregunta, on_delete=models.CASCADE)
    generacion_texto = models.ForeignKey(GeneracionTexto, on_delete=models.CASCADE)

    def _str_(self):
            return self.id



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


class UsuarioExamenGeneracion(models.Model):
    email = models.ForeignKey(Account, on_delete=models.CASCADE)
    id_exam =  models.ForeignKey(Examen, on_delete=models.CASCADE)
    cod_generacion =  models.ForeignKey(Generacion, on_delete=models.CASCADE)

class Calificacion(models.Model):
    id_calificacion = models.AutoField(primary_key=True)
    nota = models.DecimalField(decimal_places=3, max_digits=10)
    retroalim = models.CharField(max_length=3000, default='Sin descripción')
    def _str_(self):
        return self.id_calificacion







class CalificacionUsuario(models.Model): #Corregir CalificacionExamen
    id_calificacion = models.ForeignKey(Calificacion, on_delete=models.CASCADE)
    id_examen = models.ForeignKey(Examen, on_delete=models.CASCADE) 