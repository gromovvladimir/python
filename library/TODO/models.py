from django.db import models
from users.models import CustomUser
from django.utils import timezone


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)
    project_users = models.ManyToManyField(CustomUser, related_name='+')
    link = models.URLField(verbose_name='link', max_length=128, db_index=True, unique=True, blank=True)


class Todo(models.Model):
    text = models.TextField(max_length=1024)
    created = models.DateTimeField(verbose_name='created', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='updated', auto_now=True)
    is_active = models.BooleanField(verbose_name='active', default=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='+')
    todo_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
