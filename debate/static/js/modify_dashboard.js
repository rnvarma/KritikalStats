function modifyPopulate(data, tournament){
  for (i=0 ; i<data.length; i++){
    if (tournament == data[i].tournament_name){
      //DOM for date 
      date = document.getElementById("modify-dashboard-date");
      startdate = String(data[i].start_date);
      enddate = String(data[i].end_date);
      monthnumber = String(parseInt(startdate.substring(4,6)));
      startdateNumber = String(parseInt(startdate.substring(6)));
      enddateNumber = String(parseInt(enddate.substring(6)));
      var DateNode = document.createTextNode(monthnumber + '/' + startdateNumber + '-' + monthnumber + '/' + enddateNumber);
      date.appendChild(DateNode);

      //DOM for Bid Level
      var bidLevel = document.getElementById("modify-dashboard-bid");
      bidLevelQuery = data[i].bid_round
      bidLevelValue = '';
      if (bidLevelQuery == 2) {
        bidLevelValue = 'Finals';
      }
      else if (bidLevelQuery == 4){
        bidLevelValue = "Semis";
      }
      else if (bidLevelQuery == 8){
        bidLevelValue = "Quarters";
      }
      else if (bidLevelQuery == 16){
        bidLevelValue = "Octos";
      }
      else {
        bidLevelValue = "N/A";
      }
      bidLevelNode = document.createTextNode(bidLevelValue);
      bidLevel.appendChild(bidLevelNode);
    }
  }

}

function teamsEntered(data) {
  //DOM for Teams Widget
  var totalTeams = document.getElementById("modify-dashboard-teams");
  var totalTeamsNumber = document.createTextNode(data.length);
  totalTeams.appendChild(totalTeamsNumber);
}

$(document).ready(function () {
  tournament = document.URL;
  tournament = tournament.split('/');
  tournament = tournament[tournament.length-1];

  $.ajax({
      type: 'GET',
      url: location.protocol + "//" + location.hostname + ":8000/1/tournament/",
      contentType: 'application/json',
      success: function (data) {
        modifyPopulate(data, tournament)
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving tournament, dashboard.js');
      },
      async: true
  });

  $.ajax({
      type: 'GET',
      url: location.protocol + "//" + location.hostname + ":8000/1/tournament/" + tournament + '/entries',
      contentType: 'application/json',
      success: function (data) {
        teamsEntered(data)
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving tournament entries, dashboard.js');
      },
      async: true
  });

});