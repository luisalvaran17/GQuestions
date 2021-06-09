from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated

from .serializers import GeneracionSerializer, TipoPreguntaSerializer, GeneracionTextoSerializer, GeneracionPreguntaSerializer, GeneracionCreateSerializer
from .serializers import CalificacionSerializer, RespuestaCuerpoSerializer, GeneracionTextoCreateSerializer, ExamenConfiguracionSerializer
from .serializers import GeneracionPreguntaCreateSerializer, GeneracionSimplificadoSerializer, ExamenSerializer, ExamenUpdateSerializer

from .models import GeneracionModel
from .models import TipoPreguntaModel
from .models import GeneracionTextoModel
from .models import GeneracionPreguntaModel
from .models import ExamenConfiguracionModel
from .models import CalificacionModel
from .models import Account
from .models import RespuestaCuerpoModel
from .models import ExamenModel

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
    generacion = GeneracionModel.objects.filter(account=account).order_by('fecha_generacion').reverse()
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
class ExamenConfiguracionListView(generics.ListAPIView):
    queryset = ExamenConfiguracionModel.objects.all()
    serializer_class = ExamenConfiguracionSerializer

# Create configuracion examen
@permission_classes([IsAuthenticated])
class ExamenConfiguracionCreateView(generics.CreateAPIView):
    queryset = ExamenConfiguracionModel.objects.all()
    serializer_class = ExamenConfiguracionSerializer

# List examenes (All)
@permission_classes([IsAuthenticated])
class ExamenesListView(generics.ListAPIView):
    queryset = ExamenModel.objects.all()
    serializer_class = ExamenSerializer

# Create Examen
@permission_classes([IsAuthenticated])
class ExamenCreateView(generics.CreateAPIView):
    queryset = ExamenModel.objects.all()
    serializer_class = ExamenSerializer

# Get examen value assigned
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetExamenAssignedView(request, id_examen):
    examen = ExamenModel.objects.filter(id_examen=id_examen)
    serializer = ExamenSerializer(examen, many=True)
    assigned_to = serializer.data[0].get('assigned_to')
    response = {}

    if (assigned_to == None):
        response['assigned'] = False
    else:
        response['assigned'] = True

    return JsonResponse(response, safe=False, status=status.HTTP_200_OK)

# Get examen
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetExamenView(request, id_examen):
    examen = ExamenModel.objects.filter(id_examen=id_examen)
    serializer = ExamenSerializer(examen, many=True)

    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

# Update Examen
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def UpdateExamenView(request, id_examen):

    examen = ExamenModel.objects.get(id_examen=id_examen)
    serializer = ExamenUpdateSerializer(examen, data=request.data)

    if serializer.is_valid():   
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ************************************************ #
# ******* Register and list Calificaciones ******* #
# ************************************************ # 
class CalificacionView(viewsets.ModelViewSet):
    serializer_class = CalificacionSerializer
    queryset = CalificacionModel.objects.all()


# Query GeneracionUsuario
""" @api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_generacion(request, id_generacion):
    generacion = GeneracionModel.objects.filter(id=id_generacion)
    serializer = GeneracionSerializer(generacion, many=True)

    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK) """








 

