from rest_framework.serializers import ModelSerializer
from .models import Todo, Project


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = 'name', 'project_users', 'link', 'id'


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = 'text', 'created', 'updated', 'is_active', 'project', 'todo_user'


#class ProjectModelSerializerBase(ModelSerializer):
#    Project = ProjectModelSerializer()

 #   class Meta:
  #      model = Project
  #      fields = '__all__'
