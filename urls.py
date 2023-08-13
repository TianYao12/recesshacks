from django.shortcuts import render
from django.urls import path
from . import views
global peth
peth="advil"
urlpatterns = [

    path('', views.home,name='Medicine'),
    path(peth,views.home,name="peth")
]
