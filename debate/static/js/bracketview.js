
function createOneRound(rd_type) { 
	var rd = document.createElement("div"); 
	rd.className = rd_type; 
	var label = document.createElement("div"); 
	label.className = "bracket_text";
	var some_label = document.createTextNode("000"); 
	label.appendChild(some_label); 
	rd.appendChild(label); 
	return rd; 
}


function createRounds(column, round_type, rounds_to_make) { 
	column.appendChild(createOneRound(round_type));
}



function generateRoundColumn(column, elim_round) { 
	var rounds_to_create = 0; 
	switch(elim_round) { 
	  case "doubles": 
	    alert("made it"); 
	    rounds_to_create = 32; 
	    break; 
	  case "octos": 
	    rounds_to_create = 16; 
	    break; 
	  case "quarters": 
	    rounds_to_create = 8; 
	    break; 
	  case "semifinals": 
	    rounds_to_create = 4; 
	    break;
	  case "finals": 
	    rounds_to_create = 2; 
	    break;
	  default: 
	    alert("rounds_to_create failed"); 
	    return; 
	  }
	for (var i = 0; i < rounds_to_create; i++) { 
		createRounds(column, elim_round, rounds_to_create); 
	}
}


$(document).ready(function() { 
	var elimRounds = ["doubles", "octos", "quarters", "semifinals", "finals"];
	var columns = document.getElementsByClassName("col"); 
	for (var i = 0; i < columns.length; i ++) { 
		alert("step1");
		generateRoundColumn(columns[i], elimRounds[i]); 
	}
}); 
