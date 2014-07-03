from django.shortcuts import render
from django.http import Http404,HttpResponseBadRequest,\
                    HttpResponseRedirect,HttpResponse

def load_homepage(request):
  return render(request, 'homepage.html')

def load_loginpage(request):
	return render(request, 'login.html')

def load_tourncreate(request):
	return render(request, 'create_tournament.html')