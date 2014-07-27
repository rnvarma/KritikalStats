
function round_num_cmp(obj1, obj2) {
  var val1 = obj1.find(".round_num").text();
  var val2 = obj2.find(".round_num").text();
  var obj1_is_smaller = (Number(val1) <Number(val2)) ? true : false;
  return obj1_is_smaller
}

function remove_nth_element(arr, index) {
  sub_arr1 = arr.slice(0, index);
  sub_arr2 = arr.slice(index + 1, arr.length);
  $.merge(sub_arr1, sub_arr2);
  return sub_arr1
}

function merge(left, right, cmp) {
  if (left.length == 0 || right.length == 0) {
    console.log("got here")
    $.merge(left, right);
    return left;
  } else {
    if (cmp(left.eq(0), right.eq(0))) {
      $.merge(left.slice(0, 1), merge(left.slice(1, left.length), right, cmp));
      return left
    } else {
      $.merge(right.slice(0, 1), merge(left, right.slice(1, right.length), cmp));
      return right
    }
  }
}

function merge_sort_rounds_table(round_list, cmp) {
  if (round_list.length < 2) {
    return round_list;
  } else {
    console.log(round_list);
    mid = Math.floor(round_list.length / 2);
    left = merge_sort_rounds_table(round_list.slice(0, mid), cmp);
    right = merge_sort_rounds_table(round_list.slice(mid, round_list.length), cmp);
    return merge(left, right, cmp);
  }
}

function launch_table_click_handlers(tourn_table, tourn_name) {
  $(".round_num").click(function() {
    console.log("click")
    var rounds_table = $('div[id^="' + tourn_name + '"].rounds_table')
    var round_list = rounds_table.find(".table_round");
    for (var i = 0; i < round_list.length; i ++) {
      round_list[i].remove();
    }
    console.log(merge_sort_rounds_table(round_list, round_num_cmp));
    var order = tourn_table.getAttribute("data-order");
    if (order == "round_num_forward") {
      for (var j = round_list.length - 1; j >= 0; j --) {
        rounds_table.append(round_list[j])
      }
      tourn_table.setAttribute("data-order", "round_num_backward");
    } else {
      for (var j = 0; j < round_list.length; j ++) {
        rounds_table.append(round_list[j])
      }
      tourn_table.setAttribute("data-order", "round_num_forward");
    }
  })
}

function add_table_heads(tourn_table, tourn_name) {
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

  // launch_table_click_handlers(tourn_table, tourn_name)
}

function create_round(round_data, round_type, team_code, tourn_table, last, team_id) {
  var round = document.createElement("div");
  round.className = "table_round";
  round.setAttribute("id", round_type);
  round.setAttribute("data-round_id", round_data.round_id);

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
  	decision = (round_data.winner == team_id) ? "WON" : "LOST";
  }
  var decision_div = document.createElement("div");
  decision_div.className = "round_decision";
  decision_div.innerText = decision;
  round.appendChild(decision_div);

  if (decision == "WON") {
    round.className += " won_round";
  } else if (decision == "LOST") {
    round.className += " lost_round";
  }

  tourn_table.appendChild(round);

  if (!last) {
    var divider = document.createElement("div");
    divider.className = "round_divider";
    round.appendChild(divider);
  }
}

function load_tournament_rounds(rounds_data, tourn_name, code, team_id) {
  var content = document.getElementsByClassName("display")[0];
  var tourn_table = document.createElement("div");
  tourn_table.className = "rounds_table";
  tourn_table.setAttribute("id", tourn_name);
  tourn_table.setAttribute("data-order", "round_num_forward")
  content.appendChild(tourn_table);

  add_table_heads(tourn_table, tourn_name)

  var aff = rounds_data.aff;
  var neg = rounds_data.neg;
  var sorted = [];
  while (aff.length && neg.length) {
  	if (aff[0].round_num < neg[0].round_num) {
  	  create_round(aff[0], "aff_round", code, tourn_table, false, team_id);
  	  aff.splice(0, 1);
  	} else {
  	  create_round(neg[0], "neg_round", code, tourn_table, false, team_id);
  	  neg.splice(0, 1);
  	}
  }
  var filled_list = aff.length ? aff : neg;
  var round_type = aff.length ? "aff_round" : "neg_round";
  for (var i = 0; i < filled_list.length; i ++){
  	if (i == filled_list.length - 1) {
   	  create_round(filled_list[i], round_type, code, tourn_table, true, team_id);
   	} else {
   	  create_round(filled_list[i], round_type, code, tourn_table, false, team_id);
   	}
  }
  $(".rounds_table").hide(500);
  $('div[id^="' + tourn_name + '"].rounds_table').show(1000);

  $(".table_round").click(function() {
    var id = $(this).attr("data-round_id");
    var url = location.protocol + "//" + location.hostname + "/round/" + id
    console.log(url);
    window.location.href = url;
  })
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
          url: location.protocol + "//" + location.hostname + "/1/team/rounds/" + tourn_name + "/" + team_id,
          contentType: 'application/json',
          success: function (data) {11
            load_tournament_rounds(data, tourn_name, code, team_id);
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
      url: location.protocol + "//" + location.hostname + "/1/team/" + team_id,
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
