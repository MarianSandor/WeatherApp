from django.contrib import admin
from .models import User, Review

# Register your models here.
admin.site.register(User)  # add this
admin.site.register(Review)  # add this
