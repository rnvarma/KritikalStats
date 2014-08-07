from django.shortcuts import render
from django.http import Http404,HttpResponseBadRequest,\
                    HttpResponseRedirect,HttpResponse
from django.contrib.auth.decorators import login_required

def load_homepage(request):
  return render(request, 'homepage.html', {'user': request.user})

def team_page(request, id):
    return render(request, 'team.html', {'team_id': id, 'user': request.user})

def round_page(request, id):
	return render(request, 'round.html', {'round_id': id, 'round_type': 'round', 'user': request.user})

def elim_round_page(request, id):
	return render(request, 'round.html', {'round_id': id, 'round_type': 'elim_round', 'user': request.user})

def archived_tournaments(request, year):
	return render(request, 'archived_tournaments.html', {'year':year, 'user': request.user})

def archived(request):
	return render(request, 'archive.html', {'user': request.user})

def udl_main(request):
	return render(request, 'UDL_main.html', {'user': request.user})

def about_page(request):
	print request.user
	return render(request, 'about.html', {'user': request.user})

def dashboard_page(request, tournament):
	return render(request, 'dashboard.html', {'tournament': tournament,
		'user': request.user})

def main_page(request, tournament):
	return render(request, 'main.html', {'tournament': tournament,
		'user': request.user})

def entries_page(request, tournament):
	return render(request, 'entries.html', {'tournament': tournament,
		'user': request.user})

def elims_page(request, tournament):
	return render(request, 'elims_main.html', {'tournament': tournament,
		'user': request.user})

##### ADMIN VIEWS #####

def admin_login_page(request):
	return render(request, 'admin_login.html')

@login_required(login_url = '/adminlogin')
def load_tourncreate(request):
	return render(request, 'create_tournament.html', {'user': request.user})

@login_required(login_url = '/adminlogin')
def load_roundcreate(request):
	return render(request, 'create_round.html', {'user': request.user})

@login_required(login_url = '/adminlogin')
def merge_teams(request):
	return render(request, 'merge_teams.html', {'user': request.user})

@login_required(login_url = '/adminlogin')
def admin_page(request):
	return render(request, 'admin.html', {'user': request.user})

@login_required(login_url = '/adminlogin')
def modify_dashboard(request, tournament):
	return render(request, 'modify_dashboard.html', {'tournament': tournament, 'user': request.user})

@login_required(login_url = '/adminlogin')
def admin_round(request, tournament, round_num):
	return render(request, 'admin_round.html', {'tournament': tournament, 'r_num': round_num, 'user': request.user})

