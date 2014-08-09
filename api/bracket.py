""" BracketList.py """ 


class BracketList: 
	bracket_seed_view = """
	                   DOUBLES     OCTOS     QUARTERS    SEMS     FINALS    THE CHAMPION

	                  ___ 1 ____
	                            |___ 1 ____ 
	                  ___ 32 ___|          |
	                                       |___ 1 ___
	                  ___ 16 ____          |         |
	                            |___ 16 ___|         |
	                  ___ 17 ___|                    |
	                                                 |___ 1 ___
	                  ___ 8 ____                     |         |
	                            |___ 8 ____          |         |
	                  ___ 25 ___|          |         |         |
	                                       |___ 8 ___|         |
	                  ___ 9 ____           |                   |
	                            |___ 9  ___|                   |
	                  ___ 24 ___|                              |
	                                                           |___ 1 ___
	                  ___ 4 ____                               |         |
	                            |___ 4 ____                    |         |
	                  ___ 29 ___|          |                   |         |
	                                       |___ 4 ___          |         |
	                  ___ 13 ____          |         |         |         |
	                            |___ 13 ___|         |         |         |
	                  ___ 20 ___|                    |         |         |
	                                                 |___ 4 ___|         |
	                  ___ 5 ____                     |                   |
	                            |___ 5 ____          |                   |
	                  ___ 28 ___|          |         |                   |
	                                       |___ 5 ___|                   |
	                  ___ 12 ___           |                             |
	                            |___ 12 ___|                             |
	                  ___ 21 ___|                                        |
	                                                                     |___ 1 ___ CHAMPION
	                                                                     |
	                  ___ 2 ____                                         |
	                            |___ 2 ____                              |
	                  ___ 31 ___|          |                             |
	                                       |___ 2 ___                    |
	                  ___ 15 ___           |         |                   |
	                            |___ 15 ___|         |                   |
	                  ___ 18 ___|                    |                   |
	                                                 |___ 2 ___          |
	                  ___ 7 ____                     |         |         |
	                            |___ 7 ____          |         |         |
	                  ___ 26 ___|          |         |         |         |
	                                       |___ 7 ___|         |         |
	                  ___ 10 ___           |                   |         |
	                            |___ 10 ___|                   |         |
	                  ___ 23 ___|                              |         |
	                                                           |___ 2 ___|
	                  ___ 3 ____                               |
	                            |___ 3 ____                    |
	                  ___ 30 ___|          |                   |
	                                       |___ 3 ___          |
	                  ___ 14 ___           |         |         |
	                            |___ 14 ___|         |         |
	                  ___ 19 ___|                    |         |
	                                                 |___ 3 ___|
	                  ___ 6 ____                     |
	                            |___ 6 ____          |
	                  ___ 27 ___|          |         |
	                                       |___ 6 ___|
	                  ___ 11 ___           |
	                            |___ 11 ___|
	                  ___ 22 ___|                

	               """


	bracket_storage_view  = """
	                   DOUBLES       OCTOS     QUARTERS      SEMS      FINALS     CHAMPION

	                  ___ 32  ___
	                             |___ 16  ___ 
	                  ___ 33  ___|           |
	                                         |___ 8   ___
	                  ___ 34  ___            |           |
	                             |___ 17  ___|           |
	                  ___ 35  ___|                       |
	                                                     |___ 4  ___
	                  ___ 36  ___                        |          |
	                             |___ 18  ___            |          |
	                  ___ 37  ___|           |           |          |
	                                         |___ 9   ___|          |
	                  ___ 38  ___            |                      |
	                             |___ 19  ___|                      |
	                  ___ 39  ___|                                  |
	                                                                |___ 2  ___
	                  ___ 40  ___                                   |          |
	                             |___ 20  ___                       |          |
	                  ___ 41  ___|           |                      |          |
	                                         |___ 10  ___           |          |
	                  ___ 42  ___            |           |          |          | 
	                             |___ 21  ___|           |          |          |
	                  ___ 43  ___|                       |          |          |
	                                                     |___ 5  ___|          |
	                  ___ 44  ___                        |                     |
	                             |___ 22  ___            |                     |
	                  ___ 45  ___|           |           |                     |
	                                         |___ 11  ___|                     |
	                  ___ 46  ___            |                                 |
	                             |___ 23  ___|                                 |
	                  ___ 47  ___|                                             |
	                                                                           |___ 1  ___ CHAMPION
	                                                                           |
	                  ___ 48  ___                                              |
	                             |___ 24  ___                                  |
	                  ___ 49  ___|           |                                 |
	                                         |___ 12  ___                      |
	                  ___ 50  ___            |           |                     |
	                             |___ 25  ___|           |                     |
	                  ___ 51  ___|                       |                     |
	                                                     |___ 6  ___           |
	                  ___ 52  ___                        |          |          |
	                             |___ 26  ___            |          |          |
	                  ___ 53  ___|           |           |          |          |
	                                         |___ 13  ___|          |          |
	                  ___ 54  ___            |                      |          |
	                             |___ 27  ___|                      |          |
	                  ___ 55  ___|                                  |          |
	                                                                |___ 3  ___|
	                  ___ 56  ___                                   |
	                             |___ 28  ___                       |
	                  ___ 57  ___|           |                      |
	                                         |___ 14  ___           |
	                  ___ 58  ___            |           |          |
	                             |___ 29  ___|           |          |
	                  ___ 59  ___|                       |          |
	                                                     |___ 7  ___|
	                  ___ 60  ___                        |
	                             |___ 30  ___            |
	                  ___ 61  ___|           |           |
	                                         |___ 15  ___|
	                  ___ 62  ___            |
	                             |___ 31  ___|
	                  ___ 63  ___|                


* Indicates a valid team/seed
	               """


	bracket_dictionary = { 
		1:  32, 
		32: 33, 
		16: 34, 
		17: 35, 
		8:  36, 
		25: 37, 
		9:  38,
		24: 39, 
		4:  40, 
		29: 41,
		13: 42,
		20: 43,  
		5:  44, 
		28: 45, 
		12: 46, 
		21: 47, 
		2:  48, 
		31: 49, 
		15: 50, 
		18: 51, 
		7:  52, 
		26: 53, 
		10: 54, 
		23: 55, 
		3:  56, 
		30: 57, 
		14: 58, 
		19: 59, 
		6:  60, 
		27: 61, 
		11: 62, 
		22: 63 
		}


	def __init__(self, cleared_teams): 
		self.seed_array = range(1, cleared_teams + 1)
		self.tournament_array = self.bracketArray(cleared_teams) 
		self.processBracket()



	def generateBracketView(self, tournament_bracket): 
		new_bracket_view = BracketList.bracket_storage_view
		for i in range(0, 64):
			if (tournament_bracket[i] < 10 and i >= 10):
				find = " " + str(i)
				repl = "*" + str(tournament_bracket[i]) + " " 
			elif (tournament_bracket[i] >= 10 and i < 10): 
				find = " " + str(i) + " " 
				repl = "*" + str(tournament_bracket[i])
			elif (tournament_bracket[i] == 'XX' and i < 10): 
				find = " " + str(i) + " " 
				repl = " " + str(tournament_bracket[i])
			else: 
				find = " " + str(i) + " "
				if (tournament_bracket[i] != 'XX' and tournament_bracket[i] != 0): 
					repl = "*" + str(tournament_bracket[i]) + " "
				else: 
					repl = " " + str(tournament_bracket[i]) + " "
			new_bracket_view = new_bracket_view.replace(find, repl)
		return new_bracket_view



	def bracketArray(self, bracket_size): 
		tournament_bracket_array = [0] * 64
		limit = len(self.seed_array)
		for i in range(0, 32): 
			if (i >= limit): 
				tournament_bracket_array[self.bracket_dictionary[i + 1]] = 'XX'
			else:
				tournament_bracket_array[self.bracket_dictionary[self.seed_array[i]]] = self.seed_array[i]; 
		return tournament_bracket_array


	def processBracket(self, depth=64): 
		bye_v_bye = False
		for i in range(1, depth): 
			if (self.tournament_array[i] != 'XX' and self.tournament_array[i] > 32): 
				print self.tournament_array[i]
				print "ERROR: attempted Bracket has issues"
				return []
			if (self.tournament_array[i] == 'XX' and (i % 2 == 1)): 
				self.processByeWin(i)
			if (self.tournament_array[i] == 'XX' and (i % 2 == 0)): 
				self.processByeWin(i) 
				bye_v_bye = True
		if (bye_v_bye): 
			if (depth <= 1): 
				return
			else: 
				self.processBracket(depth/2)
		return 


	def processByeWin(self, bye_pos): 
		if (bye_pos % 2 == 1):
			self.tournament_array[int((bye_pos - 1) / 2)] = self.tournament_array[bye_pos - 1]
		else: 
			self.tournament_array[int(bye_pos / 2)] = self.tournament_array[bye_pos]


	def processValidWin(self, team): 
		bracket_position = self.findTeam(team)
		if (bracket_position > 63): 
			print("ERROR: Find has an issue") 
			return 
		if (self.tournament_array[bracket_position] == 'XX'): 
			print("ERROR: Call processByeWin")
			return
		if bracket_position % 2 == 1: 
			self.tournament_array[int((bracket_position - 1) / 2)] = self.tournament_array[bracket_position]
		else: 
			self.tournament_array[int(bracket_position / 2)] = self.tournament_array[bracket_position] 
		return


	def teamDistance(self, team): 
		bracket_position = self.findTeam(team)
		if bracket_position == 1: 
			return "TOURNAMENT CHAMPION" 
		elif bracket_position < 4: 
			return "FINALS" 
		elif bracket_position < 8: 
			return "SEMIFINALS" 
		elif bracket_position < 16: 
			return "QUARTERFINALS" 
		elif bracket_position < 32: 
			return "OCTOFINALS" 
		elif bracket_position < 64: 
			return "DOUBLE OCTOFINALS" 
		else: 
			return "Not in Tournament Bracket"


	def findTeam(self, team): 
		i = 0; 
		while i < 64 and self.tournament_array[i] != team: 
			i += 1		
		if i == 64: 
			print("Team does not exist, or findTeam isn't working")
			return ""
		return i 


""" Testing """ 

# test = BracketList(8)
# test.tournament_array









