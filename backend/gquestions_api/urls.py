from .views import GeneracionListView
from .views import TiposPreguntaCreateView
from .views import GeneracionUsuarioView
from .views import Generacion_GeneracionTextoCreateView
from .views import GeneracionTextoCreateView
from .views import GeneracionPreguntaListView
from .views import GeneracionPreguntaCreateView
from .views import RespuestaCuerpoCreateView
from .views import GeneracionTextoPreguntaCreateView
from .views import ExamenListView
from .views import ExamenCreateView
from .views import UsuarioExamenGeneracionCreateView

from django.urls import include, path

urlpatterns = [ # todo: acomodar las rutas (ej. create or list or delete etc)
    path('api/generacion/configuracion/', GeneracionListView.as_view()),
    path('api/generacion/tipo-pregunta/', TiposPreguntaCreateView.as_view()),
    path('api/generacion/generacion-usuario/', GeneracionUsuarioView.as_view()),
    path('api/generacion/generacion-texto-intermedia/', Generacion_GeneracionTextoCreateView.as_view()),
    path('api/generacion/generacion-texto/', GeneracionTextoCreateView.as_view()),
    #path('api/generacion/generacion-texto/', GeneracionTextoListView.as_view()),

    # Urls for questions
    path('api/generacion/list/generacion-preguntas', GeneracionPreguntaListView.as_view()),
    path('api/generacion/create/generacion-pregunta', GeneracionPreguntaCreateView.as_view()),
    path('api/generacion/create/generacion-respuesta-cuerpo', RespuestaCuerpoCreateView.as_view()),
    path('api/generacion/create/generacion-pregunta-intermedia', GeneracionTextoPreguntaCreateView.as_view()),

    # Urls for Examen
    path('api/generacion/list/generacion-examen', ExamenListView.as_view()),
    path('api/generacion/create/generacion-examen', ExamenCreateView.as_view()),
    path('api/generacion/generacion-examen-intermedia', UsuarioExamenGeneracionCreateView.as_view()),
]
