from .views import GeneracionListView
from .views import TiposPreguntaCreateView
from .views import GeneracionUsuarioView
from .views import Generacion_GeneracionTextoCreateView
from .views import GeneracionTextoCreateView
from .views import GeneracionPreguntaListView
from .views import GeneracionPreguntaCreateView
from .views import RespuestaCuerpoCreateView
from .views import GeneracionTextoPreguntaCreateView

from django.urls import include, path

urlpatterns = [
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
]
