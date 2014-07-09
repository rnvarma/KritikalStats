from django.db import models

# Create your models here.
class Tournament(models.Model):
  tournament_name = models.CharField(max_length=50, blank=True, default='')
  entries = models.IntegerField()

class Team(models.Model):
  team_name = models.CharField(max_length=50, blank=True, default='')
  tournaments = models.ManyToManyField(Tournament)

  class Meta:
  	ordering = ('team_name',)

class Round(models.Model):
  tournament = models.ManyToManyField(Tournament)
  aff_team = models.ForeignKey(Team, related_name="aff_rounds")
  neg_team = models.ForeignKey(Team, related_name="neg_rounds")
  winner = models.ForeignKey(Team, related_name="wins")
  loser = models.ForeignKey(Team, related_name="losses")