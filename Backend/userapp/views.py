from django.shortcuts import render, HttpResponse


# Create your views here.

def home(self):
    return HttpResponse('<h1>Hello World</h1>')