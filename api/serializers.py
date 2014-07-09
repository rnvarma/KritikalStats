from django.forms import widgets
from rest_framework import serializers
from api.models import Tournament, Team, Round


class TournamentSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Tournament
  	fields = ('tournament_name', 'entries')

class TeamSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Team
  	fields = ('team_name', 'tournaments')

class RoundSerializer(serializers.ModelSerializer):
  class Meta:
  	model = Round
  	fields = ('tournament', 'aff_team', 'neg_team', 'winner', 'loser')