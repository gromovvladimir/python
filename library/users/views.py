from django.shortcuts import render
from rest_framework.response import Response

from .models import CustomUser
from .serializers import CustomUserModelSerializer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import permissions


class CustomUserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [permissions.IsAuthenticated]







