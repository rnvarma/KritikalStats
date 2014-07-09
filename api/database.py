from api.retrieve_team_list import get_team_list
from api.models import Tournament, Team, Round

def enter_team_list(url, tournament, website="tabroom"):
  team_list = get_team_list(url)
  tourny = Tournament.objects.get(tournament_name = tournament)
  for (team, names) in team_list:
  	print team
  	try:
  	  team = Team.objects.get(team_name = team)
  	  team.tournaments.add(tourny)
  	except:
  	  team = Team(team_name = team)
  	  team.save()
  	  team.tournaments.add(tourny)