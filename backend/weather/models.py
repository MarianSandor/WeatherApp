from django.db import models

# Create your models here.
USERS_TYPES = [
    ("silver", "silver"),
    ("gold", "gold"),
]


class User(models.Model):
    username = models.CharField(max_length=40)
    email = models.EmailField()
    password = models.CharField(max_length=40)
    user_type = models.CharField(max_length=10, choices=USERS_TYPES)

    def _str_(self):
        return self.email


class Review(models.Model):
    username = models.CharField(max_length=40, default="Marian")
    location = models.CharField(max_length=50)
    description = models.TextField()

    def _str_(self):
        return self.description
