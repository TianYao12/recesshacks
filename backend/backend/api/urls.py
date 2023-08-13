from django.urls import path
from .views import main
from . import views

urlpatterns = [
    path('home',main),
    path('',main),
    path('api/1', views.get_product_details, name='get_product_details'),
]
