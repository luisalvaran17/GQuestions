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
from django.contrib.auth import views as auth_views 

router = routers.DefaultRouter()
""" 
router.register(r'generaciones', views.GeneracionView, 'generacion')
router.register(r'tipo_preguntas', views.TipoPreguntaView, 'tipo_pregunta')
#router.register(r'usuarios', views_accounts.UsuarioView, 'usuario')
router.register(r'calificaciones', views.CalificacionView, 'calificaciones')
router.register(r'calificaciones_usuarios', views.CalificacionUsuarioView, 'calificacion_usuario')
router.register(r'examenes', views.ExamenView, 'examen')
router.register(r'generaciones_preguntas', views.GeneracionTextoPreguntaView, 'generacion_pregunta')
router.register(r'generaciones_textos_preguntas', views.GeneracionTextoPreguntaView, 'generacion_texto_pregunta')
router.register(r'generaciones_textos', views.GeneracionTextoView, 'generacion_texto')
router.register(r'generaciones_usuarios', views.GeneracionUsuarioView, 'generacion_usuario')
router.register(r'usuarios_examenes_generaciones', views.UsuarioExamenGeneracionView, 'usuario_examen_generacion')
 """
from django.urls import path, include
from django.views.generic import TemplateView
from django.contrib.auth.views import LogoutView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('api/', include(router.urls)),
    path('', include('gquestions_api.urls')),
    path('accounts/', include('allauth.urls')),
    path('logout', LogoutView.as_view()),

    
    # Reset password urls
    # path('password_reset/',auth_views.PasswordResetView.as_view(),name='password_reset'),

    # path('password_reset/done/',auth_views.PasswordResetDoneView.as_view(),name='password_reset_done'),

    # path('reset/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(),name='password_reset_confirm'),

    # path('reset/done/',auth_views.PasswordResetCompleteView.as_view(),name='password_reset_complete'), 

]
