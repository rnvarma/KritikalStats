from django.shortcuts import render
from django.http import Http404,HttpResponseBadRequest,\
                    HttpResponseRedirect,HttpResponse
from django.contrib.auth.decorators import login_required

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

def archived_tournaments(request, year):
	return render(request, 'archived_tournaments.html', {'year':year})

def archived(request):
	return render(request, 'archive.html')

def udl_main(request):
	return render(request, 'UDL_main.html')

def loading_test(request):
	return render(request, 'loading.html')

def about_page(request):
	return render(request, 'about.html')

@login_required(login_url = '/')
def admin_page(request):
	return render(request, 'admin.html')

def admin_login_page(request):
	return render(request, 'admin_login.html')

@login_required(login_url = '/')
def modify_dashboard(request, tournament):
	return render(request, 'modify_dashboard.html', {'tournament': tournament})

def dashboard_page(request, tournament):
	return render(request, 'dashboard.html', {'tournament': tournament})

def main_page(request, tournament):
	return render(request, 'main.html', {'tournament': tournament})

def entries_page(request, tournament):
	return render(request, 'entries.html', {'tournament': tournament})

def bracket_page(request, tournament):
	return render(request, 'bracket.html', {'tournament': tournament})

@login_required(login_url = '/')
def merge_teams(request):
	return render(request, 'merge_teams.html')

def admin_round(request, tournament, round_num):
	return render(request, 'admin_round.html', {'tournament': tournament, 'r_num': round_num})

