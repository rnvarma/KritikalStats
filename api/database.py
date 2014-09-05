from api.retrieve_team_list import get_team_list
from api import retrieve_round_list
from api.models import Tournament, Team, Round, Judge, ElimRound, Seed
from api.text_processor import TextProcessor
from api.bracket import BracketList
from api.scraper import TabroomScraper, EntryScraper, PairingScraper, PrelimResultScraper
import csv

"""
TODO: create tool to remove duplicate rounds (requires a little thinking)
"""

tp = TextProcessor()

def enter_team_list(url, tournament, dryrun=True):
  team_list = get_team_list(url)
  tourny = Tournament.objects.get(tournament_name = tournament)
  for (code, names) in team_list:
    code = tp.team_code(code)
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

def check_team_existence_or_create(name, tourny, team_name="enter_names", dryrun=True):
  try:
    teams = Team.objects.filter(team_code = name)
    # check to make sure that the team is actually entered
    # this is to solve when a team is in rounds but wasnt on the entries page
    team = None
    for the_team in teams:
      if the_team.team_name == team_name:
        team = the_team
        break
    if not team:
      team = Team(team_code = name, team_name= team_name)
      if not dryrun:
        team.save()
        team.tournaments.add(tourny)
    if tourny not in Tournament.objects.filter(entries__id=team.id):
      team.tournaments.add(tourny)
    return team
  except:
    print "making team: " + name
    team = Team(team_code = name, team_name= team_name)
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

def enter_bye_round(team_code, tournament, round_num, dryrun=True):
  tourny = Tournament.objects.get(tournament_name = tournament)
  team = check_team_existence_or_create(team_code, tourny, dryrun)
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

count_failed = 0
def enter_individual_round(tournament, association, round_num, aff_code, neg_code, judge_name, winloss, aff_name="enter_names", neg_name="enter_names", dryrun=True):
  global count_failed
  try:
    tourny = Tournament.objects.get(tournament_name = tournament)
    aff = tp.team_code(aff_code)
    neg = tp.team_code(neg_code)
    judge_name = tp.judge(judge_name)
    # print aff + " | " + neg + " | " + judge_name
    aff_team = check_team_existence_or_create(aff, tourny, aff_name, dryrun)
    neg_team = check_team_existence_or_create(neg, tourny, neg_name, dryrun)
    judge_obj = check_judge_existence_or_create(judge_name, dryrun)
    try:
      # print aff + " v. " + neg
      round = Round.objects.get(aff_team=aff_team, neg_team=neg_team,
                               tournament=tourny)
      # print "already made round"
    except:
      # print aff + " v. " + neg
      round_obj = Round(aff_team=aff_team, neg_team=neg_team, 
                        round_num=round_num)
      round_obj.association = association
      if winloss == "Aff":
        round_obj.winner = aff_team
        round_obj.loser = neg_team
      elif winloss == "Neg":
        round_obj.winner = neg_team
        round_obj.loser = aff_team
      if not dryrun:
        if tourny.curr_rounds < round_num:
          tourny.curr_rounds = round_num
          tourny.save()
        round_obj.save()
        round_obj.tournament.add(tourny)
        round_obj.judge.add(judge_obj)
        # print "round made"
  except:
    count_failed += 1
    print count_failed, tournament, association, round_num, aff_code, neg_code, judge_name, winloss
    print count_failed, type(tournament), type(association), type(round_num), type(aff_code), type(neg_code), type(judge_name), type(winloss)

def enter_individual_elim_round(tournament, association, round_num, aff_code, neg_code, j1, j2, j3, winloss, aff_name="enter_names", neg_name="enter_names", dryrun=True):
  try:
    tourny = Tournament.objects.get(tournament_name = tournament)
    aff = tp.team_code(aff_code)
    neg = tp.team_code(neg_code)
    if (j1 == j2) and (j2 == j3) and (j1 == j3):
      j1_obj = Judge.objects.get(name = "unknown")
      j2_obj = Judge.objects.get(name = "unknown1")
      j3_obj = Judge.objects.get(name = "unknown2")
    else:
      j1 = tp.judge(j1)
      j2 = tp.judge(j2)
      j3 = tp.judge(j3)
      j1_obj = check_judge_existence_or_create(j1, dryrun)
      j2_obj = check_judge_existence_or_create(j2, dryrun)
      j3_obj = check_judge_existence_or_create(j3, dryrun)
    aff_team = check_team_existence_or_create(aff, tourny, aff_name, dryrun)
    neg_team = check_team_existence_or_create(neg, tourny, neg_name, dryrun)
    try:
      round = ElimRound.objects.get(aff_team=aff_team, neg_team=neg_team,
                               tournament=tourny)
      print "already made round"
    except:
      print aff + " v. " + neg
      round_obj = ElimRound(aff_team=aff_team, neg_team=neg_team, 
                        round_num=round_num)
      round_obj.association = association
      if not dryrun:
        if round_num >= tourny.breaks_to:
          print "********************************", round_num
          tourny.breaks_to = round_num
          tourny.save()
        round_obj.save()

        if winloss == "Aff":
          round_obj.winner = aff_team
          round_obj.loser = neg_team
          round_obj.aff_votes.add(j1_obj)
          round_obj.aff_votes.add(j2_obj)
          round_obj.aff_votes.add(j3_obj)
        elif winloss == "Neg":
          round_obj.winner = neg_team
          round_obj.loser = aff_team
          round_obj.neg_votes.add(j1_obj)
          round_obj.neg_votes.add(j2_obj)
          round_obj.neg_votes.add(j3_obj)

        round_obj.tournament.add(tourny)
        round_obj.judge.add(j1_obj)
        round_obj.judge.add(j2_obj)
        round_obj.judge.add(j3_obj)
        round_obj.save()
        print "round made"
  except:
    "there was an error"

def enter_tournament_round(url, tournament, round_num, indexes, dryrun=True):
  round_num = int(round_num)
  tourny = Tournament.objects.get(tournament_name = tournament)
  scraper = PairingScraper(url, tournament)
  scraper.process_pairings(int(indexes[0]), int(indexes[1]), int(indexes[2]))
  for (aff, neg, judge_name) in scraper.processed_data:
    if (not aff) or (not neg):
      # this is a bye round because only one team was in the pairing
      bye_team = aff if aff else neg
      bye_team = tp.team_code(bye_team)
      enter_bye_round(bye_team, tournament, round_num, dryrun)
      continue
    aff = tp.team_code(aff)
    neg = tp.team_code(neg)
    judge_name = tp.judge(judge_name)
    print aff + " | " + neg + " | " + judge_name
    aff_team = check_team_existence_or_create(aff, tourny, dryrun)
    neg_team = check_team_existence_or_create(neg, tourny, dryrun)
    judge_obj = check_judge_existence_or_create(judge_name, dryrun)
    try:
      print aff + " v. " + neg
      round = Round.objects.get(aff_team=aff_team, neg_team=neg_team,
                               tournament=tourny)
      print "already made round"
    except:
      print aff + " v. " + neg
      round_obj = Round(aff_team=aff_team, neg_team=neg_team, 
                        round_num=round_num)
      if not dryrun:
        if tourny.curr_rounds < round_num:
          tourny.curr_rounds = round_num
          tourny.save()
        round_obj.save()
        round_obj.tournament.add(tourny)
        round_obj.judge.add(judge_obj)
        print "round made"

def enter_tournament_elim_round(url, tournament, round_num, indexes, dryrun=True):
  tourny = Tournament.objects.get(tournament_name = tournament)
  scraper = PairingScraper(url, tournament)
  scraper.process_pairings(int(indexes[0]), int(indexes[1]), int(indexes[2]))
  for (aff, neg, judges) in scraper.processed_data:
    aff = tp.team_code(aff)
    neg = tp.team_code(neg)
    judge1_name, judge2_name, judge3_name = tp.judge(judges)
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
      print aff + " v. " + neg, judge1_name, judge2_name, judge3_name 
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

def make_team_seed(team_code, seed, tournament):
  tourny = Tournament.objects.get(tournament_name = tournament)
  team = Team.objects.get(team_code = team_code)
  seed_obj = Seed(team = team, number = seed)
  seed_obj.save()
  seed_obj.tournament.add(tourny)

def initialize_bracket(tournament):
  tourny = Tournament.objects.get(tournament_name = tournament)
  depth = tourny.breaks_to
  bracket = BracketList(depth)
  b_list = bracket.tournament_array
  tourny.bracket_list = str(b_list)
  tourny.save()

def enter_UDL_tournaments(t_list):
  for name, start_date, num_prelims in t_list:
    try:
      tourny = Tournament.objects.get(tournament_name = name)
    except:
      end_date = str(int(start_date) + 3)
      tourny = Tournament(tournament_name=name, start_date=start_date, end_date=end_date, prelims = int(num_prelims), association = "UDL")
      tourny.save()
