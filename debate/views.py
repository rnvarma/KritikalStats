from django.shortcuts import render
from django.http import Http404,HttpResponseBadRequest,\
                    HttpResponseRedirect,HttpResponse

def load_homepage(request):
  return render(request, 'homepage.html')

def load_loginpage(request):
	return render(request, 'login.html')

def load_tourncreate(request):
	return render(request, 'create_tournament.html')

def splash(request):
	return render(request, 'splash.html')

def team_page(request, id):
    return render(request, 'team.html', {'team_id': id})

def about_page(request):
	return render(request, 'about.html')

def admin_page(request):
	return render(request, 'admin.html')

def dashboard_page(request, tournament):
	return render(request, 'dashboard.html', {'tournament': tournament})

def main_page(request, tournament):
	return render(request, 'main.html', {'tournament': tournament})

def entries_page(request, tournament):
	return render(request, 'entries.html', {'tournament': tournament})

def bracket_page(request, tournament):
	return render(request, 'bracket.html', {'tournament': tournament})