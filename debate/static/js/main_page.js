
function assign_records() {
  $(".team-row").each(function() {
  	console.log($(this).attr("id"));
  	var wins = $(this).attr("data-wins");
  	var losses = $(this).attr("data-losses");
  	var record = wins + " - " + losses;
  	var t_id = $(this).attr("id");
  	var record_cls = ".wl-td-" + t_id;
  	$(record_cls).text(record);
  })
}

function populate_round(t_name, round_data) {
  var aff_tr = document.getElementsByClassName("team-row-" + round_data.aff_id)[0];
  var neg_tr = document.getElementsByClassName("team-row-" + round_data.neg_id)[0];

  var aff_td = document.createElement("td");
  aff_td.id = round_data.round_id;
  var aff_opp = document.createTextNode(round_data.neg_code);
  aff_td.appendChild(aff_opp);
  aff_tr.appendChild(aff_td);

  var neg_td = document.createElement("td");
  neg_td.id = round_data.round_id;
  var neg_opp = document.createTextNode(round_data.aff_code);
  neg_td.appendChild(neg_opp);
  neg_tr.appendChild(neg_td);

  if (round_data.winner == round_data.aff_id) {
  	aff_td.className = "mainpage-round round-won bg-success";
  	neg_td.className = "mainpage-round round-loss bg-danger";
  	var a_wins = (Number(aff_tr.getAttribute("data-wins")) + 1).toString();
  	aff_tr.setAttribute("data-wins", a_wins);
  	var n_losses = (Number(neg_tr.getAttribute("data-losses")) + 1).toString();
  	neg_tr.setAttribute("data-losses", n_losses);
  } else {
  	neg_td.className = "mainpage-round round-won bg-success";
  	aff_td.className = "mainpage-round round-loss bg-danger";
  	var n_wins = (Number(neg_tr.getAttribute("data-wins")) + 1).toString();
  	neg_tr.setAttribute("data-wins", n_wins);
  	var a_losses = (Number(aff_tr.getAttribute("data-losses")) + 1).toString();
  	aff_tr.setAttribute("data-losses", a_losses);
  }
}

function get_rounds(t_name) {
  $.ajax({
      type: 'GET',
      url: location.protocol + "//" + location.hostname + ":8000/1/tournament/" + t_name + '/round/',
      contentType: 'application/json',
      success: function (data) {
        for (var i = 0; i < data.rounds.length; i++) {
          populate_round(t_name, data.rounds[i]);
        }
        $(".mainpage-round").click(function () {
          var id = $(this).attr("id");
          var url = location.protocol + "//" + location.hostname + ":8000/round/" + id;
          window.location.href = url;
        })
        assign_records();
      },
      error: function(a , b, c){
        console.log('There is an error in quering for ' + tournament + ' in roundQuery');
      },
      async: true
  });
}

function populate_entry_column(t_name, entry_data) { 
  var table = document.getElementsByClassName("main_page_table")[0]
  for (var i = 0; i < entry_data.length; i ++) {
  	var team = entry_data[i];
    var tr = document.createElement("tr");
    tr.className = "team-row team-row-" + team.team_id.toString();
    tr.setAttribute("data-wins", "0");
    tr.setAttribute("data-losses", "0");
    tr.id = team.team_id.toString()

    var team_td = document.createElement("td");
    var team_code = document.createTextNode(team.team_code);
    team_td.className = "team-code";
    team_td.id = team.team_id.toString();
    team_td.appendChild(team_code);
    tr.appendChild(team_td);

    var wl_td = document.createElement("td");
    wl_td.className = "wl-td-" + team.team_id.toString();
    tr.appendChild(wl_td);
    table.appendChild(tr);
  }

  $(".team-code").click(function () {
  	var id = $(this).attr("id");
  	var url = location.protocol + "//" + location.hostname + ":8000/team/" + id;
  	window.location.href = url;
  })
}

function main_page_populate_helper(t_name, prelim) {
  var table_header = document.getElementsByClassName("main_table_header")[0];
  for (var i = 0; i < prelim; i ++) {
    var round_head = document.createElement("th");
    var round_text = document.createTextNode("Round " + (i + 1).toString());
    round_head.appendChild(round_text);
    table_header.appendChild(round_head);
  }

  $.ajax({
    type: 'GET',
    url: location.protocol + "//" + location.hostname + ":8000/1/tournament/" + t_name + '/entries/',
    contentType: 'application/json',
    success: function (data) {
      populate_entry_column(t_name, data);
      get_rounds(t_name);
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in mainPagePopulateHelper');
    },
    async: true
  });
}

$(document).ready(function () {
  var t_name = $("#tournament_hidden").attr("data-tournament");
  $.ajax({
    type: 'GET',
    url: location.protocol + "//" + location.hostname + ":8000/1/tournament/",
    contentType: 'application/json',
    success: function (data) {
      var prelim;
      for (i=0;i<data.length;i++){
        if (data[i].tournament_name == t_name){
          prelim = data[i].prelims
        }
      }
  	  main_page_populate_helper(t_name, prelim)

    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in mainPagePopulate');
    },
    async: true
  });
})