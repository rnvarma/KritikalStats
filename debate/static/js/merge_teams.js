
merge_team_index = 0
teams_to_merge = []

function load_click_handlers(team1, team2) {
  $(".next_team_btn").off("click");
  $(".next_team_btn").click(function() {
  	merge_team_index += 1;
  	load_team_to_page();
  })

  $(".team1_button").off("click");
  $(".team1_button").click(function() {
  	merge_team_index += 1;
  	data = {"merge": "yee", "main": team1.team_id, "side": team2.team_id, "execute": true};
  	console.log("merging" + team1.team_code + " with " + team2.team_code);
  	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');
  	$.ajax({
      type: 'POST',
      url: kritstats.urls.similarteams,
      data: data,
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      },
      success: function (data) {
      	console.log(data);
      },
      error: function(a , b, c){
        console.log('There is an error in merging the team');
      },
      async: true
    });
  	load_team_to_page()
  })

  $(".team2_button").off("click");
  $(".team2_button").click(function() {
  	merge_team_index += 1;
  	data = {"merge": "yee", "main": team2.team_id, "side": team1.team_id, "execute":true};
  	console.log("merging" + team2.team_code + " with " + team1.team_code);
  	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');
  	$.ajax({
      type: 'POST',
      url: kritstats.urls.similarteams,
      data: data,
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      },
      success: function (data) {
      	console.log(data);
      },
      error: function(a , b, c){
        console.log('There is an error in merging the team');
      },
      async: true
    });
  	load_team_to_page()
  })
}

function input_tourn_info(team1, team2) {
  var teams = ["team1", "team2"];
  for (var i = 0; i < teams.length; i ++) {
  	var team_type = teams[i];
  	var team = (i == 0) ? team1 : team2
  	var tourns = team.tournaments;
  	var bids = team.bids;
  	console.log(team_type + "_table");
  	var table = document.getElementsByClassName(team_type + "_table")[0];
  	// clear the previous tournaments and such on the table
  	while (table.firstChild) {
  	  table.removeChild(table.firstChild);
  	}
  	// bids is a subset of tourns so we can loop through tournaments safely
  	for (var j = 0; j < tourns.length; j ++) {
  	  var t_name = tourns[j]
  	  var b_name = (j < bids.length) ? bids[j] : "";
  	  var row = document.createElement("tr");
  	  var t_col = document.createElement("td");
  	  var t_div = document.createTextNode(t_name);
  	  t_col.appendChild(t_div);
  	  var b_col = document.createElement("td");
  	  var b_div = document.createTextNode(b_name);
  	  b_col.appendChild(b_div);
  	  row.appendChild(t_col);
  	  row.appendChild(b_col);
  	  table.appendChild(row);
  	}
  }
}

function load_team_to_page() {
  if (merge_team_index == teams_to_merge.length) {
  	$(".merge-display").hide(0);
  	$(".merge-btns").hide(0);
  	$(".merge-complete").show();
  } else {
    teams = teams_to_merge[merge_team_index]
    team1 = teams.team1;
    team2 = teams.team2;
    $(".team1_name").text(team1.team_code);
    $(".team2_name").text(team2.team_code);
    $(".team1_code").text(team1.team_code);
    $(".team1_names").text(team1.team_name);
    $(".team2_code").text(team2.team_code);
    $(".team2_names").text(team2.team_name);
    input_tourn_info(team1, team2);
    $(".team1_button").text("Merge into " + team1.team_code);
    $(".team2_button").text("Merge into " + team2.team_code);
    load_click_handlers(team1, team2);
  }
}

$(document).ready(function () {
  $.ajax({
      type: 'GET',
      url: kritstats.urls.similarteams,
      contentType: 'application/json',
      success: function (data) {
      	teams_to_merge = data
      	load_team_to_page();
      },
      error: function(a , b, c){
        console.log('There is an error in tournamentQuery');
      },
      async: true
    });
})
