from .views import *
from knox import views as knox_views
from .views import LoginAPI
from django.urls import include, path
from accounts import views

urlpatterns = [
    path('api/register_info_user/', RegisterUserInfoAPI.as_view(), name='register_info_user'),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]