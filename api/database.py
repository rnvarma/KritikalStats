from api.retrieve_team_list import get_team_list
from api import retrieve_round_list
from api.models import Tournament, Team, Round, Judge
from api.process_names import process_team_code

"""
TODO: create tool to remove duplicate rounds (requires a little thinking)
"""

def enter_team_list(url, tournament, website="tabroom"):
  team_list = get_team_list(url)
  tourny = Tournament.objects.get(tournament_name = tournament)
  for (code, names) in team_list:
    code = process_team_code(code)
    try:
      team = Team.objects.get(team_code = code)
      print "got team %s" % code
      team.tournaments.add(tourny)
    except:
      team = Team(team_code = code, team_name = names)
      team.save()
      print "made team %s" % code
      team.tournaments.add(tourny)

def check_team_existence_or_create(name, tourny):
  try:
    team = Team.objects.get(team_code = name)
    return team
  except:
    team = Team(team_code = name, team_name= "enter_names")
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
    aff, neg = process_team_code(aff), process_team_code(neg)
    aff_team = check_team_existence_or_create(aff, tourny)
    neg_team = check_team_existence_or_create(neg, tourny)
    judge_obj = check_judge_existence_or_create(judge_name)
    try:
      round = Round.objects.get(aff_team=aff_team, neg_team=neg_team,
                               tournament=tourny)
      print "already made round"
    except:
      print aff + " v. " + neg
      round_obj = Round(aff_team=aff_team, neg_team=neg_team, 
                        round_num=round_num)
      round_obj.save()
      round_obj.tournament.add(tourny)
      round_obj.judge.add(judge_obj)
      print "round made"

def enter_completed_tournament(first_round_url, tournament, num_prelims,
                               website="tabroom"):
  for i in xrange(num_prelims):
    url = first_round_url[:-3] + str(int(first_round_url[-3:]) + i)
    print url
    enter_tournament_round(url, tournament, i + 1)