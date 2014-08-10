import re

class TextProcessor:

  def judge(self, name):
    """
    clean up a judge name 
    """
    # if the name is an empty string, return back that emptry string
    # this is for the case of a a bye
    if not name:return ""
    #if there are multiple commans, making the assumption that there are
    # multiple judges in the form: "last, first last, first last, first"
    # and so assuming that is an elim round
    if name.count(",") > 1: return self.elim_judges(name)
    name = name.replace("*", "") # for some reason some come with a "*"
    name = " ".join(name.split()) # remove runs of whitespace
    # when there is a comma, assuming that it is "last, first"
    # otherwise we assume it is in "first last"
    if name.find(",") >= 0: last, first = name.split(",")
    else: first, last = name.split()
    # format names into title case, Ex: Gary Lin, Sunny Advani
    last = last.strip().lower()
    first = first.strip().lower()
    last = last[0].upper() + last[1:]
    first = first[0].upper() + first[1:]
    final_name = first + " " + last
    return final_name

  def elim_judges(self, judges):
  	"""
  	clean up a string with multiple judges on them and return a list of them
  	input form: "last, first last, first last, first"
  	"""
    judges = " ".join(judges.split()).split()
    judges.append(",") # so that the while loop processes the last judge
    judge_list, curr_judge, i = [], "", 0
    while i < len(judges):
      part = judges[i]
      # a comma means its a last name and so the previous judge's name has been
      # fully created and stored in curr_judge
      if i > 0 and part.find(",") >= 0:
      	judge_list.append(curr_judge)
        curr_judge = part # initialize the start of the new judge name
      else:
      	curr_judge += part
      i += 1
    return map(self.judge, judge_list)
  



# tp = TextProcessor()

# print tp.judge("lin, gary")