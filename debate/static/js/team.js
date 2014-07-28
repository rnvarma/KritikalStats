
function create_tournament_tabs(data) {
  var table = document.getElementsByClassName("tournament_nav")[0];
  var tournaments = data["tournaments"];
  for (var i = 0; i < tournaments.length; i ++ ) {
  	var t_name = tournaments[i];
  	var li = document.createElement("li");
    if (i == 0) {
      li.className = "active";
    }
  	var a = document.createElement("a");
  	var t_text = document.createTextNode(t_name);
  	a.setAttribute("data-toggle", "tab");
  	a.appendChild(t_text);
  	a.href = "#" + t_name;
  	a.className = "tourn-tab-" + t_name;
  	li.appendChild(a);
  	table.appendChild(li);
  }
}

function create_rounds_header(t_name, active) {
  var tab_head = document.createElement("div");
  tab_head.id = "#" + t_name;
  tab_head.className = "tab-pane " + t_name + "-tab";
  if (active) {
  	tab_head.className += " active";
  }

  var tourn_row = document.createElement("div");
  tourn_row.className = "row";
  var tourn_filler = document.createElement("div");
  tourn_filler.className = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
  tourn_row.appendChild(tourn_filler);
  tab_head.appendChild(tourn_row);

  var table = document.createElement("table");
  table.className = "table table-hover general-table " + t_name + "-table";
  tourn_filler.appendChild(table);
  var thead = document.createElement("thead");
  table.appendChild(thead);
  
  var tr = document.createElement("tr");
  var round_th = document.createElement("th");
  var round_text = document.createTextNode("Round");
  round_th.appendChild(round_text);
  tr.appendChild(round_th);
  
  var side_th = document.createElement("th");
  var side_text = document.createTextNode("Side")
  side_th.appendChild(side_text);
  tr.appendChild(side_th);
  
  var opponent_th = document.createElement("th");
  var opponent_text = document.createTextNode("Opponent");
  opponent_th.appendChild(opponent_text);
  tr.appendChild(opponent_th);
  
  var dec_th = document.createElement("th");
  var dec_text = document.createTextNode("Decision");
  dec_th.appendChild(dec_text);
  tr.appendChild(dec_th);
  
  // NOTE TODO: add once judge info is with rounds  
  // var judge_th = document.createElement("th");
  // var judge_text = document.createTextNode("Judge");
  // judge_th.className = "hidden-xs hidden-sm";
  // judge_th.appendChild(judge_text);
  // tr.appendChild(judge_th); 

  thead.appendChild(tr);
  table.appendChild(thead);
  return tab_head;
}

function create_round(round_data, round_type, team_code, last, team_id, tbody) {
  var tr = document.createElement("tr");
  tr.className = "team_tourn_round";
  tr.setAttribute("id", round_type);
  tr.setAttribute("data-round_id", round_data.round_id);

  var round_num = round_data.round_num.toString();
  var num_div = document.createElement("td");
  num_div.className = "round_num";
  num_div.innerText = round_num;
  tr.appendChild(num_div);

  var side = (round_type == "aff_round") ? "AFF" : "NEG";
  var side_div = document.createElement("td");
  side_div.className = "round_side";
  side_div.innerText = side;
  tr.appendChild(side_div);

  var opponent = (round_type == "aff_round") ? round_data.neg_code : round_data.aff_code;
  var opponent_div = document.createElement("td");
  opponent_div.className = "opponent_name";
  opponent_div.innerText = opponent;
  tr.appendChild(opponent_div);

  if (round_data.winner == "undecided") {
    decision = "undecided";
  } else {
    decision = (round_data.winner == team_id) ? "WON" : "LOST";
  }
  var decision_div = document.createElement("td");
  decision_div.className = "round_decision";
  decision_div.innerText = decision;
  tr.appendChild(decision_div);

  if (decision == "WON") {
    tr.className += " won_round bg-success";
  } else if (decision == "LOST") {
    tr.className += " lost_round bg-danger";
  }

  tbody.appendChild(tr);
}

function create_tournament_rounds(rounds_data, code, team_id) {
  var aff = rounds_data.aff;
  var neg = rounds_data.neg;
  var sorted = [];
  console.log(rounds_data.t_name + "-table");
  var table = document.getElementsByClassName(rounds_data.t_name + "-table")[0];
  var tbody = document.createElement("tbody");
  table.appendChild(tbody);
  while (aff.length && neg.length) {
  	if (aff[0].round_num < neg[0].round_num) {
  	  create_round(aff[0], "aff_round", code, false, team_id, tbody);
  	  aff.splice(0, 1);
  	} else {
  	  create_round(neg[0], "neg_round", code, false, team_id, tbody);
  	  neg.splice(0, 1);
  	}
  }
  var filled_list = aff.length ? aff : neg;
  var round_type = aff.length ? "aff_round" : "neg_round";
  for (var i = 0; i < filled_list.length; i ++){
  	if (i == filled_list.length - 1) {
   	  create_round(filled_list[i], round_type, code, true, team_id, tbody);
   	} else {
   	  create_round(filled_list[i], round_type, code, false, team_id, tbody);
   	}
  }
}

function add_tab_content() {
  var panel = document.getElementById("tournaments_panel");
  var panel_body = document.createElement("div");
  panel_body.className = "panel-body";

  var tab_content = document.createElement("div");
  tab_content.className = "tab-content tasi-tab tournament_panel_tab";
  panel_body.appendChild(tab_content);
  panel.appendChild(panel_body);
}

function add_tab_click_handler(t_name) {
  $(".tourn-tab-" + t_name).click(function() {
  	var tab_id = $(this).attr("href");
  	tab_id = "." + tab_id.slice(1, tab_id.length) + "-tab";
  	if (!$(this).hasClass("active")) {
  	  console.log(tab_id);
  	  $(".tab-pane").removeClass("active");
      $(tab_id).addClass("active");
  	}
  })
}

function load_tournament_rounds(data, team_id) {
  var tournaments = data["tournaments"];
  add_tab_content();
  for (var i = 0; i < tournaments.length; i ++) {
  	if (i == 0) {
  	  var active = true;
  	} else {
  	  var active = false;
  	}
  	var t_name = tournaments[i];
  	var tab = document.getElementsByClassName("tournament_panel_tab")[0];
  	var header = create_rounds_header(t_name, active);
    tab.appendChild(header);
    add_tab_click_handler(t_name);
  	var url = location.protocol + "//" + location.hostname + ":8000/1/team/rounds/" + t_name + "/" + team_id;
  	console.log(url);
    $.ajax({
      type: 'GET',
      url: url,
      contentType: 'application/json',
      success: function (rounds_data) {
        create_tournament_rounds(rounds_data, data["team_code"], team_id);
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving team_info');
      },
      async: true
    });
  }
}

function load_tournaments(data, team_id) {
  create_tournament_tabs(data);
  load_tournament_rounds(data, team_id);
}

function load_team_info(data, team_id) {
  $(".team_code").text(data["team_code"]);
  $(".team_name").text(data["team_name"]);
  $(".bid_count").text(data["bids"].length.toString());
  $(".tournament_count").text(data["tournaments"].length.toString());
  load_tournaments(data, team_id);
}

$(document).ready(function () {
  var team_id = $(".team_id_hidden").attr("data-id");
  $.ajax({
      type: 'GET',
      url: location.protocol + "//" + location.hostname + ":8000/1/team/" + team_id,
      contentType: 'application/json',
      success: function (data) {
        load_team_info(data, team_id);
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving team_info');
      },
      async: true
  });
})