function create_archive(tournament_data) {
  var tournament_name = tournament_data.tournament_name
  var tourney_row = document.createElement("tr");
  tourney_row.className = "archive_row";
  tourney_row.setAttribute("tourney-id", tournament_name);
  
  var tourney_td = document.createElement("td");
  var tourney_name = document.createTextNode(tournament_name);
  tourney_td.appendChild(tourney_name);

  var date_td = document.createElement("td");
  var start_date_raw = String(tournament_data.start_date);
  var end_date_raw = String(tournament_data.end_date);
  var start_date = String(parseInt(start_date_raw.substring(4,6))) + '/' + String(parseInt(start_date_raw.substring(6))) + '/' + String(parseInt(start_date_raw.substring(0,4)))
  var end_date = String(parseInt(end_date_raw.substring(4,6))) + '/' + String(parseInt(end_date_raw.substring(6))) + '/' + String(parseInt(end_date_raw.substring(0,4)))
  var date_name = document.createTextNode(start_date + ' - ' + end_date);
  date_td.appendChild(date_name);

  tourney_row.appendChild(tourney_td);
  tourney_row.appendChild(date_td);
  return tourney_row;
}

function archive_table_populate(data, year) {
  var table = document.getElementsByClassName("archives_table")[0]; 
  first_year = year.substring(0,4)
  second_year = year.substring(5)
  for (i=0; i<data.length; i++){
    //if (data[i].start_date
    var start_date = String(data[i].start_date)
    var start_year = start_date.substring(0,4);
    if (start_year == first_year){
      var month = parseInt(start_date.substring(4,6));
      if (month>=7){
        var archived_tourney = create_archive(data[i]);
        table.appendChild(archived_tourney);
      }
    }
    else if (start_year == second_year){
      var month = parseInt(start_date.substring(4,6));
      if (month<=6){
        var archived_tourney = create_archive(data[i]);
        table.appendChild(archived_tourney);
      }
    }
  }

  $(".archive_row").click(function () {
    var id = $(this).attr("tourney-id");
    var url = location.protocol + "//" + location.hostname + ":8000/" + id + "/Dashboard";
    window.location.href = url;
  })

}

$(document).ready(function () {
  var year = $("#year_hidden").attr("archived-year");
  $.ajax({
    type: 'GET',
    url: location.protocol + "//" + location.hostname + ":8000/1/tournament/",
    contentType: 'application/json',
    success: function (data) {
      archive_table_populate(data, year);
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in archive_tournament.js');
    },
    async: true
  });
})