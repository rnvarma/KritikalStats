from django.contrib.auth.models import User, Group
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from api.serializers import TeamSerializer, TournamentSerializer, RoundSerializer
from api.models import Team, Tournament, Round

class TournamentList(APIView):
  
  def get(self, request, format = None):
  	tournaments = Tournament.objects.all()
  	serializer = TournamentSerializer(tournaments, many=True)
  	return Response(serializer.data)

class TournamentEntries(APIView):
  
  def get(self, request, pk, format = None):
  	tournaments = Tournament.objects.get(tournament_name=pk)
  	teams = tournaments.entries.all()
  	serializer = TeamSerializer(teams, many=True)
  	return Response(serializer.data)

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
      new_round["neg_team"] = neg
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

class TeamDataFetch(APIView):

  def get(self, request, pk, format = None):
    team = Team.objects.get(id=pk)
    serializer = TeamSerializer(team)
    return Response(serializer.data)