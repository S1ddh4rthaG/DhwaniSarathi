from django.shortcuts import render, HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

# Create your views here.
