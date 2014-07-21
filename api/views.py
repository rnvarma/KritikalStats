from django.contrib.auth.models import User, Group
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from api.serializers import TeamSerializer, TournamentSerializer, RoundSerializer
from api.models import Team, Tournament, Round

class TeamDataFetch(APIView):

  @classmethod
  def process_teams(cls, team_data):
    team = Team.objects.get(team_name = team_data['team_name'],
                            team_code = team_data['team_code'])
    new_team = {}
    new_team['team_name'] = team_data['team_name']
    new_team['team_code'] = team_data['team_code']
    new_team['team_id'] = team.id
    tournaments = []
    bids = []
    for tourn_id in team_data['tournaments']:
      tourn_name = Tournament.objects.get(id = tourn_id).tournament_name
      tournaments.append(tourn_name)
    for bid_tourn_id in team_data['bids']:
      tourn_name = Tournament.objects.get(id = bid_tourn_id).tournament_name
      bids.append(tourn_name)
    new_team['tournaments'] = tournaments
    new_team['bids'] = bids
    return new_team

  def get(self, request, pk, format = None):
    team = Team.objects.get(id=pk)
    serializer = TeamSerializer(team)
    return Response(TeamDataFetch.process_teams(serializer.data))

class TournamentList(APIView):
  
  def get(self, request, format = None):
  	tournaments = Tournament.objects.all()
  	serializer = TournamentSerializer(tournaments, many=True)
  	return Response(serializer.data)

class TournamentEntries(APIView):

  @classmethod
  def process_tourn_entries(cls, team_list):
    new_list = []
    for team in team_list:
      new_team = TeamDataFetch.process_teams(team)
      new_list.append(new_team)
    return new_list
  
  def get(self, request, pk, format = None):
  	tournaments = Tournament.objects.get(tournament_name=pk)
  	teams = tournaments.entries.all()
  	serializer = TeamSerializer(teams, many=True)
  	return Response(TournamentEntries.process_tourn_entries(serializer.data))

class TournamentRounds(APIView):

  @classmethod
  def process_rounds(cls, rounds_data):
    new_list = []
    for round in rounds_data:
      print round
      new_round = {}
      tourn_id = round["tournament"][0]
      aff_id = round["aff_team"]
      neg_id = round["neg_team"]
      if round["winner"]:
        win_id = round["winner"]
        lose_id = round["loser"]
      else:
        win_id = "undecided"
        lose_id = "undecided"
      tournament = Tournament.objects.get(id = tourn_id).tournament_name
      aff = Team.objects.get(id = aff_id).team_name
      neg = Team.objects.get(id = neg_id).team_name
      aff_code = Team.objects.get(id = aff_id).team_code
      neg_code = Team.objects.get(id = neg_id).team_code
      if win_id == aff_id:
        win = aff
        lose = neg
      elif win_id == neg_id:
        win = neg
        lose = aff
      else:
        win, lose = "undecided", "undecided"
      new_round["tournament"] = tournament
      new_round["aff_team"] = aff
      new_round["aff_id"] = aff_id
      new_round["neg_team"] = neg
      new_round["neg_id"] = neg_id
      new_round["aff_code"] = aff_code
      new_round["neg_code"] = neg_code
      new_round["winner"] = win
      new_round["loser"] = lose
      new_round["round_num"] = round["round_num"]
      new_list.append(new_round)
    return new_list

  def get(self, request, pk, rn, format = None):
    tournaments = Tournament.objects.get(tournament_name=pk)
    rounds = tournaments.rounds.filter(round_num__exact=rn)
    serializer = RoundSerializer(rounds, many=True)
    rounds = TournamentRounds.process_rounds(serializer.data)
    return Response(rounds)