from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    contact = models.CharField(max_length=15)
    type = models.CharField(max_length=10)