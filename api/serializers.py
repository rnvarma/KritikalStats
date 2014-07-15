from django.forms import widgets
from rest_framework import serializers
from api.models import Tournament, Team, Round


class TournamentSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Tournament
  	fields = ('tournament_name', 'num_entries', 'start_date', 'end_date',
  		       'bid_round','prelims','breaks_to','curr_rounds')

class TeamSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Team
  	fields = ('team_name', 'team_code', 'tournaments','bids')

class JudgeSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Team
  	fields = ('name', 'paradigm', 'school')

class RoundSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Round
  	fields = ('tournament', 'aff_team', 'neg_team', 'winner', 'loser')