
function load_click_handlers(entries_data, rounds_data) {
  $(".main-header").click(function() {
    $(".main-header").not(this).removeClass("forward").removeClass("backward").addClass("unsorted");
    if ($(this).hasClass("forward")) {
      var order = "backward";
      $(this).removeClass("forward").addClass("backward");
    } else {
      var order = "forward";
      $(this).removeClass("backward").addClass("forward");
    } 
    var sort_by = $(this).attr("data-type");
    var rows = []
    if (sort_by == "wl") {
      $(".team-row").each(function() {
        var row = {}
        var wins = $(this).attr("data-wins");
        row["data"] = wins;
        row["row-class"] = ".team-row-" + $(this).attr("id").toString();
        rows.push(row);
      })
    } else if (sort_by == "team_code") {
      for (var i = 0; i < entries_data.length; i ++) {
        var row = {}
        var team = entries_data[i];
        row["data"] = team.team_code;
        row["row-class"] = ".team-row-" + team.team_id.toString();
        rows.push(row);
      }
    } else {
      var r_num = $(this).attr("data-round-num");
      $(".team-row").each(function() {
        var row = {}
        var t_id = $(this).attr("id").toString();
        var col = $(this).children(".mainpage-round").get(r_num - 1);
        var win_or_loss = $(col).hasClass("round-won") ? 1 : 0;
        row["data"] = win_or_loss;
        row["row-class"] = ".team-row-" + t_id;
        rows.push(row);
      })
    }
    if (order == "forward") {
      rows.sort(function(a,b) {
        return a.data < b.data ? 1 : -1;
      })
    } else {
      rows.sort(function(a,b) {
        return a.data > b.data ? 1 : -1;
      })
    }
    for (var j = 0; j < rows.length; j++) {
      var obj = rows[j];
      $(obj["row-class"]).appendTo($(".main_page_table"));
    }
  })
}

function assign_records() {
  $(".team-row").each(function() {
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

  if (round_data.neg_code != "BYE") {
    var neg_td = document.createElement("td");
    neg_td.id = round_data.round_id;
    var neg_opp = document.createTextNode(round_data.aff_code);
    neg_td.appendChild(neg_opp);
    neg_tr.appendChild(neg_td);
  }

  if (round_data.winner == round_data.aff_id) {
  	aff_td.className = "mainpage-round round-won bg-bright-win";
  	var a_wins = (Number(aff_tr.getAttribute("data-wins")) + 1).toString();
  	aff_tr.setAttribute("data-wins", a_wins);
    if (round_data.neg_code != "BYE"){
      neg_td.className = "mainpage-round round-loss bg-bright-loss";
  	  var n_losses = (Number(neg_tr.getAttribute("data-losses")) + 1).toString();
  	  neg_tr.setAttribute("data-losses", n_losses);
    }
  } else if (round_data.winner == round_data.neg_id){
  	neg_td.className = "mainpage-round round-won bg-bright-win";
  	aff_td.className = "mainpage-round round-loss bg-bright-loss";
  	var n_wins = (Number(neg_tr.getAttribute("data-wins")) + 1).toString();
  	neg_tr.setAttribute("data-wins", n_wins);
  	var a_losses = (Number(aff_tr.getAttribute("data-losses")) + 1).toString();
  	aff_tr.setAttribute("data-losses", a_losses);
  } else {
    aff_td.className = "mainpage-round round-undecided bg-warning";
    neg_td.className = "mainpage-round round-undecided bg-warning";
  }
}

function get_rounds(t_name, entry_data) {
  $.ajax({
      type: 'GET',
      url: kritstats.urls.base + "1/tournament/" + t_name + '/round/',
      contentType: 'application/json',
      success: function (data) {
        for (var i = 0; i < data.rounds.length; i++) {
          populate_round(t_name, data.rounds[i]);
        }
        $(".mainpage-round").click(function () {
          var id = $(this).attr("id");
          var url = kritstats.urls.base + "round/" + id;
          window.location.href = url;
        })
        assign_records();
        load_click_handlers(entry_data, data.rounds);
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
  	var url = kritstats.urls.base + "team/" + id;
  	window.location.href = url;
  })
}

function main_page_populate_helper(t_name, round_num) {
  var table_header = document.getElementsByClassName("main_table_header")[0];
  for (var i = 0; i < round_num; i ++) {
    var round_head = document.createElement("th");
    round_head.className = "sortable-table-header main-header unsorted";
    round_head.setAttribute("data-round-num", (i + 1).toString());
    var round_text = document.createTextNode("Round " + (i + 1).toString());
    round_head.appendChild(round_text);
    table_header.appendChild(round_head);
  }

  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/tournament/" + t_name + '/entries/',
    contentType: 'application/json',
    success: function (data) {
      populate_entry_column(t_name, data);
      get_rounds(t_name, data);
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
    url: kritstats.urls.tournament_query,
    contentType: 'application/json',
    success: function (data) {
      var prelim;
      for (i=0;i<data.length;i++){
        if (data[i].tournament_name == t_name){
          round_num = data[i].curr_rounds != 0 ? data[i].curr_rounds : data[i].prelims
        }
      }
  	  main_page_populate_helper(t_name, round_num)

    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in mainPagePopulate');
    },
    async: true
  });
})
