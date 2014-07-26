import urllib2, json
from bs4 import BeautifulSoup

from process_names import process_judges_name, process_team_code
from api.models import Team, Tournament, Round

URL = "https://www.tabroom.com/index/tourn/results/round_results.mhtml?tourn_id=2649&round_id=77671"

def is_number(s):
  try:
    float(s)
    return True
  except ValueError:
    return False

def clean_data(data):
  clean_data = []
  for item in data:
    if item:
      string = ""
      for char in item:
        if char != "\n" and char != "\t":
          string += char
      if string and string == "BYE":
        clean_data.pop()
        clean_data.pop()
        continue

      if string and not is_number(string):
        clean_data.append(string)
  i = 0
  while (i < len(clean_data)):
    if i == len(clean_data) - 1:
      break
    if clean_data[i] in "AFF NEG" and clean_data[i + 1] in "AFF NEG":
      clean_data.pop(i)
    i += 1
  return clean_data

def get_info_from_text(text):
  rounds = []
  all_info = []

  for i in xrange(6, len(text), 6):
    round_list = text[i - 6: i]
    if round_list[5] not in "AFF NEG AFF":
      # handle when result not posted
      text.insert(i - 5, "undecided")
    # if round_list[5] in "AFF NEG" and round_list[6] in "AFF NEG":
    #   # handle when double win
    #   text.pop(i - 5)
    #   text.pop(i - 4)
    #   text.insert(i - 5, "double_win")

  for i in xrange(6, len(text) + 1, 6):
    rounds.append(text[i - 6: i])

  for round_list in rounds:
    round_data = {}
    round_data["aff_code"] = process_team_code(round_list[0])
    round_data["aff_name"] = round_list[1]
    round_data["neg_code"] = process_team_code(round_list[2])
    round_data["neg_name"] = round_list[3]
    # round_data["judge"] = process_judges_name(round_list[4])
    round_data["winner"] = round_list[5]
    all_info.append(round_data)
  return all_info

def enter_win_loss_data(data, tourn_name):
  for round_data in data:
    tourn = Tournament.objects.get(tournament_name = tourn_name)
    aff_team = Team.objects.get(team_code = round_data["aff_code"])
    neg_team = Team.objects.get(team_code = round_data["neg_code"])
    round_obj = Round.objects.get(aff_team = aff_team, neg_team = neg_team,
                                tournament = tourn)
    if round_data["winner"] == "AFF":
      round_obj.winner = aff_team
      round_obj.loser = neg_team
      round_obj.save()
    elif round_data["winner"] == "NEG":
      round_obj.winner = neg_team
      round_obj.loser = aff_team
      round_obj.save()

    if round_obj.winner:
      print round_obj.winner.team_code
    else:
      print "no winner or undecided ********************"

def input_win_loss(url, tourn_name):
  response = urllib2.urlopen(url)
  html = BeautifulSoup(response.read())
  data = html.find('tbody').getText().split("\n")
  data = clean_data(data)
  data = get_info_from_text(data)
  enter_win_loss_data(data, tourn_name)

def process_complete_prelims(first_round_url, tourn_name, num_prelims):
  for i in xrange(0, num_prelims):
    url = first_round_url[:-5] + str(int(first_round_url[-5:]) + i)
    input_win_loss(url, tourn_name)
