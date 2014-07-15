import urllib2, json
from bs4 import BeautifulSoup

URL = "http://hspolicy.debatecoaches.org/bin/view/Main/"

def get_all_school_nams(url):
  response = urllib2.urlopen(url)
  html = BeautifulSoup(response.read())
  raw_list = []
  school_list = []
  for elem in html.findAll(attrs={'class':"wikilink"}):
    raw_list.append(elem.a.text)
  raw_list = raw_list[3:]
  for school in raw_list:
  	if school.find("(") >= 0:
  	  school_list.append(school[:-5])
  return school_list


print get_all_school_nams(URL)