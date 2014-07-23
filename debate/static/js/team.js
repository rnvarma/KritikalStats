
function add_table_heads(tourn_table) {
  var header = document.createElement("div");
  header.className = "table_head";

  var num_div = document.createElement("div");
  num_div.className = "round_num";
  num_div.innerText = "Round";
  header.appendChild(num_div);

  var side_div = document.createElement("div");
  side_div.className = "round_side";
  side_div.innerText = "Side";
  header.appendChild(side_div);

  var opponent_div = document.createElement("div");
  opponent_div.className = "opponent_name";
  opponent_div.innerText = "Opponent";
  header.appendChild(opponent_div);

  var decision_div = document.createElement("div");
  decision_div.className = "round_decision";
  decision_div.innerText = "Decision";
  header.appendChild(decision_div);

  tourn_table.appendChild(header);
}

function create_round(round_data, round_type, team_code, tourn_table, last) {
  var round = document.createElement("div");
  round.className = "table_round";
  round.setAttribute("id", round_type);

  var round_num = round_data.round_num.toString();
  var num_div = document.createElement("div");
  num_div.className = "round_num";
  num_div.innerText = round_num;
  round.appendChild(num_div);

  var side = (round_type == "aff_round") ? "AFF" : "NEG";
  var side_div = document.createElement("div");
  side_div.className = "round_side";
  side_div.innerText = side;
  round.appendChild(side_div);

  var opponent = (round_type == "aff_round") ? round_data.neg_code : round_data.aff_code;
  var opponent_div = document.createElement("div");
  opponent_div.className = "opponent_name";
  opponent_div.innerText = opponent;
  round.appendChild(opponent_div);

  if (round_data.winner == "undecided") {
  	decision = "undecided";
  } else {
  	decision = (round_data.winner == team_code) ? "WON" : "LOST";
  }
  var decision_div = document.createElement("div");
  decision_div.className = "round_decision";
  decision_div.innerText = decision;
  round.appendChild(decision_div);

  tourn_table.appendChild(round);

  if (!last) {
    var divider = document.createElement("div");
    divider.className = "round_divider";
    round.appendChild(divider);
  }
}

function load_tournament_rounds(rounds_data, tourn_name, code) {
  var content = document.getElementsByClassName("display")[0];
  var tourn_table = document.createElement("div");
  tourn_table.className = "rounds_table";
  tourn_table.setAttribute("id", tourn_name);
  content.appendChild(tourn_table);

  add_table_heads(tourn_table)

  var aff = rounds_data.aff;
  var neg = rounds_data.neg;
  var sorted = [];
  while (aff.length && neg.length) {
  	if (aff[0].round_num < neg[0].round_num) {
  	  create_round(aff[0], "aff_round", code, tourn_table);
  	  aff.splice(0, 1);
  	} else {
  	  create_round(neg[0], "neg_round", code, tourn_table);
  	  neg.splice(0, 1);
  	}
  }
  var filled_list = aff.length ? aff : neg;
  var round_type = aff.length ? "aff_round" : "neg_round";
  for (var i = 0; i < filled_list.length; i ++){
  	if (i == filled_list.length - 1) {
   	  create_round(filled_list[i], round_type, code, tourn_table, true);
   	} else {
   	  create_round(filled_list[i], round_type, code, tourn_table, false);
   	}
  }
  $(".rounds_table").hide(500);
  $('div[id^="' + tourn_name + '"].rounds_table').show(1000);
}

function load_team_info(team_data, team_id) {
  var name = team_data.team_name;
  var tournaments = team_data.tournaments;
  var bids = team_data.bids;
  var code = team_data.team_code;
  $(".team_code").text(code);
  $(".team_name").text(name);
  var t_list = document.getElementsByClassName("tournament_list")[0];
  for (var i = 0; i < tournaments.length; i++) {
  	var tournament_name = tournaments[i];
  	var tourny = document.createElement("div");
  	tourny.className = "tourn-entered"
  	tourny.innerText = tournament_name;
  	tourny.setAttribute("data-tournname", tournament_name);
  	t_list.appendChild(tourny);
  }
  $(".tourn-entered").click(function() {
  	var tourn_name = $(this).attr("data-tournname");
  	if ($(this).attr("class") == "tourn-entered") {
  	  $(".tourn-entered-clicked").attr("class", "tourn-entered");
  	  $(this).attr("class", "tourn-entered-clicked");
  	  if (!$('div[id^="' + tourn_name + '"].rounds_table')[0]){
        $.ajax({
          type: 'GET',
          url: "http://127.0.0.1:8000/1/team/rounds/" + tourn_name + "/" + team_id,
          contentType: 'application/json',
          success: function (data) {11
            load_tournament_rounds(data, tourn_name, code);
          },
          error: function(a , b, c){
            console.log('There is an error in retrieving team_info');
          },
          async: true
        });
      } else {
        $(".rounds_table").hide(500);
        $('div[id^="' + tourn_name + '"].rounds_table').show(1000);
      };
    };
  });
}



$(document).ready(function() {
  var team_id = $(".team_page").attr("data-teamid");
  $.ajax({
      type: 'GET',
      url: "http://127.0.0.1:8000/1/team/" + team_id,
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