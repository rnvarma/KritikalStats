function create_judge(judges) {
  name = judges.name
  id = judges.j_id
  var name_row = document.createElement("tr");
  name_row.className = "judge_row_year";
  name_row.setAttribute("judge-id", id);
  
  var name_td = document.createElement("td");
  var judge_name = document.createTextNode(name);
  name_td.appendChild(judge_name);

  name_row.appendChild(name_td);
  return name_row;
}

function judge_table_populate(data) {
  var table = document.getElementsByClassName("judge_name")[0]; 
  for (var i = 0; i<data.length; i++){
    var judge = create_judge(data[i])
    table.appendChild(judge)
  }

  $(".judge_row_year").click(function () {
    var id = $(this).attr("judge-id");
    var url = kritstats.urls.base + "judge/" + id;
    window.location.href = url;
  })
  
}

$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/judges/list",
    contentType: 'application/json',
    success: function (data) {
      judge_table_populate(data);
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + 'judge.js');
    },
    async: true
  });
})
