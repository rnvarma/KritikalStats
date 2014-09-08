from django.forms import widgets
from rest_framework import serializers
from api.models import Tournament, Team, Round, Judge, ElimRound, NegArgument, OneAC


class TournamentSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Tournament
  	fields = ('tournament_name', 'num_entries', 'start_date', 'end_date',
  		       'bid_round','prelims','breaks_to','curr_rounds', 'loc',
             'registration_date', 'bracket_list', 'association')

class TeamSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Team
  	fields = ('team_name', 'team_code', 'tournaments','bids', 'win_percent', 'association')

class JudgeSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Judge
  	fields = ('name', 'paradigm', 'school', 'aff_percent', 'neg_percent')

class RoundSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Round
  	fields = ('tournament', 'aff_team', 'neg_team', 'winner', 'loser',
              'round_num', 'id', 'judge', 'association', 'one_ac',
              'one_nc', 'block', 'two_nr')

class ElimRoundSerializer(serializers.ModelSerializer):
  class Meta:
    model = ElimRound
    fields = ('tournament', 'aff_team', 'neg_team', 'winner', 'loser',
              'round_num', 'id', 'judge', 'association', 'one_ac',
              'one_nc', 'block', 'two_nr')

class NegArgument(serializers.ModelSerializer):
  class Meta:
    model = NegArgument
    fields = ('tournaments', 'teams', 'rounds', 'elim_rounds', 'name',
              'win_percent')

class OneAC(serializers.ModelSerializer):
  class Meta:
    model = OneAC
    fields = ('tournaments', 'teams', 'rounds', 'elim_rounds', 'name',
              'two_nrs', 'win_percent')