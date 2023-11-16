from collections.abc import Iterable
from django.db import models

class Note(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=55)
    content = models.TextField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)