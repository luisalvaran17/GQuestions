from .views import GeneracionTextoCreateView, GeneracionPreguntaCreateView, RespuestaCuerpoCreateView, ExamenConfiguracionCreateView
from .views import GetTextoView, GetPreguntaView, GeneracionListView, GeneracionCreateView, GeneracionTipoPreguntaView, GeneracionTextoListView
from .views import GeneracionPreguntaListView, ExamenConfiguracionListView, GetGeneracionesUsuarioView, GetGeneracionUsuarioView
from .views import GetAllCountsGeneracionesView, ExamenesListView, ExamenCreateView, GetExamenAssignedView, UpdateExamenView
from .views import GetExamenView, RespuestaPreguntaExamenCreateView, CalificacionCreateView

from django.urls import include, path

urlpatterns = [ # todo: acomodar las rutas (ej. create or list or delete etc)

    # Generaciones
    path('api/list/generaciones', GeneracionListView.as_view()),
    path('api/generacion/create/generacion', GeneracionCreateView.as_view()),
    path('api/generacion/create/tipo-pregunta', GeneracionTipoPreguntaView.as_view()),
    path('api/generacion/get/generaciones/<slug:account>', GetGeneracionesUsuarioView),
    path('api/generacion/get/<slug:id_generacion>', GetGeneracionUsuarioView),
    path('api/generacion/get/count/generaciones/<slug:account>', GetAllCountsGeneracionesView),

    # Generacion textos
    path('api/generacion/list/textos', GeneracionTextoListView.as_view()),
    path('api/generacion/create/texto', GeneracionTextoCreateView.as_view()),
    path('api/generacion/get/texto/<slug:id_texto>', GetTextoView),

    # Generacion Preguntas
    path('api/generacion/list/preguntas', GeneracionPreguntaListView.as_view()),
    path('api/generacion/create/pregunta', GeneracionPreguntaCreateView.as_view()),
    path('api/generacion/create/respuesta-cuerpo', RespuestaCuerpoCreateView.as_view()),
    path('api/generacion/get/pregunta/<slug:id_pregunta>', GetPreguntaView),

    # Generacion Examenes
    path('api/generacion/list/configuracion-examenes', ExamenConfiguracionListView.as_view()),
    path('api/generacion/create/configuracion-examen', ExamenConfiguracionCreateView.as_view()),

    path('api/generacion/list/examenes', ExamenesListView.as_view()),
    path('api/generacion/create/examen', ExamenCreateView.as_view()),
    path('api/generacion/get/examen/<slug:id_examen>', GetExamenView),
    path('api/generacion/get/examen/assigned/<slug:id_examen>', GetExamenAssignedView),

    path('api/generacion/update/examen/<slug:id_examen>', UpdateExamenView),

    # Calificaciones
    path('api/calificacion/create', CalificacionCreateView.as_view()),
    path('api/calificacion/respuesta_usuario/create',  RespuestaPreguntaExamenCreateView.as_view())

    ## Queries con llaves
    #path('api/generacion/get/generacion-usuario/<int:account>', get_generaciones_usuario),
    #path('api/generacion/get/<slug:id_generacion>', get_generacion),
    #path('api/generacion/get/generacion-texto/<slug:id_generacion>', get_generacion_generacion_textos),

    #path('api/generacion/get/texto-pregunta/<slug:id_texto>', get_preguntas_textos),
    
    #path('api/generacion/list/generacion-texto/', GeneracionTextoListView.as_view()),

    # Urls for questions
    #path('api/generacion/list/generacion-preguntas', GeneracionPreguntaListView.as_view()),
    #path('api/generacion/create/generacion-pregunta-intermedia', GeneracionTextoPreguntaCreateView.as_view()),

    # Urls for Examen
    #path('api/generacion/list/generacion-examen', ExamenListView.as_view()),
    #path('api/generacion/generacion-examen-intermedia', UsuarioExamenGeneracionCreateView.as_view()),

    # urls pruebas
]
