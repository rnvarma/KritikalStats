from django.db import models

"""
TODO: add "judge" and "round_num" fields to Round model and update DB
           (remember to rebase the database)
"""

# Create your models here.
class Tournament(models.Model):
  tournament_name = models.CharField(max_length=50, blank=True, default='')
  num_entries = models.IntegerField()
  start_date = models.IntegerField()
  end_date = models.IntegerField()
  bid_round = models.IntegerField()
  prelims = models.IntegerField()
  # number of teams that break (16 = octos, 32 = doubles)
  breaks_to = models.IntegerField()
  curr_rounds = models.IntegerField()

class Team(models.Model):
  team_name = models.CharField(max_length=100, blank=True, default='') #Leland AV
  team_code = models.CharField(max_length=50, blank=True, default='') # Advani & Varma
  tournaments = models.ManyToManyField(Tournament, related_name="entries")
  bids = models.ManyToManyField(Tournament, related_name="bids")

  class Meta:
  	ordering = ('team_code',)

class Judge(models.Model):
  name = models.CharField(max_length=50, blank=True, default='')
  paradigm = models.TextField(blank=True, default='')
  school = models.CharField(max_length=50, blank=True, default='')

class Round(models.Model):
  tournament = models.ManyToManyField(Tournament, related_name="rounds")
  # round_num = models.IntegerField()
  aff_team = models.ForeignKey(Team, related_name="aff_rounds")
  neg_team = models.ForeignKey(Team, related_name="neg_rounds")
  winner = models.ForeignKey(Team, related_name="wins", blank=True, null=True)
  loser = models.ForeignKey(Team, related_name="losses", blank=True, null=True)
  judge = models.ManyToManyField(Judge, related_name="rounds")
  round_num = models.IntegerField()