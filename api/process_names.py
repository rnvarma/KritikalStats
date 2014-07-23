

def process_judges_name(name):
  if name.find(",") >= 0:
  	last, first = name.split(",")
  elif name.find("  ") >=0:
    last, first = name.split("  ")
  else:
  	first, last = name.split()
  last = last.strip().lower()
  last = last[0].upper() + last[1:]
  first = first.strip().lower()
  first = first[0].upper() + first[1:]
  final_name = first + " " + last
  return final_name

def test_process_judges_name():
  print("Testing process_judges_name.. "),
  names = ["seth gannon","gannon, seth","seth  gannon"]
  base_name = process_judges_name(names[0])
  for name in names:
    assert(process_judges_name(name) == base_name)
  print("passed!")

#test_process_judges_name()

def process_team_code(code):
  parts = code.split()
  last_names = parts[-1]
  school = parts[:-1]
  final_school = ""
  for word in school:
    word = word[0].upper() + word[1:].lower()
    final_school += word + " "
  first_l = last_names[0].upper()
  second_l = last_names[1].upper()
  if first_l > second_l:
    team_c = second_l + first_l
  else:
    team_c = first_l + second_l
  return final_school + team_c