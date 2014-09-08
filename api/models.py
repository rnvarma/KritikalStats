from django.db import models

"""
TODO: add "judge" and "round_num" fields to Round model and update DB
           (remember to rebase the database)
"""

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
  bracket_list = models.CharField(max_length=300, blank=True, default='')
  association = models.CharField(max_length=100, blank=True, default='')

class Team(models.Model):
  team_name = models.CharField(max_length=100, blank=True, default='') #Leland AV
  team_code = models.CharField(max_length=50, blank=True, default='') # Advani & Varma
  tournaments = models.ManyToManyField(Tournament, related_name="entries")
  bids = models.ManyToManyField(Tournament, related_name="bids")
  win_percent = models.IntegerField(default = 0)
  association = models.CharField(max_length=100, blank=True, default='')

  class Meta:
  	ordering = ('team_code',)

class Judge(models.Model):
  name = models.CharField(max_length=50, blank=True, default='')
  paradigm = models.TextField(blank=True, default='')
  school = models.CharField(max_length=50, blank=True, default='')
  aff_percent = models.IntegerField(default = 0)
  neg_percent = models.IntegerField(default = 0)

# class School(models.Model):
#   school_name = models.CharField(max_length=100, blank=True, default='')
#   teams = models.ManyToManyField(Team, related_name = "school")
#   judges = models.ManyToManyField(Judge, related_name = "school_asc")

class Round(models.Model):
  tournament = models.ManyToManyField(Tournament, related_name="rounds")
  aff_team = models.ForeignKey(Team, related_name="aff_rounds")
  neg_team = models.ForeignKey(Team, related_name="neg_rounds")
  winner = models.ForeignKey(Team, related_name="wins", blank=True, null=True)
  loser = models.ForeignKey(Team, related_name="losses", blank=True, null=True)
  judge = models.ManyToManyField(Judge, related_name="rounds")
  round_num = models.IntegerField()
  one_ac = models.ManyToManyField('OneAC', related_name = "rounds_read", blank=True, null=True)
  one_nc = models.ManyToManyField('NegArgument', related_name = "one_nc_rounds", blank=True, null=True)
  block = models.ManyToManyField('NegArgument', related_name = "block_rounds", blank=True, null=True)
  two_nr = models.ManyToManyField('NegArgument', related_name = "two_nr_rounds", blank=True, null=True)
  association = models.CharField(max_length=100, blank=True, default='')

class ElimRound(models.Model):
  tournament = models.ManyToManyField(Tournament, related_name="elim_rounds")
  aff_team = models.ForeignKey(Team, related_name="aff_elim_rounds")
  neg_team = models.ForeignKey(Team, related_name="neg_elim_rounds")
  winner = models.ForeignKey(Team, related_name="elim_wins", blank=True, null=True)
  loser = models.ForeignKey(Team, related_name="elim_losses", blank=True, null=True)
  judge = models.ManyToManyField(Judge, related_name="elim_rounds")
  aff_votes = models.ManyToManyField(Judge, related_name="aff_elim_votes")
  neg_votes = models.ManyToManyField(Judge, related_name="neg_elim_votes")
  round_num = models.IntegerField()
  one_ac = models.ManyToManyField('OneAC', related_name = "elim_rounds_read", blank=True, null=True)
  one_nc = models.ManyToManyField('NegArgument', related_name = "one_nc_elim_rounds", blank=True, null=True)
  block = models.ManyToManyField('NegArgument', related_name = "block_elim_rounds", blank=True, null=True)
  two_nr = models.ManyToManyField('NegArgument', related_name = "two_nr_elim_rounds", blank=True, null=True)
  association = models.CharField(max_length=100, blank=True, default='')

class Seed(models.Model):
  team = models.ForeignKey(Team, related_name="team")
  tournament = models.ManyToManyField(Tournament, related_name="seeds")
  number = models.IntegerField(default = 0)

class NegArgument(models.Model):
  tournaments = models.ManyToManyField(Tournament, related_name = "neg_args")
  teams = models.ManyToManyField(Team, related_name = "neg_args")
  rounds = models.ManyToManyField(Round, related_name = "neg_args")
  elim_rounds = models.ManyToManyField(ElimRound, related_name = "neg_args")
  name = models.CharField(max_length=100, blank=True, default='')
  win_percent = models.IntegerField(default = 0)

class OneAC(models.Model):
  tournaments = models.ManyToManyField(Tournament, related_name = "one_acs")
  teams = models.ManyToManyField(Team, related_name = "one_acs")
  rounds = models.ManyToManyField(Round, related_name = "one_acs")
  elim_rounds = models.ManyToManyField(ElimRound, related_name = "one_acs")
  name = models.CharField(max_length = 100, blank = True, default = '')
  two_nrs = models.ManyToManyField(NegArgument, related_name = "one_acs")
  win_percent = models.IntegerField(default = 0)