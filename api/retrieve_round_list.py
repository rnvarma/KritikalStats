import urllib2, json
from bs4 import BeautifulSoup
from process_names import process_judges_name, proccess_special_case

URL = "https://www.tabroom.com/index/tourn/postings/round.mhtml?tourn_id=2891&round_id=83644"

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
    comma_split = newer_text.split(",")
    final = []
    for elem in comma_split:
        if elem:
            final.append(elem)
    return final

def get_info_from_text(text):
    all_info = []
    aff = []
    neg = []
    judge = []
    i = 0  
    while(i < len(text)):
        if ((i-1) % 4) == 0:
            aff.append(proccess_special_case(text[i]))
            i += 1
        elif ((i-2) % 4) == 0:
            neg.append(proccess_special_case(text[i]))
            i += 1
        elif ((i-3) % 4) == 0:
            judge.append(process_judges_name(text[i]))
            i += 1
        else:
            i += 1
    return aff, neg, judge


def get_round_list(url):
    global aff, neg, judges
    if url == "xx":
        return zip(aff, neg, judges)
    response = urllib2.urlopen(url)
    html = BeautifulSoup(response.read())
    data = html.find('tbody').getText().split("\n")
    data = clean_data(data)
    aff, neg, judge = get_info_from_text(data)
    return zip(aff, neg, judge)

# for a, b, c in get_round_list(URL):
#   print a + " | " + b + " | " + c