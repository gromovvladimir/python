from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Todo, Project
from .serializers import TodoModelSerializer, ProjectModelSerializer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TodoModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer


