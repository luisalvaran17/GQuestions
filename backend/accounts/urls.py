from .views import *
from knox import views as knox_views
from .views import Login, ChangePasswordView
from django.urls import include, path
from accounts import views

urlpatterns = [
    path('api/usuarios/', get_users, name='usuarios'),
    path('api/usuarios/<int:user>', get_user, name='usuarioss'),
    path('api/update-info-user/<int:user>', update_user, name='update_user'),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', Login.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/change-password/<int:user>', ChangePasswordView.as_view(), name='change-password'),
    path('api/exist-user/<email>', exist_user, name='exist-user'),

    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
]

## http://127.0.0.1:8000/accounts/google/login/ inicio con google url

##+
# Actualizar campos de user
# curl -X PUT -H "Authorization: Token 2b7b7b2a7b1b91a679ddd6b4c01a0255cb1fcba1f41b561d2eeeed84d887e51b" -d '{"first_name":"Eduardo"}' localhost:8000/api/update_info_user/4

# Cambiar contraseña user
# curl -X PUT -H "Authorization: Token 3f8299ac25a4d7c775d94610d44883484347b0b1bb54bb3996139bef4494942c" -d '{"old_password": "1234","new_password": "New@123"}' localhost:8000/api/update_info_user/4
 