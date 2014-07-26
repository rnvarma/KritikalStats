from django.contrib.auth.models import User, Group
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from api.serializers import TeamSerializer, TournamentSerializer, RoundSerializer
from api.models import Team, Tournament, Round
from api.database import enter_team_list, enter_completed_tournament, enter_tournament_round
from django.shortcuts import render

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
        win = aff_id
        lose = neg_id
      elif win_id == neg_id:
        win = neg_id
        lose = aff_id
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

  def get(self, request, pk, format = None):
    tournaments = Tournament.objects.get(tournament_name=pk)
    rounds = tournaments.rounds.all()
    serializer = RoundSerializer(rounds, many=True)
    rounds = TournamentRounds.process_rounds(serializer.data)
    data = {}
    data["curr_round"] = tournaments.curr_rounds
    data["rounds"] = rounds
    return Response(data)

class TeamRoundsFetch(APIView):

  def get(self, request, tourn_name, team_id, format = None):
    team = Team.objects.get(id=team_id)
    tournament = Tournament.objects.get(tournament_name = tourn_name)
    aff_rounds = team.aff_rounds.filter(tournament__exact = tournament)
    neg_rounds = team.neg_rounds.filter(tournament__exact = tournament)
    aff_serializer = RoundSerializer(aff_rounds, many=True)
    neg_serializer = RoundSerializer(neg_rounds, many=True)
    data = {}
    data["aff"] = TournamentRounds.process_rounds(aff_serializer.data)
    data["neg"] = TournamentRounds.process_rounds(neg_serializer.data)
    return Response(data)

class TournamentCreate(APIView):

  @classmethod
  def input_entries(cls, meta):
    entry_url = meta['entry_url'][0]
    # host_site = meta['host_site']
    tourn_name = meta['name'][0]
    enter_team_list(entry_url, tourn_name)

  @classmethod
  def create_tournament(cls, meta):
    name = meta['name'][0]
    bid_round = int(meta['bid'][0])
    prelims = int(meta['prelims'][0])
    breaks_to = int(meta['break'][0])
    curr_rounds = int(meta['curr_rounds'][0])
    tourn = Tournament(tournament_name=name, bid_round=bid_round,
                       prelims=prelims, breaks_to=breaks_to,
                       curr_rounds=curr_rounds)
    tourn.save()

  def post(self, request, format = None):
    if not request.DATA.get('name', False):
      return Response("No tournament data inputed",
                status=status.HTTP_403_FORBIDDEN)
    meta = dict(request.DATA)
    TournamentCreate.create_tournament(meta)
    TournamentCreate.input_entries(meta)
    return render(request, 'homepage.html')

class RoundCreate(APIView):

  @classmethod
  def enter_round(cls, data):
    tname = data['tname'][0]
    round_url = data['round_url'][0]
    round_num = data['round_num'][0]
    enter_tournament_round(round_url, tname, round_num)

  @classmethod
  def entre_complete_tourn_rounds(cls, data):
    tname = data['tname'][0]
    tourn_obj = Tournament.objects.get(tournament_name=tname)
    num_prelims = tourn_obj.prelims
    round_one_url = data['round_url'][0]
    round_num = data['round_num'][0]
    if int(round_num) != 1:
      return Response("If tournament complete enter round 1",
                  status=status.HTTP_403_FORBIDDEN)
    enter_completed_tournament(round_one_url, tname, num_prelims)

  def post(self, request, format = None):
    if not request.DATA.get("status", False):
      return Response("No tournament status inputed",
                status=status.HTTP_403_FORBIDDEN)
    req_data = dict(request.DATA)
    if req_data['status'][0] != 'complete':
      RoundCreate.enter_round(req_data)
    else:
      RoundCreate.entre_complete_tourn_rounds(req_data)
    return render(request, 'homepage.html')








