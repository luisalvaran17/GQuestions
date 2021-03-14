"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from gquestions_api import views
from accounts import views as views_accounts

router = routers.DefaultRouter()

router.register(r'generaciones', views.GeneracionView, 'generacion')
router.register(r'tipo_preguntas', views.TipoPreguntaView, 'tipo_pregunta')
router.register(r'usuarios', views_accounts.UsuarioView, 'usuario')
router.register(r'calificaciones', views.CalificacionView, 'calificaciones')
router.register(r'calificaciones_usuarios', views.CalificacionUsuarioView, 'calificacion_usuario')
router.register(r'examenes', views.ExamenView, 'examen')
router.register(r'generaciones_preguntas', views.GeneracionTextoPreguntaView, 'generacion_pregunta')
router.register(r'generaciones_textos_preguntas', views.GeneracionTextoPreguntaView, 'generacion_texto_pregunta')
router.register(r'generaciones_textos', views.GeneracionTextoView, 'generacion_texto')
router.register(r'generaciones_usuarios', views.GeneracionUsuarioView, 'generacion_usuario')
router.register(r'usuarios_examenes_generaciones', views.UsuarioExamenGeneracionView, 'usuario_examen_generacion')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('api/', include(router.urls)),
]
