from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Todo, Project


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = 'name', 'project_users', 'id', 'link'


class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = 'text', 'created', 'updated', 'is_active', 'project', 'todo_user'
