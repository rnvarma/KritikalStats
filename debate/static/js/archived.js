function create_archive(school_year) {
  var year_row = document.createElement("tr");
  year_row.className = "archive_row_year";
  console.log()
  year_id = school_year.substring(0,4) + '-' + school_year.substring(7)
  year_row.setAttribute("year-id", year_id);
  
  var year_td = document.createElement("td");
  var year_name = document.createTextNode(school_year);
  year_td.appendChild(year_name);

  year_row.appendChild(year_td);
  return year_row;
}

function archive_table_populate(data) {
  var table = document.getElementsByClassName("archives_table_year")[0]; 
  earliest_year = '3000'
  for (i=0; i<data.length; i++){
    var start_date = String(data[i].start_date)
    var start_year = start_date.substring(0,4);
    if(start_year < earliest_year) {
      earliest_year = start_year
    }
  }
  earliest_year = String(parseInt(earliest_year)-1)

  var this_today = new Date();
  var this_year = this_today.getFullYear();
  this_year = String(this_year)

  while (parseInt(earliest_year) < parseInt(this_year)){
    var year_row_real = create_archive(earliest_year + ' - ' + String(parseInt(earliest_year)+1))
    table.appendChild(year_row_real)
    earliest_year = String(parseInt(earliest_year)+1)
  }

  var this_month = this_today.getMonth() + 1;
  if (this_month >= 7){
    this_year_plusone = String(parseInt(this_year) + 1);
    var year_row_next = create_archive(this_year + ' - ' + this_year_plusone);
    table.appendChild(year_row_next);
  }

  $(".archive_row_year").click(function () {
    var id = $(this).attr("year-id");
    var url = kritstats.urls.base + "archived/" + id;
    window.location.href = url;
  })

}

$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: kritstats.urls.tournament_query,
    contentType: 'application/json',
    success: function (data) {
      archive_table_populate(data);
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in archive.js');
    },
    async: true
  });
})
