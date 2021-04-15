from rest_framework import serializers
from .models import Account

# User Serializer
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'rol', 'fecha_nac', 'edad', 'is_admin', 'is_active', 'is_staff', 'is_superuser',
                  'hide_email')

class AccountEmailSerializar(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("email")

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'password', 'first_name',
                  'last_name', 'rol', 'fecha_nac', 'edad')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Account.objects.create_user(validated_data['email'],  validated_data['first_name'], validated_data['last_name'],
                                           validated_data['rol'], validated_data['fecha_nac'], validated_data['edad'], validated_data['password'])

        return user

# change password
class ChangePasswordSerializer(serializers.Serializer):
    model = Account
    # Serializer for password change endpoint.
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
