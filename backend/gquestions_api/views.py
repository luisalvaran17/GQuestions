from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated

from .serializers import GeneracionSerializer
from .serializers import TipoPreguntaSerializer
from .serializers import GeneracionUsuarioSerializer
from .serializers import GeneracionTextoSerializer
from .serializers import Generacion_GeneracionTextoSerializer
from .serializers import ExamenSerializer
from .serializers import GeneracionPreguntaSerializer
from .serializers import CalificacionSerializer
from .serializers import UsuarioExamenGeneracionSerializer
from .serializers import GeneracionTextoPreguntaSerializer
from .serializers import CalificacionUsuarioSerializer
from .serializers import RespuestaCuerpoSerializer

from .models import Generacion
from .models import TipoPregunta
from .models import GeneracionUsuario
from .models import GeneracionTexto
from .models import Generacion_GeneracionTexto
from .models import Examen
from .models import GeneracionPregunta
from .models import Calificacion
from .models import UsuarioExamenGeneracion
from .models import GeneracionTextoPregunta
from .models import CalificacionUsuario
from .models import RespuestaCuerpo

from rest_framework import generics

# Create your views here.
# pylint: disable=maybe-no-member

# ************************************************ #
# * Register and list Generacion (configuración) * #
# ************************************************ # 
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

# ************************************************ #
# ***** Register and list Generacion Texto ******* #
# ************************************************ # 
@permission_classes([IsAuthenticated])
class GeneracionTextoListView(generics.ListCreateAPIView):
    queryset = GeneracionTexto.objects.all()
    serializer_class = GeneracionTextoSerializer

# Register Generacion de textos
@permission_classes([IsAuthenticated])
class GeneracionTextoCreateView(generics.CreateAPIView):
    queryset = GeneracionTexto.objects.all()
    serializer_class = GeneracionTextoSerializer

# Register Generacion de textos (Tabla intermedia)
@permission_classes([IsAuthenticated])
class Generacion_GeneracionTextoCreateView(generics.CreateAPIView):
    queryset = Generacion_GeneracionTexto.objects.all()
    serializer_class = Generacion_GeneracionTextoSerializer


# ************************************************ #
# **** Register and list Generacion Preguntas **** #
# ************************************************ # 
# List All Generacion de pregunta 
@permission_classes([IsAuthenticated])
class GeneracionPreguntaListView(generics.ListCreateAPIView):
    queryset = GeneracionPregunta.objects.all()
    serializer_class = GeneracionPreguntaSerializer

# Register generacion de Pregunta del texto
@permission_classes([IsAuthenticated])
class GeneracionPreguntaCreateView(generics.CreateAPIView):
    queryset = GeneracionPregunta.objects.all()
    serializer_class = GeneracionPreguntaSerializer

# Register Respuesta cuerpo de Pregunta
@permission_classes([IsAuthenticated])
class RespuestaCuerpoCreateView(generics.CreateAPIView):
    queryset = RespuestaCuerpo.objects.all()
    serializer_class = RespuestaCuerpoSerializer

# Register Tabla intermedia Pregunta y Texto (Relación)
@permission_classes([IsAuthenticated])
class GeneracionTextoPreguntaCreateView(generics.CreateAPIView):
    queryset = GeneracionTextoPregunta.objects.all()
    serializer_class = GeneracionTextoPreguntaSerializer


# ************************************************ #
# *********** Register and list Examen *********** #
# ************************************************ # 
class ExamenView(viewsets.ModelViewSet):
    serializer_class = ExamenSerializer
    queryset = Examen.objects.all()

class UsuarioExamenGeneracionView(viewsets.ModelViewSet):
    serializer_class = UsuarioExamenGeneracionSerializer
    queryset = UsuarioExamenGeneracion.objects.all()


# ************************************************ #
# ******* Register and list Calificaciones ******* #
# ************************************************ # 

class CalificacionView(viewsets.ModelViewSet):
    serializer_class = CalificacionSerializer
    queryset = Calificacion.objects.all()

class CalificacionUsuarioView(viewsets.ModelViewSet):
    serializer_class = CalificacionUsuarioSerializer
    queryset = CalificacionUsuario.objects.all()
 