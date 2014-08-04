function archive_table_populate(data, year) {
  var table = document.getElementsByClassName("archives_table")[0]; 
  first_year = year.substring(0,4)
  second_year = year.substring(5)
  for (i=0; i<data.length; i++){
    //if (data[i].start_date
    console.log(data[i].start_date);
  }


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
      console.log('There is an error in quering for ' + tournament + ' in archive.js');
    },
    async: true
  });
})