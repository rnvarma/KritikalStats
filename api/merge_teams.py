from api.models import Team, Tournament, Round
import Levenshtein

def merge_rounds(team1, team2):
  # go through the aff and neg rounds seperately and replace all fields
  # pertaining to team2 with team1 information
  print "merging rounds.. "
  for round in team2.aff_rounds.all():
    round.aff_team = team1
    if round.winner != "undecided":
      if round.winner == team2:
        round.winner = team1
      else:
        round.loser = team1
    round.save()
    print "added round %s at %s" % (round.round_num, round.tournament.all()[0].tournament_name)
  for round in team2.neg_rounds.all():
    round.neg_team = team1
    if round.winner != "undecided":
      if round.winner == team2:
        round.winner = team1
      else:
        round.loser = team1
    round.save()
    print "added round %s at %s" % (round.round_num, round.tournament.all()[0].tournament_name)

def merge_tournaments(team1, team2):
  # need to add only the tournaments that team1 doesnt already have added
  # Unlinking team2 from the tournament will not happen in this function,
  # but rather it will happen at the ned of main when we delete team2 :(
  print "merging tournaments.. "
  t1_tourns, t2_tourns = team1.tournaments.all(), team2.tournaments.all()
  new_tourns = []
  for tourn in t2_tourns:
    if tourn not in t1_tourns:
      new_tourns.append(tourn)
  for tourn in new_tourns:
    print "added %s" % tourn.tournament_name
    team1.tournaments.add(tourn)
  team1.save()
  print " ..done moerging tournaments!"

def merge_bids(team1, team2):
  # add all the bids from team2 that team1 doesnt already have and add them to
  # team1's list of bids
  print "merging bids.. "
  t1_bids, t2_bids = team1.bids.all(), team2.bids.all()
  new_bids = []
  for bid in t2_bids:
    if bid not in t1_bids:
      new_bids.append(bids)
  for bid in new_bids:
    print "added %s" % bid.tournament_name
    team1.bids.add(bid)
  team1.save()
  print " ..done merging bids!"

def merge_teams(team_id1, team_id2):
  """
  The first team passed in, team1, will be the team that remains after the merge_teams.
  The function will have to go through all of team2's ROUNDS, TOURNAMENTS, and BIDS and 
  replace the relation with team1.
  Also re-run the win_percent calculator after merging. 
  """
  team1 = Team.objects.get(id = team_id1)
  team2 = Team.objects.get(id = team_id2)
  merge_rounds(team1, team2)
  merge_tournaments(team1, team2)
  merge_bids(team1, team2)
  team2.delete() # :(
