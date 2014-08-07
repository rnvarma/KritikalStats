from api.retrieve_team_list import get_team_list
from api import retrieve_round_list
from api.models import Tournament, Team, Round, Judge, ElimRound
from api.process_names import process_team_code, proccess_special_case

"""
TODO: create tool to remove duplicate rounds (requires a little thinking)
"""

def enter_team_list(url, tournament, dryrun=True):
  team_list = get_team_list(url)
  tourny = Tournament.objects.get(tournament_name = tournament)
  for (code, names) in team_list:
    code = proccess_special_case(code)
    try:
      team = Team.objects.get(team_code = code)
      if team.team_name != names:
        team = Team(team_code = code, team_name = name)
      print "got team %s" % code
      team.tournaments.add(tourny)
    except:
      team = Team(team_code = code, team_name = names)
      if not dryrun:
        team.save()
        team.tournaments.add(tourny)
      print "made team %s" % code

def check_team_existence_or_create(name, tourny, dryrun):
  try:
    team = Team.objects.get(team_code = name)
    # check to make sure that the team is actually entered
    # this is to solve when a team is in rounds but wasnt on the entries page
    if tourny not in Tournament.objects.filter(entries__id=team.id):
      team.tournaments.add(tourny)
    return team
  except:
    print "making team: " + name
    team = Team(team_code = name, team_name= "enter_names")
    if not dryrun:
      team.save()
      team.tournaments.add(tourny)
    return team

def check_judge_existence_or_create(name, dryrun):
  try:
    judge = Judge.objects.get(name = name)
    return judge
  except:
    judge = Judge(name = name)
    if not dryrun:
      judge.save()
      return judge

def enter_tournament_round(url, tournament, round_num, dryrun=True):
  tourny = Tournament.objects.get(tournament_name = tournament)
  round_list = retrieve_round_list.get_round_list(url)
  for (aff, neg, judge_name) in round_list: 
    aff_team = check_team_existence_or_create(aff, tourny, dryrun)
    neg_team = check_team_existence_or_create(neg, tourny, dryrun)
    judge_obj = check_judge_existence_or_create(judge_name, dryrun)
    try:
      round = Round.objects.get(aff_team=aff_team, neg_team=neg_team,
                               tournament=tourny)
      print "already made round"
    except:
      print aff + " v. " + neg
      round_obj = Round(aff_team=aff_team, neg_team=neg_team, 
                        round_num=round_num)
      if not dryrun:
        round_obj.save()
        round_obj.tournament.add(tourny)
        round_obj.judge.add(judge_obj)
        print "round made"

def enter_tournament_elim_round(url, tournament, round_num, dryrun=True):
  tourny = Tournament.objects.get(tournament_name = tournament)
  round_list = retrieve_round_list.get_elim_round_list(url)
  for (aff, neg, judge1_name, judge2_name, judge3_name) in round_list: 
    aff_team = check_team_existence_or_create(aff, tourny, dryrun)
    neg_team = check_team_existence_or_create(neg, tourny, dryrun)
    judge1_obj = check_judge_existence_or_create(judge1_name, dryrun)
    judge2_obj = check_judge_existence_or_create(judge2_name, dryrun)
    judge3_obj = check_judge_existence_or_create(judge3_name, dryrun)
    try:
      round = ElimRound.objects.get(aff_team=aff_team, neg_team=neg_team,
                               tournament=tourny)
      print "already made round"
    except:
      print aff + " v. " + neg
      round_obj = ElimRound(aff_team=aff_team, neg_team=neg_team, 
                        round_num=round_num)
      if not dryrun:
        round_obj.save()
        round_obj.tournament.add(tourny)
        round_obj.judge.add(judge1_obj)
        round_obj.judge.add(judge2_obj)
        round_obj.judge.add(judge3_obj)
        print "round made"

def enter_completed_tournament(first_round_url, tournament, num_prelims,
                               website="tabroom"):
  for i in xrange(num_prelims):
    url = first_round_url[:-3] + str(int(first_round_url[-3:]) + i)
    print url
    enter_tournament_round(url, tournament, i + 1)

def enter_bye_round(team_code, tournament, round_num, dryrun=True):
  tourny = Tournament.objects.get(tournament_name = tournament)
  team = Team.objects.get(team_code = team_code)
  bye_team = Team.objects.get(team_code = "BYE")
  judge = Judge.objects.get(name = "Ghandi")
  round_obj = Round(aff_team = team, neg_team = bye_team, round_num = round_num, winner = team)
  if not dryrun:
    round_obj.winner = team
    round_obj.save()
    round_obj.tournament.add(tourny)
    round_obj.judge.add(judge)
    return round_obj
  else:
    print "success creating bye for %s in round %d" % (team_code, round_num)

