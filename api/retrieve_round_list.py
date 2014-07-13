import urllib2, json
from bs4 import BeautifulSoup

URL = "https://www.tabroom.com/index/tourn/postings/round.mhtml?tourn_id=2275&round_id=77291"

aff = [u'Niles West NP', u'Dallas Jesuit DH', u'POLYTECHNIC AA', u'Chaminade CP MS', u'Nevada Union FH', u'Taylor AL', u'Encinitas Independent DZ', u'Little Rock Central BG', u'Coppell BJ', u'CK McClatchy PM', u'Denver School of the Arts HI', u'Juan Diego Catholic WC', u'University SS', u'Homewood-Flossmoor FR', u'Cedar Ridge PR', u'St Francis RS', u'Johns Creek GR', u'Downtown Magnets SG', u'St. Vincent de Paul LH', u'Meadows CN', u'St. Vincent de Paul RP', u'James Logan KN', u'Bellarmine CP AG', u'College Prep BY', u'New Trier DL', u'Houston Memorial Wi', u'Green Valley YS', u'Coppell GS', u'Rowland Hall LG', u'Damien SO', u'Kent Denver DG', u'Notre Dame GC', u'St. Vincent de Paul Ga', u'Notre Dame CF', u'Johns Creek DD', u'Cypress Bay GS', u'Harker LX', u'St. Vincent de Paul JJ', u'Lynbrook CG', u'University Prep DK', u'Barstow TW', u'Niles West IT', u'Head Royce HL', u'Damien BQ', u'Interlake LM', u'Nevada Union NS', u'Notre Dame AB', u'Bingham NS', u'Cherry Creek GZ', u'Montgomery Bell BR', u'University Prep RV', u'Rowland Hall GK', u'Pine Crest Ja', u'Kudos College of Youth Leadership CW', u'College Prep AG', u'St. Vincent de Paul MY', u'Desert Vista LT', u'New Trier KB', u'Lake City EM', u'Crosby BZ', u'Timberline CF', u'Dougherty Valley ZL', u'St. Paul Central FS', u'Capitol Debate SS', u'Lynbrook MK', u'Boise ML', u'Millard South H.S. LS', u'Damien CS', u'Hamilton PC', u'Centennial TG', u'Lowell CV', u'Glenbrook North MS', u'Nevada Union PB', u'Loyola AC', u'Desert Vista CB', u'Timberline XW', u'Damien LR', u'California Academy of Forensics HL', u'College Prep Pi', u'Torrey Pines HS Speech and Debate LL', u'Bellarmine CP TS', u'Bay Area Urban Debate League GR', u'Homewood-Flossmoor CR', u'Leland KJ', u'Timberline BH', u'Boise JV', u'Glenbrook North HK', u'Lowell DL', u'Johns Creek XL', u'Notre Dame DP', u'Notre Dame KS', u'Wayzata CD', u'SF Austin SB', u'Kent Denver LB', u'St. Paul Central BN', u'St. Vincent de Paul DG', u'Leucadia Independent GY', u'Crosby LB', u'Centennial KH', u'Juan Diego Catholic BL', u'Johns Creek BT', u'Harker SM', u'Crenshaw HJ', u'Tigard HP', u'Kinkaid BY', u'Notre Dame Pi', u'Johns Creek SX', u'New Trier WO', u'Cypress Bay PV', u'Damien ML', u'College Prep WJ', u'Juan Diego Catholic CA', u'Coppell Sa', u'Dallas Jesuit TW', u'St. Vincent de Paul CD', u'Leland SF', u'Whitney Young DS', u'Glenbrook North MT', u'West PB']
neg = [u'Notre Dame LP', u'Head Royce TP', u'Bellarmine CP PP', u'Chicago Lab Schools NY', u'Barstow RS', u'Harker SC', u'Desert Vista ZR', u'Damien Au', u"St George's MR", u'Interlake HJ', u'South Eugene BK', u'New Trier TG', u'Bellarmine CP MD', u'Chicago Lab Schools BL', u'Bay Area Urban Debate League GV', u'Cherry Creek BR', u'Green Valley Gi', u'Glenbrook North DK', u"St. Mark's School of Texas MJ", u'James Logan CB', u'Rowland Hall NL', u'Kent Denver BJ', u'Arcadia CW', u'Timberline FJ', u'GPS AS', u'Lynbrook KL', u"St. Mark's School of Texas AS", u'Taylor BK', u'California Academy of Forensics CH', u'CK McClatchy HB', u'Lowell CC', u'Johns Creek DV', u'Loyola NG', u'C.E. Byrd GN', u'West WH', u'Encinitas Independent SG', u'Bellarmine CP HB', u'Eagle High school CR', u'Saratoga HJ', u'St Francis GuRa', u'Wayzata KM', u'West BP', u'Barstow DN', u'Johns Creek RJ', u'Downtown Magnets AD', u'Pine Crest LM', u'Boise MK', u'Harker SJ', u'Boise DB', u'Leland KD', u'Niles West KP', u'Cherry Creek YL', u'College Prep OT', u'Houston Memorial CM', u'Crenshaw AD', u'Dallas Jesuit PF', u'Bay Area Urban Debate League TC', u'Bellarmine CP NF', u'Lowell BZ', u'Desert Vista MJ', u'New Trier DG', u'Leland AS', u'Green Valley AB', u'Homewood-Flossmoor SL', u'Leland YK', u'Kinkaid RB', u'Chandler SC', u'Bellarmine CP RM', u'Downtown Magnets LS', u'Highland Park TX HS', u'Bellarmine CP DN', u'POLYTECHNIC MH', u'Clovis North MS', u'Oxford PS', u'Bay Area Urban Debate League IT', u'Pine Crest FB', u'Oxford KL', u'Coppell ON', u'Downtown Magnets CZ', u'Leland VV', u'Torrey Pines HS Speech and Debate HN', u'Lake City CM', u'Los Gatos MG', u'South East PR', u'New Trier WP', u'Harker HR', u'Clovis North TP', u'Tigard CS', u'Bellarmine CP PR', u'Nevada Union CH', u'Niles West Mc', u'CK McClatchy GH', u'Rowland Hall WR', u'Heritage Hall NC', u'Capital MW', u'Heritage Hall CC', u'Torrey Pines HS Speech and Debate KH', u'SF Austin EE', u'Wayzata LH', u'Bingham NW', u'Pine Crest GJ', u'Coppell PS', u'Interlake GY', u'GPS CH', u'Rowland Hall SF', u'Head Royce FL', u'Niles West CK', u'Juan Diego Catholic LC', u'Juan Diego Catholic DM', u'Bellarmine CP GM', u'Rowland Hall RU', u'Timberline BR', u'Niles West AB', u'Harker Ka', u'Cypress Bay US', u'Loyola DW', u'Vashon ZS', u'Denver School of the Arts FF', u'Niles West CH']
judges = [u'Haselton  Jared', u'Idriss  Richard', u'McIntosh  Val', u'Golsch  Andrew', u'Brown  Scott', u'Peterson  Sheila', u'Cottrell  Cade', u'Schultz  Ben', u'Garrett  Stephanie', u'Copenhaver  Roger', u'Tinker  Andrew', u'Bontha  Nikhil', u'Jones  Cameron', u'Washington  Andre', u'Chien  Gene', u'Ades  Alex', u'Parker  Em', u'Tsai  Christine', u'Grigsby  Gerard', u'Sussman  Jon', u'Goldberg  Stephen', u'Beane  Eric', u'Sander  Steven', u'Phillips  Scott', u'Hammond  Jeremy', u'Gokcebay  Nicole', u'Beier  Ian', u'Bugrov  Maksim', u'Auro  Jason', u'Hanson  Brock', u'Bieytes  Andrea', u'Carswell  Matt', u'Buntin  Jeff', u'Roark  Collin', u'Clevenger  CJ', u'Sabransky  Will', u'Salathe  Tyler', u'Madrid  Alyssa', u'Hernandez  Mark', u"Preston  De'Ray", u'Hodgeman  Thomas', u'Coates-Welsh  Rufus', u'Givan  Elsa', u'Malone  Iris', u'Olson  Gabe', u'Wren  Ian', u'Fernandes  Christopher', u'Trafton  Jordan', u'He  Oliver', u'Pramanik  Abhik', u'Lind  Brett', u'Hampton-bruce  William', u'Whisenhunt  Toby', u'Perez  Vito', u'Phillips  Les', u'Grellinger  Adam', u'Smelko  Bill', u'Toledo  Jorge', u'Filpi  Matt', u'Leader  Paul', u'Hall  Nate', u'Oddo  Eric', u'Palacios  Christian', u'Robinson  David', u'Whitson  Matthias (Robert)', u'Pease  Adam', u'Farris  Sean', u'Garrett  Ross', u'Dennis  Logan', u'Campbell  Melanie', u'Advani  Sunny', u'Sur  Debnil', u'Saavedra  Elisa', u'Ziering  Jake', u'Thiele  Chris', u'Hirshman  Jason', u'Duffy  Cat', u'Baxter-Kauf  Mike', u'Randall  Chris', u'Kelinsky  Edward', u'Laverty  Kenneth', u'Fitz  Carl', u'Fletcher  Nickolas', u'Williamson  Jon', u'Kurtenbach  Michael', u'Blackmon  Seth', u'Pittman  Tres', u'Mahoney  Tim', u'mckinney  claire', u'Shackelford  Mike', u'Gannon  Pablo', u'Clawson  Hailey', u'Freeman  Jim', u'Patel  Nisarg', u'Hopkins  Sharon', u'Courville  Jason', u'Blais  Ryan', u'Kilpatrick  David', u'Youngwerth  Drew', u'Flores  Joseph', u'Bancroft  Kevin', u'Woodhead  Tom', u'Bordley  Brian', u'Gaither  Kinsee', u'Priyadarshini  Manisha', u'Rubaie  Brian', u'Chowdhury  Amrut', u'Newton  Jordon', u'Thach  Lee', u'Garcia  Brandon', u'Kennedy  Sean', u'Harbauer  Zach', u'Vishwanath  Ajay', u'Spiegel  Jeremy', u'Hoth  Andrew', u'Moczulski  Leah', u'Frazer  Lani', u'Pointer  Steve', u'Warren  Hayden']



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
            judge.append(text[i] + " " + text[i+1])
            i += 2
        else:
            i += 1
    return aff, neg, judge


def get_team_list(url):
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
    print zip(aff, neg, judge)