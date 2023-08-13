from django.http import HttpResponse
from django.shortcuts import render

def movies(request):
    context = {'lang': ['1', '2']}  # Context data as a dictionary
    return render(request, 'backend/backend.html', context)

def home(request):
    return HttpResponse("home")
