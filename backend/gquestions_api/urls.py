from .views import *
from django.urls import include, path

urlpatterns = [
    path('api/generacion/configuracion/', GeneracionListView.as_view()),
    path('api/generacion/tipo-pregunta/', TiposPreguntaCreateView.as_view()),
    path('api/generacion/generacion-usuario/', GeneracionUsuarioView.as_view()),
]