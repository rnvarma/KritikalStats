import urllib2, json
from bs4 import BeautifulSoup

from process_names import process_judges_name, process_team_code

URL = "https://www.tabroom.com/index/tourn/fields.mhtml?tourn_id=2858"

def proccess_special_case(code):
  parts = code.split()
  if "&" not in parts:
    parts = parts[0:2] + ["&"] + parts[2:]
  last_names = (parts[1], parts[3])
  school = parts[0]
  first_l = last_names[0][0].upper()
  second_l = last_names[1][0].upper()
  if first_l > second_l:
    team_c = second_l + first_l
  else:
    team_c = first_l + second_l
  return school + " " + team_c

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
    return newer_text.split(",")

def get_info_from_text(text):
    code = []
    name = []
    index = 0  
    for i in xrange(len(text)):
        if ((i-3) % 4) == 0:
            code.append(process_team_code(text[i]))
        elif ((i-2) % 4) == 0:
            name.append(text[i])
    return code, name

def get_team_list(url):
    response = urllib2.urlopen(url)
    html = BeautifulSoup(response.read())
    data = html.find('tbody').getText().split("\n")
    data = clean_data(data)
    code, name = get_info_from_text(data)
    return zip(code, name)

# for a,b in get_team_list(URL):
#   print a + " | " + b
