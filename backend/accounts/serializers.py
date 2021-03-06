from rest_framework import serializers
from .models import Account

# User Serializer
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'rol', 'fecha_nac', 'edad', 'organizacion', 'terminos_condiciones', 'is_admin', 'is_active', 'is_staff', 'is_superuser',
                  'hide_email')

class AccountSerializerUpdate(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'first_name', 'last_name', 'fecha_nac', 'organizacion', 'terminos_condiciones')

class AccountSerializerForNested(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'rol')

class AccountEmailSerializar(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("email")

class AccountUserSerializar(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("id","rol","first_name", "last_name")

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'password', 'first_name',
                  'last_name', 'rol', 'fecha_nac')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Account.objects.create_user(validated_data['email'],  validated_data['first_name'], validated_data['last_name'],
                                           validated_data['rol'], validated_data['fecha_nac'], validated_data['password'])

        return user

# change password
class ChangePasswordSerializer(serializers.Serializer):
    model = Account
    # Serializer for password change endpoint.
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
