from django.shortcuts import render
from django.http import Http404,HttpResponseBadRequest,\
                    HttpResponseRedirect,HttpResponse

def load_homepage(request):
  return render(request, 'homepage.html')

def load_loginpage(request):
	return render(request, 'login.html')

def load_tourncreate(request):
	return render(request, 'create_tournament.html')

def load_roundcreate(request):
	return render(request, 'create_round.html')

def splash(request):
	return render(request, 'splash.html')

def team_page(request, id):
    return render(request, 'team.html', {'team_id': id})

def round_page(request, id):
	return render(request, 'round.html', {'round_id': id})

def loading_test(request):
	return render(request, 'loading.html')

def about_page(request):
	return render(request, 'about.html')

def admin_page(request):
	return render(request, 'admin.html')

def admin_login_page(request):
	return render(request, 'admin_login.html')

def dashboard_page(request, tournament):
	return render(request, 'dashboard.html', {'tournament': tournament})

def main_page(request, tournament):
	return render(request, 'main.html', {'tournament': tournament})

def entries_page(request, tournament):
	return render(request, 'entries.html', {'tournament': tournament})

def bracket_page(request, tournament):
	return render(request, 'bracket.html', {'tournament': tournament})

def merge_teams(request):
	return render(request, 'merge_teams.html')