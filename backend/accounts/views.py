from django.shortcuts import render
from rest_framework import generics, permissions, status, viewsets, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, RegisterUsuarioInfoAdicionalSerializer
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import UsuarioInfoAdicional
from django.core.exceptions import ObjectDoesNotExist
from .serializers import ChangePasswordSerializer

# Create your views here.
class UsuarioView(viewsets.ModelViewSet):
    serializer_class= UserSerializer
    queryset = User.objects.all()

# Get usuario
@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_user(request, user):
    user_id = request.user.id
    users = User.objects.filter(id=user_id)
    serializer = UserSerializer(users, many=True)
    print(serializer.data)
    return JsonResponse({'users': serializer.data}, safe=False, status=status.HTTP_200_OK)

# Get usuarios
@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    print(serializer.data)
    return JsonResponse({'users': serializer.data}, safe=False, status=status.HTTP_200_OK)

# Update usuarios
@api_view(["PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def update_user(request, user):
    user = request.user.username
    payload = json.loads(request.body)
    try:
        user_item = User.objects.filter(username=user)
        # returns 1 or 0
        user_item.update(**payload)
        user = User.objects.get(username=user)
        ## user_info_personal = user.usuario.edad Así se obtiene una tupla de una relación
        serializer = UserSerializer(user)
        return JsonResponse({'user': serializer.data}, safe=False, status=status.HTTP_200_OK)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Register usuarios
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })

# Register 'otra información' usuario
class RegisterUsuarioInfoAdicionalAPI(generics.GenericAPIView):
    serializer_class = RegisterUsuarioInfoAdicionalSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response ({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,})

# Login usuarios
class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)

# Change password view
class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)