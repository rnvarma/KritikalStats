
function create_entry(team_data) {
  var team_row = document.createElement("tr");
  team_row.className = "entry_row entry-row-" + team_data["team_id"].toString();
  team_row.setAttribute("data-id", team_data["team_id"].toString());
  var code_td = document.createElement("td");
  var team_code = document.createTextNode(team_data["team_code"]);
  code_td.appendChild(team_code);

  var name_td = document.createElement("td");
  name_td.className = "hidden-sm hidden-xs";
  var team_name = document.createTextNode(team_data["team_name"]);
  name_td.appendChild(team_name);

  var winp_td = document.createElement("td");
  var team_winp = document.createTextNode(team_data["win_percent"].toString() + "%");
  winp_td.appendChild(team_winp);

  var bids_td = document.createElement("td");
  var team_bids = document.createTextNode(team_data["bids"].length.toString());
  bids_td.appendChild(team_bids);

  team_row.appendChild(code_td);
  team_row.appendChild(name_td);
  team_row.appendChild(winp_td);
  team_row.appendChild(bids_td);

  return team_row;
}

function load_click_handlers(entries_data) {
  $(".entries-header").click(function () {
    $(".entries-header").not(this).removeClass("forward").removeClass("backward").addClass("unsorted");
    if ($(this).hasClass("forward")) {
      var order = "backward";
      $(this).removeClass("forward").addClass("backward");
    } else {
      var order = "forward";
      $(this).removeClass("backward").addClass("forward");
    } 
    var sort_by = $(this).attr("data-type");
    var rows = [];
    for (var i = 0; i < entries_data.length; i ++) {
      var row = {}
      var team = entries_data[i];
      row["data"] = team[sort_by];
      row["row-class"] = ".entry-row-" + team["team_id"].toString();
      rows.push(row);
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
      console.log(obj);
      $(obj["row-class"]).appendTo($(".entries_table"));
    }
  })
}

function load_entries_into_table(entries_data) {
  var table = document.getElementsByClassName("entries_table")[0];
  for (var i = 0; i < entries_data.length; i ++) {
  	var entry = create_entry(entries_data[i]);
  	table.appendChild(entry);
  }

  $(".entry_row").click(function () {
  	var id = $(this).attr("data-id");
  	var url = kritstats.urls.base + "team/" + id;
  	window.location.href = url;
  })
}

$(document).ready(function() {
  var tourn_name = $(".entries_hidden").attr("data-tournament")

  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/tournament/" + tourn_name + '/entries/',
    contentType: 'application/json',
    success: function (data) {
      load_entries_into_table(data);
      load_click_handlers(data);
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in roundQuery');
    },
    async: true
  });
})
