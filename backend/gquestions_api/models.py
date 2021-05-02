from django.db import models
from django.conf import settings
from accounts.models import Account

# Create your models here.
INICIO_ORACION = (('Aleatorio', 'Aleatorio'),
                  ('Personalizado', 'Personalizado'),
                  ('Completo', 'Completo'),
                  )

# ******************************************** #
# **** Tablas Generacion (Configuración) ***** #
# ******************************************** #
class GeneracionModel(models.Model):
    id = models.CharField(primary_key=True, null=False, max_length=255)
    n_examenes = models.SmallIntegerField(null=False)
    longit_texto = models.IntegerField(default=200)
    n_preguntas = models.SmallIntegerField(null=False)
    inicio_oracion = models.CharField(choices=INICIO_ORACION, max_length=30, null=False)
    fecha_generacion = models.DateField(auto_now_add=True, null=False)
    account = models.ForeignKey(Account, related_name="account", on_delete=models.CASCADE)

    def _str_(self):
        return self.id


# ******************************************** #
# ********* Tablas generacion Textos ********* #
# ******************************************** #
class GeneracionTextoModel(models.Model):
    id_texto = models.CharField(primary_key=True, null=False, max_length=255)
    cuerpo_texto = models.TextField(max_length=2000)
    es_editado = models.BooleanField(default=False)
    es_regenerado = models.BooleanField(default=False)
    generacion = models.ForeignKey(
        GeneracionModel, related_name="generaciones_texto", on_delete=models.CASCADE)

    def _str_(self):
        return self.id_texto


# ******************************************** #
# ******* Tablas generacion Preguntas ******** #
# ******************************************** #
class GeneracionPreguntaModel(models.Model):
    id_pregunta = models.CharField(primary_key=True, null=False, max_length=255)
    pregunta_cuerpo = models.CharField(max_length=1000)
    respuesta_correcta = models.CharField(max_length=1000)
    generacion_texto = models.ForeignKey(GeneracionTextoModel, related_name="preguntas", on_delete=models.CASCADE)

    def _str_(self):
        return self.id_pregunta

class TipoPreguntaModel(models.Model):
    generacion = models.OneToOneField(GeneracionModel, related_name="tipos_pregunta", on_delete=models.CASCADE, primary_key=True)
    pregunta_abierta = models.BooleanField(null=False, default=True)
    opcion_multiple = models.BooleanField(null=False, default=True)
    completacion = models.BooleanField(null=False, default=False)

    def _str_(self):
        return self.generacion

class RespuestaCuerpoModel(models.Model):
    generacion_pregunta = models.OneToOneField(
        GeneracionPreguntaModel, related_name="respuestas_cuerpo", on_delete=models.CASCADE, primary_key=True, null=False)
    resp_unica = models.CharField(max_length=1000)
    opcion_multiple = models.CharField(max_length=100)
    completacion = models.CharField(max_length=2000)

    def _str_(self):
        return self.generacion_pregunta


# ******************************************** #
# ********* Tablas generacion Examen ********* #
# ******************************************** #
class ExamenModel(models.Model):
    id_examen = models.CharField(primary_key=True, null=False, max_length=255)
    title_exam = models.CharField(max_length=200, default='Sin título')
    contrasena_exam = models.CharField(max_length=200, null=False)
    n_intentos = models.SmallIntegerField(default=1)
    fecha_hora_ini = models.DateTimeField(null=False)
    fecha_hora_fin = models.DateTimeField(null=False)
    #account = models.ForeignKey(Account, on_delete=models.CASCADE)
    generacion = models.ForeignKey(
        GeneracionModel, related_name="generacion_examen", on_delete=models.CASCADE)

    def _str_(self):
        return self.id_examen


# ******************************************** #
# *********** Tablas Calificacion ************ #
# ******************************************** #
class CalificacionModel(models.Model):
    id_calificacion = models.AutoField(primary_key=True)
    nota = models.DecimalField(decimal_places=3, max_digits=10)
    retroalim = models.CharField(max_length=3000, default='Sin descripción')

    def _str_(self):
        return self.id_calificacion


class CalificacionUsuarioModel(models.Model):  # Corregir CalificacionExamen
    id_calificacion = models.ForeignKey(CalificacionModel, on_delete=models.CASCADE)
    id_examen = models.ForeignKey(ExamenModel, on_delete=models.CASCADE)
