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
  	teams = tournaments.team_set.all()
  	serializer = TeamSerializer(teams, many=True)
  	return Response(serializer.data)