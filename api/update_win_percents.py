from api.models import Team
from api.serializers import RoundSerializer

def calculate_win_percent(rounds_data, t_id):
  wins, losses = 0, 0
  for round in rounds_data:
    if round["winner"] == t_id:
      wins += 1
    else:
      losses += 1
  return wins, losses
  
def update_win_percents():
  for team in Team.objects.all():
    t_id = team.id
    aff_r = team.aff_rounds.all()
    neg_r = team.neg_rounds.all()
    aff_s = RoundSerializer(aff_r, many=True)
    neg_s = RoundSerializer(neg_r, many=True)
    a_wins, a_losses = calculate_win_percent(aff_s.data, t_id)
    n_wins, n_losses = calculate_win_percent(neg_s.data, t_id)
    if (a_wins+n_wins+n_losses+a_losses):
      wp = float(a_wins+n_wins)/(a_wins+n_wins+n_losses+a_losses)
    else:
      wp = 0
    team.win_percent = int(wp * 100)
    print int(wp * 100), team.team_code
    team.save()

# update_win_percents()