import urllib2, json
from bs4 import BeautifulSoup
from urlparse import urlparse
from text_processor import TextProcessor

class TabroomScraper:
  """
  Base class to handle scraping. Keeps track of the url, tournament name, and
  does the basic preprocessing which involved reading the table body and
  getting the table headers
  """

  def __init__(self, url, tournament_name = None):
    self.url = url
    self.tournament = tournament_name
    self.table_data = []
    self.initialize_scrape()

  def initialize_scrape(self):
    # intiialize the data from all the rows in the table body and
    # also get the tournament id/round_id from the url arguments
    response = urllib2.urlopen(self.url)
    self.html = BeautifulSoup(response.read())
    self.body_rows = self.html.find('tbody').findAll('tr')
    self.process_body()
    self.args = [arg.split("=") for arg in urlparse(self.url).query.split("&")]

  def process_body(self):
    # fills table_data with the information from each row in the table
    for row in self.body_rows:
      columns = row.findAll("td")
      row_data = map(self.remove_data_whitespace, [col.getText() for col in columns])
      self.table_data.append(row_data)

  def remove_data_whitespace(self, string):
    string = string.strip() # remove whitespace in front of back
    string = ' '.join(string.split()) #r replace '\n\n\t\n \n\t' with a space
    return string

class EntryScraper(TabroomScraper):
  """
  extends TabroomScraper and processes the table_data to get the list of
  entries
  """

  def process_entries(self, school_index, code_index, name_index):
    table_data = self.table_data
    self.school_list = [row[school_index] for row in table_data]
    self.code_list = [row[code_index] for row in table_data]
    self.name_list = [row[name_index] for row in table_data]
    self.processed_data = zip(self.school_list, self.code_list, self.name_list)
    return self.processed_data

  def print_processed_data(self):
    for school, name, code in self.processed_data:
      print school + " | " + name + " | " + code


class PairingScraper(TabroomScraper):
  """
  extends TabroomScraper and processes the table_data to get the list of
  round pairings, including: aff_team, neg_team, and judge
  """

  def process_pairings(self, aff_index, neg_index, judge_index):
    table_data = self.table_data
    self.aff_list = [row[aff_index] for row in table_data]
    self.neg_list = [row[neg_index] for row in table_data]
    self.judge_list = [tp.judge(row[judge_index]) for row in table_data]
    self.processed_data = zip(self.aff_list, self.neg_list, self.judge_list)
    return self.processed_data

  def print_processed_data(self):
    for aff, neg, judge in self.processed_data:
      print aff + " | " + neg + " | " + str(judge)

class PrelimResultScraper(TabroomScraper):
  """
  extends TabroomScraper and processes the table_data to get the list of
  results with: aff_info, neg_info, decision
  """

  def process_results(self, aff_index, neg_index, decision_index):
    table_data = self.table_data
    self.aff_list = [row[aff_index] for row in table_data]
    self.neg_list = [row[neg_index] for row in table_data]
    self.decision_list = [row[decision_index] for row in table_data]
    self.processed_data = zip(self.aff_list, self.neg_list, self.decision_list)
    return self.processed_data

  def print_processed_data(self):
    for aff, neg, decision in self.processed_data:
      print aff + " | " + neg + " | " + decision

a = PairingScraper("https://www.tabroom.com/index/tourn/postings/round.mhtml?tourn_id=2891&round_id=83645", "GDI")

tp = TextProcessor()
a.process_pairings(2,3,4)
a.print_processed_data()