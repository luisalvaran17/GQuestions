from django.db import models
from django.contrib.auth.models import User

# Create your models here.
ROL_USER = (('Estudiante', 'Estudiante'), 
            ('Docente', 'Docente'),
            )

class Usuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rol = models.CharField(choices=ROL_USER, max_length=20)
    fecha_nac = models.DateField()
    genero = models.CharField(max_length=20, default='')
    edad = models.SmallIntegerField()