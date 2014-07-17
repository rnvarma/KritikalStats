import urllib2, json
from bs4 import BeautifulSoup

URL = "https://www.tabroom.com/index/tourn/fields.mhtml?tourn_id=2275&event_id=22000"
SCHOOLS = [u'Abernathy', u'ACORN Community', u'Agape Leaders Prep', u'Airline', u'Alpharetta', u'Alpine', u'Alta', u'Anderson', u'Appleton East', u'Appleton', u'Arcadia', u'Ashland', u'Athens', u'Atholton', u'Austin SFA', u'Ballard', u'Baltimore City College', u'Barbers Hill', u'Barstow', u'Bellarmine', u'Bentonville', u'Berkeley Prep', u'Berkner High School', u'Bexley', u'Bingham', u'Bishop Guertin', u'Bishop Loughlin', u'Blake', u'Bloomington', u'Blue Valley North', u'Blue Valley Northwest', u'Blue Valley Southwest', u'Blue Valley West', u'Briar Woods', u'Broad Run', u'Bronx Law', u'Bronx Science', u'Brooklyn Technical', u'Brophy College Prep', u'Brown', u'Buhler', u'Byron Nelson', u'C.E. Byrd', u'Caddo Magnet', u'Cairo', u'Calhoun', u'Cambridge', u'Cambridge Rindge', u'Campus', u'Canyon Springs', u'Capitol Debate', u'Carrollton', u'Carrollton Sacred Heart', u'Casady', u'Cascia Hall', u'Cathedral Prep', u'Cedar Rapids Wash.', u'Cedar Ridge', u'Centennial', u'Centennial', u'Chamblee Charter', u'Chaminade Prep', u'Chandler', u'Charles Page', u'Charlotte Catholic', u'Chattahoochee', u'Chesterton', u'CK McClatchy', u'Clackamas', u'Claremont', u'Classical Davies', u'Clear Lake', u'Clifton', u'Clovis North', u'College Prep', u'Colleyville Heritage', u'Coppell', u'Copper Hills', u'Corona Del Sol', u'Coronado', u'Crenshaw', u'Crosby', u'Crossings Christian', u'Cypress Bay', u'Damien', u'Debate Rhode Island', u'Denver Arts', u"Denver Center For Int'l Studies", u'Denver East', u'Derby', u'Des Moines Roosevelt', u'Desert Vista', u'Detroit Country Day', u'Dexter', u'Dominion', u'Dougherty Valley', u'Dowling Catholic', u'Downtown Magnets', u'Dunwoody', u'Eagan', u'Eagle', u'East Chapel Hill', u'East Kentwood', u'East Side HS', u'Eden Prairie', u'Edgemont', u'Edina', u'Edmond North', u'Edmond Santa Fe', u'El Cerrito', u'Evanston', u'Fayetteville', u'Field Kindley', u'Fort Lauderdale', u'Fort Osage', u'Fremont', u'Friendswood', u'Gabrielino', u'George Washington', u'Georgetown Day', u'Glenbrook North', u'Glenbrook South', u'Gonzaga Prep', u'Grapevine', u'Green Valley', u'Greenhill', u'Greenwood', u'Greenwood Lab', u'Groves', u'Gulliver Prep', u'Guymon', u'Hallsville', u'Hamilton', u'Hamilton', u'Harker', u'Harrisonburg', u'Head Royce', u'Hebron', u'Hendrickson', u'Henry W. Grady', u'Heritage Hall', u'Highland', u'Highland Park', u'Highland Park', u'Homestead', u'Homewood Flossmoor', u"Houston Academy for Int'l Studies", u'Houston County', u'Houston Memorial', u'Hutchinson', u'Ingraham', u'Interlake', u'Iowa City High', u'Iowa City West', u'Isidore Newman', u'James Logan', u'Jenks', u'Jesuit Dallas', u'Johns Creek', u'JSEC LaSalle', u'Juan Diego', u'Kapaun Mount Carmel', u'Katy Taylor', u'Kent Denver', u'Kingfisher', u'Kinkaid', u'Kudos College', u'La Costa Canyon', u'La Salle College', u'Lafayette High School', u'Lake City', u'Lake Oswego', u'Lakeland', u'Law Magnet', u"Lee's Summit West", u'Leland', u'Leucadia Independent', u'Lexington', u'Liberal Arts & Science Academy', u'Lincoln College', u'Lincoln HS', u'Lindale', u'Lindblom Math&Science', u'Little Rock Central', u'Little Rock Hall', u'Lowell', u'Loyola', u'Lynbrook', u'Maine East', u'Maize South', u'Marist', u'Marquette', u'Marriotts Ridge', u'Marshfield', u'MLK Jr Early College', u'McClintock', u'McDonogh', u'McDowell', u'Meadows', u'Midway', u'Millard North', u'Millard South', u'Millard West', u'Milton', u'Minneapolis South', u'Monsignor Kelly', u'Montgomery Bell', u'Moore', u'Mount Vernon Presbyterian', u'Mountain Brook', u'Mt Hebron', u'National Cathedral', u'Nevada Union', u'New Mission Boston Community Leadership', u'New Trier', u'Newark Science', u'Newburgh Free Academy', u'Niles North', u'Niles West', u'Norfolk', u'North Houston', u'Northside', u'Northview', u'Northwood', u'Notre Dame', u'Oakwood', u'Olathe Northwest', u'Omaha Westside', u'Pace Academy', u'Paideia', u'Palos Verdes', u'Park Hill', u'Parkway West', u'Peak to Peak', u'Pembroke Hill', u'Peninsula', u'Perry High school', u'Pine Crest', u'Pittsburgh Central', u'Plano East', u'Polytechnic', u'Portage Northern', u'Puget Sound Community', u'Puyallup', u'Ransom Everglades', u'Reagan', u'Redmond', u'Reservoir', u'Richardson', u'River Hill', u'Rogers Heritage', u'Rosemount', u'Roseville', u'Roswell', u'Round Rock', u'Rowland Hall', u'Rufus King', u'Sage Ridge', u'Saginaw', u"Saint Mary's Hall", u'Salpointe Catholic', u'San Dieguito Academy', u'San Marino', u'Saratoga', u'Seaholm', u'Shawnee Mission East', u'Shawnee Mission South', u'Sheboygan North', u'Sioux Falls Roosevelt', u'Sioux Falls Washington', u'Skiatook', u'Skyview', u'Small Schools Debate Coalition', u'South East', u'SPASH', u'St Francis', u'St Georges', u'St Ignatius', u'St James', u'St Johns College', u'St Marks', u'St Marys Hall', u'St Paul Central', u'St Paul Como Park', u'St Petersburg', u'St Vincent de Paul', u'Stern MASS', u'Stratford', u'Strath Haven', u'Stuyvesant', u'Sunset', u'Taravella', u'Thomas Jefferson', u'Thorndale', u'Timberline', u'Torrey Pines', u'Traverse City Central', u'Trinity Valley', u'Tualatin', u'Tulsa', u'Tulsa Union', u'University', u'University', u'University', u'U. Chicago Lab', u'University Prep', u'Vashon High School', u'Veritas Prep.', u'Wakeland', u'Walter Payton', u'Washburn', u'Washburn Rural', u'Washington Technology Magnet', u'Wayzata', u'West', u'West Bloomfield', u'West Des Moines Valley', u'Westinghouse', u'Westlake', u'Weston', u'Westminster Schools', u'Westwood', u'Wheeler', u'Whitney Young', u'Wichita East', u'Wilson', u'Winston Churchill', u'Woodward Academy', u'Wooster']

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