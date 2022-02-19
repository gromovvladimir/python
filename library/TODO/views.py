from rest_framework import viewsets
from rest_framework.generics import DestroyAPIView

from .models import Todo, Project
from .serializers import TodoModelSerializer, ProjectModelSerializer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin,\
    DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from .filters import ProjectFilter
from rest_framework.pagination import LimitOffsetPagination


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin,
                     GenericViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    filterset_fields = ['name']
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin,
                  GenericViewSet, DestroyModelMixin):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    filterset_fields = ['project']
    pagination_class = TodoLimitOffsetPagination

    def perform_destroy(self, instance):
        instance.delete = True
        instance.save()


