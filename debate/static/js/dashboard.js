function widgetPopulate(data, tournament){
  for (i=0 ; i<data.length; i++){
    if (tournament == data[i].tournament_name){
      //DOM for date widget
      regDate = document.getElementById("dashboard-reg-date");
      xsDate = document.getElementById("dashboard-xs-date")
      startdate = String(data[i].start_date);
      enddate = String(data[i].end_date);
      monthnumber = String(parseInt(startdate.substring(4,6)));
      month = '';
      if (monthnumber == '1'){
        month = 'Jan.'
      }
      else if (monthnumber == '2'){
        month = 'Feb.'
      }
      else if (monthnumber == '3'){
        month = 'Mar.'
      }
      else if (monthnumber == '4'){
        month = 'Apr.'
      }
      else if (monthnumber == '5'){
        month = 'May'
      }
      else if (monthnumber == '6'){
        month = 'Jun.'
      }
      else if (monthnumber == '7'){
        month = 'Jul.'
      }
      else if (monthnumber == '8'){
        month = 'Aug.'
      }
      else if (monthnumber == '9'){
        month = 'Sept.'
      }
      else if (monthnumber == '10'){
        month = 'Oct.'
      }
      else if (monthnumber == '11'){
        month = 'Nov.'
      }
      else {
        month = 'Dec.'
      }
      startdateNumber = String(parseInt(startdate.substring(6)));
      enddateNumber = String(parseInt(enddate.substring(6)));
      var regDateNode = document.createTextNode(month + ' ' + startdateNumber + ' - ' + enddateNumber);
      regDate.appendChild(regDateNode);
      var xsDateNode = document.createTextNode(monthnumber + '/' + startdateNumber + '-' + monthnumber + '/' + enddateNumber);
      xsDate.appendChild(xsDateNode);

      //DOM for Teams Widget
      var totalTeams = document.getElementById("dashboard-teams-entered");
      var totalTeamsNumber = document.createTextNode(data[i].num_entries);
      totalTeams.appendChild(totalTeamsNumber);

      //DOM for Bid Level
      var bidLevel = document.getElementById("dashboard-bid-level");
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

function scrollBidPopulate(data){
  var bidScroll = document.getElementById("dashboard-bidded-teams-scroll");
  for (i=0; i<data.length; i++){
    if (data[i].bids > 0) {
      var li = document.createElement('li');
      li.className = "clearfix";
      li.style.position = "relative;";
      var span = document.createElement('span');
      span.className = "drag-marker";
      var i = document.createElement('i');
      span.appendChild(i);
      var p = document.createElement('p');
      p.className = "todo-title";
      p.style.paddingLeft = "20px";
      var name = document.createTextNode(data[i].team_code);
      p.appendChild(name);
      li.appendChild(span);
      li.appendChild(p);
      bidScroll.appendChild(li);

    }
  }
}

function scrollSchoolPopulate(data){
  var teamList = [];
  var schoolScroll = document.getElementById("dashboard-schools-attending-scroll");
  var team = data[0].team_code;
  length = team.length - 3;
  team = team.substring(0,length);
  for (j=1; j<data.length; j++){
    var team1 = data[j].team_code;
    var team2 = data[j-1].team_code;
    length1 = team1.length-3;
    length2 = team2.length-3;
    team1 = team1.substring(0,length1);
    team2 = team2.substring(0,length2);
    if (team1 != team2){

      var li = document.createElement('li');
      li.className = "clearfix";
      li.style.position = "relative;";
      var span = document.createElement('span');
      span.className = "drag-marker";
      var i = document.createElement('i');
      span.appendChild(i);
      var p = document.createElement('p');
      p.className = "todo-title";
      p.style.paddingLeft = "20px";
      var name = document.createTextNode(team1);
      p.appendChild(name);
      li.appendChild(span);
      li.appendChild(p);
      schoolScroll.appendChild(li);
    }
  }

  
}

$(document).ready(function () {
  var team_id = $(".team_id_hidden").attr("data-id");
  tournament = document.URL;
  tournament = tournament.split('/');
  tournament = tournament[tournament.length-2];

  $.ajax({
      type: 'GET',
      url: location.protocol + "//" + location.hostname + ":8000/1/tournament/",
      contentType: 'application/json',
      success: function (data) {
        widgetPopulate(data, tournament)
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
        scrollBidPopulate(data);
        scrollSchoolPopulate(data);
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving tournament entries, dashboard.js');
      },
      async: true
  });


})