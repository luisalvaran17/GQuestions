from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated

from .serializers import GeneracionSerializer, TipoPreguntaSerializer, GeneracionTextoSerializer, GeneracionPreguntaSerializer, GeneracionCreateSerializer
from .serializers import CalificacionSerializer, CalificacionUsuarioSerializer, RespuestaCuerpoSerializer, GeneracionTextoCreateSerializer, ExamenSerializer
from .serializers import GeneracionPreguntaCreateSerializer, GeneracionSimplificadoSerializer

from .models import GeneracionModel
from .models import TipoPreguntaModel
from .models import GeneracionTextoModel
from .models import GeneracionPreguntaModel
from .models import ExamenModel
from .models import CalificacionModel
from .models import CalificacionUsuarioModel
from .models import Account
from .models import RespuestaCuerpoModel

from rest_framework import generics
from django.http import JsonResponse

# Create your views here.
# pylint: disable=maybe-no-member

# ************************************************ #
# ** Create and list Generacion (configuración) ** #
# ************************************************ # 
@permission_classes([IsAuthenticated])  
class GeneracionListView(generics.ListAPIView):
    queryset = GeneracionModel.objects.all()
    serializer_class = GeneracionSerializer

@permission_classes([IsAuthenticated])
class GeneracionCreateView(generics.CreateAPIView):
    queryset = GeneracionModel.objects.all()
    serializer_class = GeneracionCreateSerializer

@permission_classes([IsAuthenticated])
class GeneracionTipoPreguntaView(generics.CreateAPIView):
    queryset = TipoPreguntaModel.objects.all()
    serializer_class = TipoPreguntaSerializer

# Query count generaciones
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetAllCountsGeneracionesView(request, account):
    dict_count = {}
    generacion = GeneracionModel.objects.filter(account=account)
    generacion_count = generacion.count()
    serializer = GeneracionSerializer(generacion, many=True)
    dict_count ['generaciones_count'] = generacion_count
    dict_count['generaciones'] = serializer.data

    return JsonResponse(dict_count, safe=False, status=status.HTTP_200_OK)

# Query Generaciones usuario
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetGeneracionesUsuarioView(request, account):
    generacion = GeneracionModel.objects.filter(account=account)
    serializer = GeneracionSimplificadoSerializer(generacion, many=True)

    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

# Query Generacion usuario
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetGeneracionUsuarioView(request, id_generacion):
    generacion = GeneracionModel.objects.filter(id=id_generacion)
    serializer = GeneracionSerializer(generacion, many=True)

    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

# ************************************************ #
# ******* Create and list Generacion Texto ******* #
# ************************************************ # 
@permission_classes([IsAuthenticated])
class GeneracionTextoListView(generics.ListAPIView):
    queryset = GeneracionTextoModel.objects.all()
    serializer_class = GeneracionTextoSerializer

@permission_classes([IsAuthenticated])
class GeneracionTextoCreateView(generics.CreateAPIView):
    queryset = GeneracionTextoModel.objects.all()
    serializer_class = GeneracionTextoCreateSerializer

# Query Texto 
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetTextoView(request, id_texto):
    texto = GeneracionTextoModel.objects.filter(id_texto=id_texto)
    serializer = GeneracionTextoSerializer(texto, many=True)

    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


# ************************************************ #
# ***** Create and list Generacion Preguntas ***** #
# ************************************************ #
@permission_classes([IsAuthenticated])
class GeneracionPreguntaListView(generics.ListAPIView):
    queryset = GeneracionPreguntaModel.objects.all()
    serializer_class = GeneracionPreguntaSerializer

@permission_classes([IsAuthenticated])
class GeneracionPreguntaCreateView(generics.CreateAPIView):
    queryset = GeneracionPreguntaModel.objects.all()
    serializer_class = GeneracionPreguntaSerializer

# Register Respuesta cuerpo de Pregunta
@permission_classes([IsAuthenticated])
class RespuestaCuerpoCreateView(generics.CreateAPIView):
    queryset = RespuestaCuerpoModel.objects.all()
    serializer_class = RespuestaCuerpoSerializer

@permission_classes([IsAuthenticated])
class RespuestaCuerpoView(generics.ListAPIView):
    queryset = RespuestaCuerpoModel.objects.all()
    serializer_class = RespuestaCuerpoSerializer

# Query Pregunta 
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetPreguntaView(request, id_pregunta):
    pregunta = GeneracionPreguntaModel.objects.filter(id_pregunta=id_pregunta)
    serializer = GeneracionPreguntaSerializer(pregunta, many=True)

    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


# ************************************************ #
# *********** Create and list Examen ************* #
# ************************************************ # 
@permission_classes([IsAuthenticated])
class ExamenListView(generics.ListAPIView):
    queryset = ExamenModel.objects.all()
    serializer_class = ExamenSerializer

@permission_classes([IsAuthenticated])
class ExamenCreateView(generics.CreateAPIView):
    queryset = ExamenModel.objects.all()
    serializer_class = ExamenSerializer


# ************************************************ #
# ******* Register and list Calificaciones ******* #
# ************************************************ # 
class CalificacionView(viewsets.ModelViewSet):
    serializer_class = CalificacionSerializer
    queryset = CalificacionModel.objects.all()

class CalificacionUsuarioView(viewsets.ModelViewSet):
    serializer_class = CalificacionUsuarioSerializer
    queryset = CalificacionUsuarioModel.objects.all()


# Query GeneracionUsuario
""" @api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_generacion(request, id_generacion):
    generacion = GeneracionModel.objects.filter(id=id_generacion)
    serializer = GeneracionSerializer(generacion, many=True)

    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK) """








 

