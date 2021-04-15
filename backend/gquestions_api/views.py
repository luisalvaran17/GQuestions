from django.shortcuts import render
from rest_framework import viewsets,status

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated

from .serializers import *
from .models import *
from rest_framework import generics

# Create your views here.

# Register and list Generacion (configuración)
@permission_classes([IsAuthenticated])
class GeneracionListView(generics.ListCreateAPIView):
    queryset = Generacion.objects.all()
    serializer_class = GeneracionSerializer

# Register tipo pregunta (configuración)
@permission_classes([IsAuthenticated])
class TiposPreguntaCreateView(generics.CreateAPIView):
    queryset = TipoPregunta.objects.all()
    serializer_class = TipoPreguntaSerializer

@permission_classes([IsAuthenticated])
class GeneracionUsuarioView(generics.CreateAPIView):
    queryset = GeneracionUsuario.objects.all()
    serializer_class = GeneracionUsuarioSerializer

# Register Generacion_Usuario
""" @api_view(['POST'])
def register_generacion_usuario(request, *args, **kwargs):
    serializer_class = GeneracionUsuarioSerializer
    queryset = Account.objects.all()
    print(queryset)
    serializer = GeneracionUsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
 """






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
""" 
class GeneracionUsuarioView(viewsets.ModelViewSet):
    serializer_class = GeneracionUsuarioSerializer
    queryset = GeneracionUsuario.objects.all() """

class Generacion_GeneracionTextoView(viewsets.ModelViewSet):
    serializer_class = Generacion_GeneracionTextoSerializer
    queryset = Generacion_GeneracionTexto.objects.all()

class GeneracionTextoPreguntaView(viewsets.ModelViewSet):
    serializer_class = GeneracionTextoPreguntaSerializer
    queryset = GeneracionTextoPregunta.objects.all()

class CalificacionUsuarioView(viewsets.ModelViewSet):
    serializer_class = CalificacionUsuarioSerializer
    queryset = CalificacionUsuario.objects.all()
 