
function createOneRound(rd_type, divNum, divHeight) { 
	var rd = document.createElement("div"); 
	if (divNum == 0) { 
		var rest = document.createElement("div"); 
		rd.className = "top_elim_round"; 
		rest.className = rd_type; 
		rd.style.height = (divHeight / 2); 
	} else if (divNum % 2 == 1) { 
		rd.className = rd_type; 
		rd.style.borderRight = "thin solid black"
	} else { 
		rd.className = rd_type; 
	}
	var label = document.createElement("div"); 
	label.className = "bracket_text";
	var some_label = document.createTextNode("000"); 
	label.appendChild(some_label); 
	rd.appendChild(label); 
	return rd; 
}


function createRounds(column, round_type, rounds_to_make, divNum, divHeight) { 
		column.appendChild(createOneRound(round_type, divNum, divHeight));	
}



function generateRoundColumn(column, elim_round) { 
	var rounds_to_create = 0; 
	var height = 0; 
	switch(elim_round) { 
	  case "doubles": 
	    rounds_to_create = 32; 
	    height = 32; 
	    break; 
	  case "octos": 
	    rounds_to_create = 16; 
	    height = 64; 
	    break; 
	  case "quarters": 
	    rounds_to_create = 8; 
	    height = 128; 
	    break; 
	  case "semifinals": 
	    rounds_to_create = 4; 
	    height = 256; 
	    break;
	  case "finals": 
	    rounds_to_create = 2; 
	    height = 512; 
	    break;
	  case "champion": 
	    rounds_to_create = 1; 
	    height = 1024; 
	    break; 
	  default: 
	    return; 
	  }
	for (var i = 0; i < rounds_to_create; i++) { 
			createRounds(column, elim_round, rounds_to_create, i, height); 
	}
}


$(document).ready(function() { 
	var elimRounds = ["doubles", "octos", "quarters", "semifinals", "finals", "champion"];
	var columns = document.getElementsByClassName("col"); 
	for (var i = 0; i < columns.length; i ++) { 
		generateRoundColumn(columns[i], elimRounds[i]); 
	}
}); 
