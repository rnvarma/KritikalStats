from api.retrieve_team_list import get_team_list
from api import retrieve_round_list
from api.models import Tournament, Team, Round, Judge

"""
TODO: create tool to remove duplicate rounds (requires a little thinking)
"""

def enter_team_list(url, tournament, website="tabroom"):
  team_list = get_team_list(url)
  tourny = Tournament.objects.get(tournament_name = tournament)
  for (team, names) in team_list:
    try:
      team = Team.objects.get(team_code = team)
      team.tournaments.add(tourny)
    except:
      team = Team(team_code = team, team_name = names)
      team.save()
      team.tournaments.add(tourny)

def check_team_existence_or_create(name, tourny):
  try:
    team = Team.objects.get(team_name = name)
    return team
  except:
    team = Team(team_name = name)
    team.save()
    team.tournaments.add(tourny)
    return team

def check_judge_existence_or_create(name):
  try:
    judge = Judge.objects.get(name = name)
    return judge
  except:
    judge = Judge(name = name)
    judge.save()
    return judge

def enter_tournament_round(url, tournament, round_num, website="tabroom"):
  tourny = Tournament.objects.get(tournament_name = tournament)
  round_list = retrieve_round_list.get_round_list(url)
  for (aff, neg, judge_name) in round_list:
    aff_team = check_team_existence_or_create(aff, tourny)
    neg_team = check_team_existence_or_create(neg, tourny)
    judge_obj = check_judge_existence_or_create(judge_name)
    try:
      round = Round.objects.get(aff_team=aff_team, neg_team=neg_team,
                               tournament=tourny)
    except:
      print aff + " v. " + neg
      round_obj = Round(aff_team=aff_team, neg_team=neg_team, 
                        round_num=round_num)
      round_obj.save()
      round_obj.tournament.add(tourny)
      round_obj.judge.add(judge_obj)

def enter_completed_tournament(first_round_url, tournament, num_prelims,
                               website="tabroom"):
  for i in xrange(num_prelims):
    url = first_round_url[:-3] + str(int(first_round_url[-3:]) + i)
    enter_tournament_round(url, tournament, i + 1)