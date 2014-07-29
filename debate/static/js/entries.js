
function create_entry(team_data) {
  var team_row = document.createElement("tr");
  team_row.className = "entry_row";
  team_row.setAttribute("data-id", team_data["team_id"].toString());
  var code_td = document.createElement("td");
  var team_code = document.createTextNode(team_data["team_code"]);
  code_td.appendChild(team_code);

  var name_td = document.createElement("td");
  name_td.className = "hidden-sm hidden-xs";
  var team_name = document.createTextNode(team_data["team_name"]);
  name_td.appendChild(team_name);

  var winp_td = document.createElement("td");
  var team_winp = document.createTextNode("0%");
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

function load_entries_into_table(entries_data) {
  var table = document.getElementsByClassName("entries_table")[0];
  for (var i = 0; i < entries_data.length; i ++) {
  	var entry = create_entry(entries_data[i]);
  	table.appendChild(entry);
  }

  $(".entry_row").click(function () {
  	var id = $(this).attr("data-id");
  	var url = location.protocol + "//" + location.hostname + ":8000/team/" + id;
  	window.location.href = url;
  })
}

$(document).ready(function() {
  var tourn_name = $(".entries_hidden").attr("data-tournament")

  $.ajax({
    type: 'GET',
    url: location.protocol + "//" + location.hostname + ":8000/1/tournament/" + tourn_name + '/entries/',
    contentType: 'application/json',
    success: function (data) {
      load_entries_into_table(data);
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in roundQuery');
    },
    async: true
  });
})