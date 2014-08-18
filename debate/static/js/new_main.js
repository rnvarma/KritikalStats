var prelim_data;
var data_keys = []

// for search 
function contains(original, filter) { 
  var check = original.toLowerCase(); 
  return check.indexOf(filter.toLowerCase()) != -1; 
}

function load_click_handlers(data) {
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
      var keys = Object.keys(data);
      for (var i = 0; i < keys.length; i ++) {
        var row = {}
        var team = data[keys[i]];
        row["data"] = team.code;
        row["row-class"] = ".team-row-" + team.t_id.toString();
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
  $(".main-header[data-type='wl']").trigger("click");

  $(".mainpage-round").click(function () {
    var id = $(this).attr("id");
    var url = kritstats.urls.base + "round/" + id;
    window.location.href = url;
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

function populate_rows(team_data) {
  var prelims = team_data["prelims"];
  var wl_td = document.getElementsByClassName("team-row-" + team_data.t_id)[0];
  for (var i = 0; i < prelims.length; i ++) {
    var round = prelims[i]
    var cls = "r" + round["round_num"] + "-" + team_data.t_id;
    var round_td = document.getElementsByClassName(cls)[0]
    var opponent_code = team_data.t_id != round.aff_id ? round.aff_code : round.neg_code;
    var opp_name = document.createTextNode(opponent_code);

    if (round["winner"] == team_data.t_id) {
      round_td.className += " mainpage-round round-won bg-bright-win";
      var n_wins = (Number(wl_td.getAttribute("data-wins")) + 1).toString();
      wl_td.setAttribute("data-wins", n_wins)
    } else if (round["loser"] == team_data.t_id){
      round_td.className += " mainpage-round round-loss bg-bright-loss";
      var n_losses = (Number(wl_td.getAttribute("data-losses")) + 1).toString();
      wl_td.setAttribute("data-losses", n_losses)
    } else {
      round_td.className += " mainpage-round round-undecided bg-warning";
    }

    round_td.appendChild(opp_name);
    round_td.id = round["round_id"]
  }
}

function populate_rounds(data) {
  var keys = Object.keys(data);
  for (var j = 0; j < keys.length; j ++) {
    var key = keys[j]
    populate_rows(data[key], round_num)
  }
}

function create_row(team, num_rounds) {
  var table = document.getElementsByClassName("main_page_table")[0]
  var tr = document.createElement("tr");
  tr.className = "team-row team-row-" + team.t_id.toString();
  tr.setAttribute("data-wins", "0");
  tr.setAttribute("data-losses", "0");
  tr.id = team.t_id.toString()

  var team_td = document.createElement("td");
  var team_code = document.createTextNode(team.code);
  team_td.className = "team-code";
  team_td.id = team.t_id.toString();
  team_td.appendChild(team_code);
  tr.appendChild(team_td);

  var wl_td = document.createElement("td");
  wl_td.className = "wl-td-" + team.t_id.toString();
  tr.appendChild(wl_td);
  table.appendChild(tr);

  for (var i = 0; i < num_rounds; i ++) {
    var round_td = document.createElement("td");
    round_td.className = "r" + (i + 1).toString() + "-" + team.t_id.toString();
    tr.appendChild(round_td);
  }

  $(".team-code").click(function () {
    var id = $(this).attr("id");
    var url = kritstats.urls.base + "team/" + id;
    window.location.href = url;
  }); 
}

function create_table(data) {
  round_num = data.curr_rounds != 0 ? data.curr_rounds : data.prelims
  var table_header = document.getElementsByClassName("main_table_header")[0];
  for (var i = 0; i < round_num; i ++) {
    var round_head = document.createElement("th");
    round_head.className = "sortable-table-header main-header unsorted";
    round_head.setAttribute("data-round-num", (i + 1).toString());
    var round_text = document.createTextNode("Round " + (i + 1).toString());
    round_head.appendChild(round_text);
    table_header.appendChild(round_head);
  }
  var keys = Object.keys(data.data);
  for (var j = 0; j < keys.length; j ++) {
    var key = keys[j]
    create_row(data.data[key], round_num)
  }
}

function filter_results(query) {
  $(".team-row").hide()
  var matches = []
  for (var i = 0; i < data_keys.length; i ++) {
    if (contains(data_keys[i], query)) {
      var cls = ".team-row-" + prelim_data[data_keys[i]].t_id;
      $(cls).show();
    }
  }
}

function generateMain() { 
  var t_name = $("#tournament_hidden").attr("data-tournament");
  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/tournament/" + t_name + "/prelims/",
    contentType: 'application/json',
    success: function (data) {
      prelim_data = data.data;
      data_keys = Object.keys(data.data);
      create_table(data);
      populate_rounds(data.data);
      assign_records()
      load_click_handlers(data.data);
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in mainPagePopulate');
    },
    async: true
  });
}

$(document).ready(function () {
  var searchInput = document.getElementById("prelims-search-box"); 
  searchInput.oninput = function (event) { filter_results(event.target.value);};
  generateMain(); 
}); 
