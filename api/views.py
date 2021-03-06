from django.contrib.auth.models import User, Group
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from api.serializers import TeamSerializer, TournamentSerializer, RoundSerializer, JudgeSerializer, ElimRoundSerializer
from api.models import Team, Tournament, Round, Judge, ElimRound, Seed
from api.database import enter_team_list, enter_completed_tournament, enter_tournament_round, initialize_bracket, enter_tournament_elim_round
from api.scraper import TabroomScraper, EntryScraper, PairingScraper, PrelimResultScraper
from api.merge_teams import merge_teams
from api.update_win_percents import update_win_percents
from django.shortcuts import render, redirect
from django.db.models import Q
from api.twitter import make_tweet

import Levenshtein

class UpdateObjects:

  @classmethod
  def update_object_attributes(cls, obj, attributes):
    # takes an object model and a dictionary of values and keys
    # and updates the object based on the dictioary where the 
    # keys are actual fields of the model and it checks if the 
    # values are different than in the DB and saves them if so
    for key in attributes.keys():
      val = attributes[key]
      setattr(obj, key, val)
      obj.save()

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
    new_team['win_percent'] = team_data['win_percent']
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
      judge = Judge.objects.get(id = round["judge"][0]).name
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
      new_round["round_id"] = round["id"]
      new_round["judge"] = judge
      new_round["judge_id"] = round["judge"][0]
      # new_round["one_ac"] = round["one_ac"]
      # new_round["one_nc"] = round["one_nc"]
      # new_round["block"] = round["block"]
      # new_round["two_nr"] = round["two_nr"]
      new_list.append(new_round)
    return new_list

  @classmethod
  def process_elim_rounds(cls, rounds_data):
    new_list = []
    for round in rounds_data:
      round_model = ElimRound.objects.get(id = round["id"])
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
      judges = []
      for judge_id in round["judge"]:
        judge = Judge.objects.get(id = judge_id)
        judge_obj = {}
        judge_obj["judge_name"] = judge.name 
        judge_obj["judge_id"] = judge_id
        judges.append(judge_obj)
      aff_votes = []
      neg_votes = []
      for vote in round_model.aff_votes.all():
        aff_votes.append(vote.name)
      for vote in round_model.neg_votes.all():
        neg_votes.append(vote.name)
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
      new_round["round_id"] = round["id"]
      new_round["judge"] = judges
      new_round["aff_votes"] = aff_votes
      new_round["neg_votes"] = neg_votes
      # new_round["one_ac"] = round["one_ac"]
      # new_round["one_nc"] = round["one_nc"]
      # new_round["block"] = round["block"]
      # new_round["two_nr"] = round["two_nr"]
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
    data["t_name"] = tourn_name
    return Response(data)

class TournamentPrelims(APIView):

  @classmethod
  def get_entries(cls, entries, tourny):
    result = {}
    for entry in entries:
      team_data = {}
      team_data["code"] = entry.team_code
      team_data["t_id"] = entry.id
      # aff_rounds = RoundSerializer(entry.aff_rounds.filter(tournament = tourny))
      # neg_rounds = RoundSerializer(entry.neg_rounds.filter(tournament = tourny))
      # aff_rounds.data.extend(neg_rounds.data)
      team_data["prelims"] = [] # TournamentRounds.process_rounds(aff_rounds.data)
      # result.append(team_data)
      result[entry.team_code] = team_data
    rounds = RoundSerializer(tourny.rounds.all())
    rounds = TournamentRounds.process_rounds(rounds.data)
    for round in rounds:
      if round['aff_code'] != "BYE":
        result[round['aff_code']]['prelims'].append(round)
      if round['neg_code'] != "BYE":
        result[round['neg_code']]['prelims'].append(round)
    real_result = {}
    real_result["data"] = result
    real_result["curr_rounds"] = tourny.curr_rounds
    real_result["prelims"] = tourny.prelims
    return real_result

  def get(self, request, pk, format=None):
    tourny = Tournament.objects.get(tournament_name=pk)
    result_data = TournamentPrelims.get_entries(tourny.entries.all(), tourny)
    return Response(result_data)

class TeamElimRoundsFetch(APIView):

  def get(self, request, tourn_name, team_id, format = None):
    team = Team.objects.get(id=team_id)
    tournament = Tournament.objects.get(tournament_name = tourn_name)
    aff_rounds = team.aff_elim_rounds.filter(tournament__exact = tournament)
    neg_rounds = team.neg_elim_rounds.filter(tournament__exact = tournament)
    aff_serializer = ElimRoundSerializer(aff_rounds, many=True)
    neg_serializer = ElimRoundSerializer(neg_rounds, many=True)
    data = {}
    data["aff"] = TournamentRounds.process_elim_rounds(aff_serializer.data)
    data["neg"] = TournamentRounds.process_elim_rounds(neg_serializer.data)
    data["t_name"] = tourn_name
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

    # makes tweet
    make_tweet(name)

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
    tname = data['tname[]'][0]
    round_url = data['round_url[]'][0]
    round_num = data['round_num[]'][0]
    indexes = data['indexes[]']
    enter_tournament_round(round_url, tname, round_num, indexes, False)

    # makes tweet
    make_tweet(tname + ' Round ' + round_num)

  @classmethod
  def enter_elim_round(cls, data):
    tname = data['tname[]'][0]
    round_url = data['round_url[]'][0]
    round_num = data['round_num[]'][0]
    indexes = data['indexes[]']
    enter_tournament_elim_round(round_url, tname, round_num, indexes)

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
    req_data = dict(request.DATA)
    if req_data["status"][0] == "first":
      TS = TabroomScraper(req_data["round_url"][0], req_data["tname"][0])
      top_row = TS.table_data[0]
      return Response({"top_row": top_row, "round_url": req_data["round_url"], "t_name": req_data["tname"], "r_num": req_data["round_num"]})
    else:
      if req_data["r_type"][0] == "prelim":
        RoundCreate.enter_round(req_data)
      else:
        RoundCreate.enter_elim_round(req_data)
      return Response({"processed": "success"})

class JudgeList(APIView):

  def get(self, request, format=None):
    judges = Judge.objects.all()
    result_data = []
    for judge in judges:
      judge_data = {}
      judge_data["name"] = judge.name
      judge_data["j_id"] = judge.id
      judge_data["aff_b"] = judge.aff_percent
      judge_data["neg_b"] = judge.neg_percent
      judge_data["num_rounds"] = len(judge.rounds.all()) + len(judge.elim_rounds.all())
      result_data.append(judge_data)
    return Response(result_data)

class JudgeView(APIView):

  @classmethod
  def process_judge(cls, judge_data):
    result = {}
    result["name"] = judge_data["name"]
    result["aff_b"] = judge_data["aff_percent"]
    result["neg_b"] = judge_data["neg_percent"]
    return result

  def get(self, request, pk, format=None):
    judge = Judge.objects.get(id=pk)
    return_data = {}
    judge_serialize = JudgeSerializer(judge)
    prelims = RoundSerializer(judge.rounds.all(), many = True)
    elims = ElimRoundSerializer(judge.elim_rounds.all(), many = True)
    print prelims
    return_data["judge_data"] = JudgeView.process_judge(judge_serialize.data)
    return_data["prelim_rounds"] = TournamentRounds.process_rounds(prelims.data)
    return_data["elim_rounds"] = TournamentRounds.process_elim_rounds(elims.data)
    return Response(return_data)



class RoundData(APIView):

  def get(self, request, r_id, format = None):
    r_data = Round.objects.get(id = r_id)
    serializer = RoundSerializer(r_data)
    processed_data = TournamentRounds.process_rounds([serializer.data])
    return Response(processed_data)

class ElimRoundData(APIView):

  def get(self, request, r_id, format = None):
    r_data = ElimRound.objects.get(id = r_id)
    serializer = ElimRoundSerializer(r_data)
    processed_data = TournamentRounds.process_elim_rounds([serializer.data])
    return Response(processed_data)

class SimilarTeams(APIView):

  @classmethod
  def double_count_present(cls, obj, obj_list):
    for o in obj_list:
      if o["team1"] == obj["team2"] and o["team2"] == obj["team1"]:
        return True
    return False

  @classmethod
  def identify_similar_teams(cls):
    matches = []
    final = []
    teams = Team.objects.all()
    for team_primary in teams:
      p_school = team_primary.team_code[:-3]
      for team_sec in teams:
        s_school = team_sec.team_code[:-3]
        if (p_school != s_school):
          if Levenshtein.ratio(team_primary.team_code, team_sec.team_code) > 0.50:
            matches.append((team_primary, team_sec))
    for t1, t2 in matches:
      if Levenshtein.ratio(t1.team_name, t2.team_name) > .60:
        data = {}
        data["team1"] = TeamDataFetch.process_teams(TeamSerializer(Team.objects.get(id=t1.id)).data)
        data["team2"] = TeamDataFetch.process_teams(TeamSerializer(Team.objects.get(id=t2.id)).data)
        data["score"] = Levenshtein.ratio(t1.team_name, t2.team_name) + Levenshtein.ratio(t1.team_code, t2.team_code)
        final.append(data)
    processed_data = []
    for obj in final:
      if not processed_data:
        processed_data.append(obj)
      elif (obj not in processed_data) and (not SimilarTeams.double_count_present(obj, processed_data)):
        processed_data.append(obj)
    return processed_data

  def get(self, request, format = None):
    team_list = SimilarTeams.identify_similar_teams()
    return Response(team_list)

  def post(self, request, format = None):
    if not request.DATA.get("merge", False):
      return HTTP_403_FORBIDDEN("Incorrect request")
    main_team = request.DATA.get("main", False)
    side_team = request.DATA.get("side", False)
    if not (main_team and side_team): 
      return HTTP_403_FORBIDDEN("Incorrect request, specify teams")
    if request.DATA.get("execute", False):
      merge_teams(main_team, side_team)
    return Response({"teams_merged": True})

class UpdateTournaments(APIView):

  def post(self, request, format = None):
    t_name = request.DATA.get("tourn_name")
    tourn = Tournament.objects.get(tournament_name = t_name)
    dates = request.DATA.get("date").split("-")
    date_nums = []
    for date in dates:
      month, day, year = date.split("/")
      if len(month) < 2:
        month = "0" + month
      if len(day) < 2:
        day = "0" + day
      date = int(year + month + day)
      date_nums.append(date)
    start_date, end_date = date_nums[0], date_nums[1]
    location = request.DATA.get("location")
    bid = request.DATA.get("bid_level")
    attributes = {"loc": location,
                  "start_date": start_date,
                  "end_date": end_date,
                  "bid_round": bid}
    UpdateObjects.update_object_attributes(tourn, attributes)
    return redirect("/admin")

class TournamentSpecificRound(APIView):

  def get(self, request, pk, r_num, format=None):
    tournaments = Tournament.objects.get(tournament_name=pk)
    rounds = tournaments.rounds.filter(round_num=r_num)
    serializer = RoundSerializer(rounds, many=True)
    rounds = TournamentRounds.process_rounds(serializer.data)
    data = {}
    data["curr_round"] = tournaments.curr_rounds
    data["rounds"] = rounds
    return Response(data)

class UpdateRoundResult(APIView):

  @classmethod
  def enter_round_result(cls, r_id, w_id, l_id):
    winner = Team.objects.get(id = w_id)
    loser = Team.objects.get(id = l_id)
    the_round = Round.objects.get(id = r_id)
    the_round.winner = winner
    the_round.loser = loser
    the_round.save()

  @classmethod
  def calc_win_from_votes(cls, decisions):
    t1 = []
    t2 = []
    for dec in decisions:
      if dec in t1:
        t2.append(dec)
      else:
        t1.append(dec)
    if len(t1) > len(t2):
      return t1[0]
    else:
      return t2[0]

  @classmethod
  def enter_elim_round_result(cls, r_id, j1,j2,j3,d1,d2,d3):
    win_id = UpdateRoundResult.calc_win_from_votes([d1,d2,d3])
    winner = Team.objects.get(id = win_id)
    the_round = ElimRound.objects.get(id = r_id)
    aff_id = the_round.aff_team.id
    neg_id = the_round.neg_team.id
    if win_id == aff_id:
      lose_id = neg_id
    else:
      lose_id = aff_id
    loser = Team.objects.get(id = lose_id)
    the_round.winner = winner
    the_round.loser = loser
    ju1 = Judge.objects.get(name = j1)
    ju2 = Judge.objects.get(name = j2)
    ju3 = Judge.objects.get(name = j3)
    if int(d1) == int(aff_id):
      the_round.aff_votes.add(ju1)
    else:
      the_round.neg_votes.add(ju1)
    if int(d2) == int(aff_id):
      the_round.aff_votes.add(ju2)
    else:
      the_round.neg_votes.add(ju2)
    if int(d3) == int(aff_id):
      the_round.aff_votes.add(ju3)
    else:
      the_round.neg_votes.add(ju3)
    the_round.save()
    return {"r_id": r_id, "winner": win_id, "loser": lose_id}


  def post(self, request, format = None):
    if request.DATA.get("update", False) == "round_result":
      win_id = request.DATA.get("win_id", False)
      lose_id = request.DATA.get("lose_id", False)
      r_id = request.DATA.get("r_id", False)
      UpdateRoundResult.enter_round_result(r_id, win_id, lose_id)
      return Response({"loser": lose_id, "winner": win_id, "r_id": r_id})
    elif request.DATA.get("update", False) == "elim_result":
      j1 = request.DATA.get("judge1")
      j2 = request.DATA.get("judge2")
      j3 = request.DATA.get("judge3")
      d1 = request.DATA.get("1-dec")
      d2 = request.DATA.get("2-dec")
      d3 = request.DATA.get("3-dec")
      r_id = request.DATA.get("r_id")
      return_data = UpdateRoundResult.enter_elim_round_result(r_id,j1,j2,j3,d1,d2,d3)
      return Response(return_data)

class TournamentRoundsLeft(APIView):

  def get(self, request, tourn_name, format = None):
    tourn = Tournament.objects.get(tournament_name = tourn_name)
    result = {}
    for r_num in xrange(1, tourn.prelims + 1):
      unentered_rounds = tourn.rounds.filter(round_num = r_num, winner=None)
      result["round " + str(r_num)] = len(unentered_rounds)
    print result
    return Response(result)

class TournamentElimRoundsLeft(APIView):

  def get(self, request, tourn_name, format = None):
    tourn = Tournament.objects.get(tournament_name = tourn_name)
    result = {}
    round_nums = [64,32,16,8,4,2,1]
    for r_num in round_nums:
      unentered_rounds = tourn.elim_rounds.filter(round_num = r_num, winner=None)
      if unentered_rounds:
        result[r_num] = len(unentered_rounds)
    print result
    return Response(result)

class TournamentSpecificElimRound(APIView):

  def get(self, request, pk, r_num, format = None):
    tournaments = Tournament.objects.get(tournament_name=pk)
    rounds = tournaments.elim_rounds.filter(round_num=r_num)
    serializer = ElimRoundSerializer(rounds, many=True)
    rounds = TournamentRounds.process_elim_rounds(serializer.data)
    data = {}
    data["curr_round"] = tournaments.curr_rounds
    data["rounds"] = rounds
    return Response(data)

class UpdateWinLoss(APIView):

  def post(self, request, format = None):
    if request.DATA.get("update", False) == "winloss":
      update_win_percents()
      return Response({"yay": "you did it!"})
    else:
      return Response({"dont": "mess with us"})

class SeedView(APIView):

  @classmethod
  def process_seed_list(cls, s_list):
    seeds_result_list = {}
    for seed in s_list:
      team_code = seed.team.team_code
      num = seed.number
      seeds_result_list[num] = team_code
    return seeds_result_list

  @classmethod
  def get_teams_that_broke(cls, tournament):
    tourny = Tournament.objects.get(tournament_name = tournament)
    if len(tourny.elim_rounds.all()):
      aff_teams = tourny.entries.filter(~Q(aff_elim_rounds=None))
      neg_teams = tourny.entries.filter(~Q(neg_elim_rounds=None))
      team_code_list = set()
      for team in aff_teams:
        team_code_list.add(team.team_code)
      for team in neg_teams:
        team_code_list.add(team.team_code)
      final_list = []
      for team in team_code_list:
        team = Team.objects.get(team_code = team)
        if team.team.all():
          seed = team.team.all()[0].number
        else:
          seed = "unknown"
        final_list.append({"code": team.team_code, "id": team.id, "seed": seed})
      return final_list
    else:
      return {"data": "no_breaks_yet"}

  def get(self, request, pk, format=None):
    return Response(SeedView.get_teams_that_broke(pk))
      

class TournamentBracket(APIView):

  def get(self, request, pk, format=None):
    result_data = {}
    tourny = Tournament.objects.get(tournament_name=pk)
    if not tourny.bracket_list:
      initialize_bracket(pk)
    print tourny.bracket_list
    bracket_list = eval(tourny.bracket_list)
    seeds = tourny.seeds.all()
    seed_list = SeedView.process_seed_list(seeds)
    result_data["tournament"] = pk
    result_data["seeds"] = seed_list
    result_data["bracket_list"] = bracket_list
    return Response(result_data)



