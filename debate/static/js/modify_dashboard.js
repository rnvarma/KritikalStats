
function calculate_elim_round(round_num) {
  switch(round_num) { 
    case 32: 
      return "Doubles"; 
    case 16: 
      return "Octos"; 
    case 8: 
      return "Quarters"; 
    case 4: 
      return "Sems"; 
    case 2: 
      return "Finals"; 
    default: 
      return "FAIL"; 
  } 
}

function add_rounds_buttons(t_data, r_left) {
  var table = document.getElementsByClassName("round-enter-table")[0];
  var num_prelims = t_data.prelims;
  for (var i = 1; i < num_prelims + 1; i ++) {
    var url = kritstats.urls.base + "admin/" + t_data.tournament_name + "/round/" + i.toString();
    var tr = document.createElement("tr");
    tr.className = "admin-round-row";
    tr.setAttribute("data-url", url);
    var round_td = document.createElement("td");
    var round_text = document.createTextNode("Round " + i.toString());
    round_td.appendChild(round_text);

    var r_left_td = document.createElement("td");
    var r_left_text = document.createTextNode(r_left["round " + i.toString()].toString());
    r_left_td.appendChild(r_left_text);

    tr.appendChild(round_td);
    tr.appendChild(r_left_td);
    table.appendChild(tr);
  }

  $(".admin-round-row").click(function () {
    window.location.href = $(this).attr("data-url");
  })
}

function add_elim_rounds_buttons(t_data, r_left) {
  console.log(Object.keys(r_left));
  var table = document.getElementsByClassName("elim-round-enter-table")[0];
  for (var i = Object.keys(r_left).length - 1; i >= 0; i --) {
    var r_num = Number(Object.keys(r_left)[i]);
    var r_name = calculate_elim_round(r_num)
    var url = kritstats.urls.base + "admin/" + t_data.tournament_name + "/elim_round/" + r_num.toString();
    var tr = document.createElement("tr");
    tr.className = "admin-round-row";
    tr.setAttribute("data-url", url);
    var round_td = document.createElement("td");
    var round_text = document.createTextNode(r_name);
    round_td.appendChild(round_text);

    var r_left_td = document.createElement("td");
    var r_left_text = document.createTextNode(r_left[r_num.toString()].toString());
    r_left_td.appendChild(r_left_text);

    tr.appendChild(round_td);
    tr.appendChild(r_left_td);
    table.appendChild(tr);
  }

  $(".admin-round-row").click(function () {
    window.location.href = $(this).attr("data-url");
  })
}

function modifyPopulate(data, tournament){
  for (i=0 ; i<data.length; i++){
    if (tournament == data[i].tournament_name){
      //DOM for date
      t_data = data[i]
      date = document.getElementById("modify-dashboard-date");
      startdate = String(data[i].start_date);
      enddate = String(data[i].end_date);
      monthnumber = String(parseInt(startdate.substring(4,6)));
      startdateNumber = String(parseInt(startdate.substring(6)));
      enddateNumber = String(parseInt(enddate.substring(6)));
      start_year = String(parseInt(startdate.substring(0,4)));
      end_year = String(parseInt(enddate.substring(0,4)));
      var date_text = monthnumber + '/' + startdateNumber + '/' + start_year + '-' + monthnumber + '/' + enddateNumber + '/' + end_year;
      date.setAttribute("value", date_text);

      $("#modify-dashboard-bid").attr("value", data[i].bid_round.toString());
      $("#modify-location").attr("value", data[i].loc.toString());
    }
  }
  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/tournament/unentered_rounds/" + tournament,
    contentType: 'application/json',
    success: function (left_data) {
      add_rounds_buttons(t_data, left_data)
    },
    error: function(a , b, c){
      console.log('There is an error in retrieving tournament, dashboard.js');
    },
    async: true
  });

  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/tournament/unentered_elim_rounds/" + tournament,
    contentType: 'application/json',
    success: function (left_data) {
      if (!jQuery.isEmptyObject(left_data)) {
        add_elim_rounds_buttons(t_data, left_data)
      } else {
        $(".elim-title").hide();
        $(".elim-table").hide();
      }
    },
    error: function(a , b, c){
      console.log('There is an error in retrieving tournament, dashboard.js');
    },
    async: true
  });

}

$(document).ready(function () {
  tournament = document.URL;
  tournament = tournament.split('/');
  tournament = tournament[tournament.length-1];
  $("#tourn-name").attr("value", tournament);
  $.ajax({
      type: 'GET',
      url: kritstats.urls.tournament_query,
      contentType: 'application/json',
      success: function (data) {
        modifyPopulate(data, tournament)
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving tournament, dashboard.js');
      },
      async: true
  });

});
