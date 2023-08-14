from django.urls import path
from .views import main
from . import views

urlpatterns = [
    path('home',main),
    path('<str:search_query>/', views.scrape_data, name='scrape_data')
]

