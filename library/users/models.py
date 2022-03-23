from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    city = models.CharField(max_length=64, verbose_name='город', blank=True)
    phone_number = models.CharField(max_length=14, verbose_name='номер телефона', blank=True)
    age = models.PositiveIntegerField(verbose_name='возраст', default=18)
    email = models.EmailField(verbose_name='email_address', unique=True)
