from rest_framework import viewsets
from rest_framework.generics import DestroyAPIView

from .models import Todo, Project
from .serializers import TodoModelSerializer, ProjectModelSerializer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin,\
    DestroyModelMixin
from rest_framework import permissions

from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .filters import ProjectFilter
from rest_framework.pagination import LimitOffsetPagination


#class ProjectLimitOffsetPagination(LimitOffsetPagination):
 #   default_limit = 10


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    #filterset_fields = ['name']
    #filterset_class = ProjectFilter
    #pagination_class = ProjectLimitOffsetPagination


#class TodoLimitOffsetPagination(LimitOffsetPagination):
 #   default_limit = 20


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    #permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = TodoModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    #filterset_fields = ['project']
    #pagination_class = TodoLimitOffsetPagination

   # def perform_destroy(self, instance):
    #    instance.delete_flag = True
    #    instance.save()


