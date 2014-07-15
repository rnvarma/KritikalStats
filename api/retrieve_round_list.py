import urllib2, json
from bs4 import BeautifulSoup
from process_names import process_judges_name

URL = "https://www.tabroom.com/index/tourn/postings/round.mhtml?tourn_id=2299&round_id=63728"

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
        if ((i-2) % 6) == 0:
            aff.append(text[i])
            i += 1
        elif ((i-3) % 6) == 0:
            neg.append(text[i])
            i += 1
        elif ((i-4) % 6) == 0:
            judge.append(process_judges_name(text[i] + " " + text[i+1]))
            i += 2
        else:
            i += 1
    return aff, neg, judge


def get_round_list(url):
    global aff, neg, judges
    if url == "xx":
        return zip(aff, neg, judges)
    response = urllib2.urlopen(url)
    html = BeautifulSoup(response.read())
    html_text = html.get_text()
    teams_with_bottom_spam = html_text.split("Room")[1]
    teams_text_unparsed = teams_with_bottom_spam.split("About IDEA")[0]
    new_text = remove_space(teams_text_unparsed)[3:]
    aff, neg, judge = get_info_from_text(new_text)
    return zip(aff, neg, judge)