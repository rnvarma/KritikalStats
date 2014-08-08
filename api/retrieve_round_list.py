import urllib2, json
from bs4 import BeautifulSoup
from process_names import process_judges_name, proccess_special_case, process_team_code

URL = "https://www.tabroom.com/index/tourn/postings/round.mhtml?tourn_id=2891&round_id=83735"

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
      if string and not is_number(string):
        if string.lower() != "aff" and string.lower() != "neg":
          clean_data.append(string)
  return clean_data

def remove_space(text):
    new_text = ""
    for char in text:
        if char != '\t':
            new_text += char
    newer_text = ""
    for char in new_text:
        if char == '\n':
            newer_text += ","
        else:
            newer_text += char
    comma_split = newer_text.split(",")
    final = []
    for elem in comma_split:
        if elem:
            final.append(elem)
    return final

def get_info_from_text(text):
    print text
    all_info = []
    aff = []
    neg = []
    judge = []
    i = 0  
    while(i < len(text)):
        if ((i-1) % 4) == 0:
            aff.append(process_team_code(text[i]))
            i += 1
        elif ((i-2) % 4) == 0:
            neg.append(process_team_code(text[i]))
            i += 1
        elif ((i-3) % 4) == 0:
            judge.append(process_judges_name(text[i]))
            i += 1
        else:
            i += 1
    return aff, neg, judge


def get_round_list(url):
    response = urllib2.urlopen(url)
    html = BeautifulSoup(response.read())
    data = html.find('tbody').getText().split("\n")
    data = clean_data(data)
    aff, neg, judge = get_info_from_text(data)
    return zip(aff, neg, judge)

# for a, b, c in get_round_list(URL):
#   print a + " | " + b + " | " + c


def get_elim_info_from_text(text):
    print text
    all_info = []
    aff = []
    neg = []
    judge1 = []
    judge2 = []
    judge3 = []
    i = 0  
    while(i < len(text)):
        if ((i-1) % 6) == 0:
            aff.append(process_team_code(text[i]))
            i += 1
        elif ((i-2) % 6) == 0:
            neg.append(process_team_code(text[i]))
            i += 1
        elif ((i-3) % 6) == 0:
            judge1.append(process_team_code(text[i]))
            i += 1
        elif ((i-4) % 6) == 0:
            judge2.append(process_team_code(text[i]))
            i += 1
        elif ((i-5) % 6) == 0:
            judge3.append(process_team_code(text[i]))
            i += 1
        else:
            i += 1
    return aff, neg, judge1, judge2, judge3

def get_elim_round_list(url):
    response = urllib2.urlopen(url)
    html = BeautifulSoup(response.read())
    data = html.find('tbody').getText().split("\n")
    data = clean_data(data)
    aff, neg, judge1, judge2, judge3 = get_elim_info_from_text(data)
    return zip(aff, neg, judge1, judge2, judge3)

# for a, b, c, d, e in get_elim_round_list(URL):
#   print a + " | " + b + " | " + c + " | " + d + " | " + e