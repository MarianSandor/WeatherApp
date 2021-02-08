from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import UserSerializer, ReviewSerializer      # add this
from .models import User, Review                     # add this


class UserView(viewsets.ModelViewSet):       # add this
    serializer_class = UserSerializer          # add this
    queryset = User.objects.all()              # add this


class ReviewView(viewsets.ModelViewSet):       # add this
    serializer_class = ReviewSerializer          # add this
    queryset = Review.objects.all()
