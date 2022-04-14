from rest_framework.serializers import ModelSerializer
from .models import CustomUser


class CustomUserModelSerializerOld(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = 'id', 'username', 'first_name', 'last_name', 'email', 'age'


class CustomUserModelSerializerNew(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = 'id', 'username', 'first_name', 'last_name', 'email', 'age', 'is_staff', 'is_superuser'
