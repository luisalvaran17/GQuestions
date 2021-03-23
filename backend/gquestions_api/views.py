""" from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

# Create your views here.
class ExamenView(viewsets.ModelViewSet):
    serializer_class = ExamenSerializer
    queryset = Examen.objects.all()

class GeneracionView(viewsets.ModelViewSet):
    serializer_class = GeneracionSerializer
    queryset = Generacion.objects.all()

class TipoPreguntaView(viewsets.ModelViewSet):
    serializer_class = TipoPreguntaSerializer
    queryset = TipoPregunta.objects.all()

class GeneracionPreguntaiew(viewsets.ModelViewSet):
    serializer_class = GeneracionPreguntaSerializer
    queryset = GeneracionPregunta.objects.all()


class GeneracionTextoView(viewsets.ModelViewSet):
    serializer_class = GeneracionTextoSerializer
    queryset = GeneracionTexto.objects.all()

class CalificacionView(viewsets.ModelViewSet):
    serializer_class = CalificacionSerializer
    queryset = Calificacion.objects.all()

class TipoPreguntaView(viewsets.ModelViewSet):
    serializer_class = TipoPreguntaSerializer
    queryset = TipoPregunta.objects.all()

class UsuarioExamenGeneracionView(viewsets.ModelViewSet):
    serializer_class = UsuarioExamenGeneracionSerializer
    queryset = UsuarioExamenGeneracion.objects.all()

class GeneracionUsuarioView(viewsets.ModelViewSet):
    serializer_class = GeneracionUsuarioSerializer
    queryset = GeneracionUsuario.objects.all()

class Generacion_GeneracionTextoView(viewsets.ModelViewSet):
    serializer_class = Generacion_GeneracionTextoSerializer
    queryset = Generacion_GeneracionTexto.objects.all()

class GeneracionTextoPreguntaView(viewsets.ModelViewSet):
    serializer_class = GeneracionTextoPreguntaSerializer
    queryset = GeneracionTextoPregunta.objects.all()

class CalificacionUsuarioView(viewsets.ModelViewSet):
    serializer_class = CalificacionUsuarioSerializer
    queryset = CalificacionUsuario.objects.all()
 """