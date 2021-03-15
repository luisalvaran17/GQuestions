from .views import *
from knox import views as knox_views
from .views import LoginAPI
from django.urls import include, path
from accounts import views

urlpatterns = [
    path('api/usuarios/', get_users, name='usuarios'),
    path('api/update_info_user/<int:user>', update_user_info, name='update_user'),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]


##
#curl -X PUT -H "Authorization: Token 2b7b7b2a7b1b91a679ddd6b4c01a0255cb1fcba1f41b561d2eeeed84d887e51b" -d '{"first_name":"Eduardo"}' localhost:8000/api/update_info_user/4

##