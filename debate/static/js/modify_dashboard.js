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
      start_year = String(parseInt(startdate.substring(0,4)));
      end_year = String(parseInt(enddate.substring(0,4)));
      var date_text = monthnumber + '/' + startdateNumber + '/' + start_year + '-' + monthnumber + '/' + enddateNumber + '/' + end_year;
      date.setAttribute("value", date_text);

      $("#modify-dashboard-bid").attr("value", data[i].bid_round.toString());
      $("#modify-location").attr("value", data[i].loc.toString());
    }
  }

}

$(document).ready(function () {
  tournament = document.URL;
  tournament = tournament.split('/');
  tournament = tournament[tournament.length-1];
  $("#tourn-name").attr("value", tournament);
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

});