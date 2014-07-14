import urllib2, json
from bs4 import BeautifulSoup

URL = "https://www.tabroom.com/index/tourn/fields.mhtml?tourn_id=2275&event_id=22000"


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
    all_info = []
    teams = []
    schools = []
    index = 0  
    while index < len(text):
        if not text[index]:
            index += 1
        else:
            word = ""
            while text[index]:
                word += text[index]
                index += 1
            all_info.append(word)
    for i in xrange(len(all_info)):
        if ((i-3) % 5) == 0:
            schools.append(all_info[i])
        elif ((i-2) % 5) == 0:
            teams.append(all_info[i])
    return teams, schools


def get_team_list(url):
    response = urllib2.urlopen(url)
    html = BeautifulSoup(response.read())
    html_text = html.get_text()
    teams_with_bottom_spam = html_text.split("Status")[1]
    teams_text_unparsed = teams_with_bottom_spam.split("Event")[0]
    new_text = remove_space(teams_text_unparsed)
    teams, schools = get_info_from_text(new_text)
    return zip(schools, teams)