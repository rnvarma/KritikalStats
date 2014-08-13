import csv
from api.database import enter_individual_elim_round

def readBase(inputFile):
    file1= open(inputFile, 'rU')
    fileMain= csv.reader(file1)
    file2= open(inputFile, 'rU')
    file22= csv.reader(file2)
    rowCount = sum(1 for row in file22)
    file2.close()
    
    
    headers= fileMain.next()
    base_list = []
    for j in range (rowCount-1):
        reading_row = fileMain.next()
        dictionary = {}
        for i in range (len(reading_row)):
            dictionary[headers[i]] = reading_row[i]
        base_list.append(dictionary)
    
    count = 0

    for k in range(len(base_list)):
    # for k in range(1):
        filter = 0
        tournament = base_list[k]['Tournament']
        if tournament == '':
            filter = 1
        association = 'UDL'
        round_num = base_list[k]['Round']
        if round_num != 'F' and round_num !='O' and round_num != 'Q' and round_num != 'S':
            filter = 1
        if round_num == 'F':
            round_num = 2
        if round_num == 'O':
            round_num = 16
        if round_num == 'Q':
            round_num = 8
        if round_num == 'S':
            round_num = 4
        aff_code = base_list[k]['Aff Team Code']
        neg_code = base_list[k]['Neg Team Code']
        if not aff_code or not neg_code:
            filter = 1
        judge_name = base_list[k]['Judge']
        if len(judge_name.split()) == 1:
            judge_name += ' x'
        aff_name = base_list[k]['Aff Team Name']
        aff_name = " & ".join(aff_name.split())
        neg_name= base_list[k]['Neg Team Name']
        neg_name = " & ".join(neg_name.split())
        event = base_list[k]['Event Name']
        HS = base_list[k]['Team Level']
        winner = base_list[k]['Winner']
        if event != '2-Person Policy Debate' and event != 'Policy Debate':
            filter = 1

        if HS != 'H.S.':
            filter = 1

        if filter == 0:
            # print HS
            # print tournament,round_num,aff_code,neg_code,judge_name
            count += 1
            # print 'count' , count
            # print 'len(base_list' , len(base_list)
            enter_individual_elim_round(tournament, association,round_num,aff_code,neg_code,judge_name,judge_name, judge_name, winner, aff_name,neg_name, False)


        # this is the dictionary go through it and get the shit

# x = readBase('New_newer_newest_file.csv')
# x = readBase('api/New_newer_newest_file.csv')
