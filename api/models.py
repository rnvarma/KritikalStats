from django.db import models

"""
TODO: add "judge" and "round_num" fields to Round model and update DB
           (remember to rebase the database)
"""

# Create your models here.
class Tournament(models.Model):
  tournament_name = models.CharField(max_length=50, blank=True, default='')
  num_entries = models.IntegerField(default=0)
  start_date = models.IntegerField(default=0)
  end_date = models.IntegerField(default=0)
  bid_round = models.IntegerField(default=0)
  prelims = models.IntegerField(default=0)
  # number of teams that break (16 = octos, 32 = doubles)
  breaks_to = models.IntegerField(default=0)
  curr_rounds = models.IntegerField(default=0)
  registration_date = models.CharField(max_length=100, blank=True, default='')
  loc = models.CharField(max_length=100, blank=True, default='')

class Team(models.Model):
  team_name = models.CharField(max_length=100, blank=True, default='') #Leland AV
  team_code = models.CharField(max_length=50, blank=True, default='') # Advani & Varma
  tournaments = models.ManyToManyField(Tournament, related_name="entries")
  bids = models.ManyToManyField(Tournament, related_name="bids")
  win_percent = models.IntegerField(default = 0)

  class Meta:
  	ordering = ('team_code',)

class Judge(models.Model):
  name = models.CharField(max_length=50, blank=True, default='')
  paradigm = models.TextField(blank=True, default='')
  school = models.CharField(max_length=50, blank=True, default='')
  aff_percent = models.IntegerField(default = 0)
  neg_percent = models.IntegerField(default = 0)

class Round(models.Model):
  tournament = models.ManyToManyField(Tournament, related_name="rounds")
  # round_num = models.IntegerField()
  aff_team = models.ForeignKey(Team, related_name="aff_rounds")
  neg_team = models.ForeignKey(Team, related_name="neg_rounds")
  winner = models.ForeignKey(Team, related_name="wins", blank=True, null=True)
  loser = models.ForeignKey(Team, related_name="losses", blank=True, null=True)
  judge = models.ManyToManyField(Judge, related_name="rounds")
  round_num = models.IntegerField()
  one_ac = models.CharField(max_length=200, blank=True, default='')
  one_nc = models.CharField(max_length=200, blank=True, default='')
  block = models.CharField(max_length=200, blank=True, default='')
  two_nr = models.CharField(max_length=200, blank=True, default='')