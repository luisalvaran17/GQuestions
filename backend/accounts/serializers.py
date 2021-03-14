from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Usuario

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario 
        fields = ('user', 'rol', 'fecha_nac', 'edad')

    def create(self, validated_data):
        userInfo = Usuario.objects.create(validated_data['user'], validated_data['rol'], validated_data['fecha_nac'], 
        validated_data['edad'])

        return userInfo