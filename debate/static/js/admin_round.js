
function decided_round(r_data) {
  console.log("decided!");
}

function enter_round(r_data, table_class) {
  var table = document.getElementsByClassName(table_class)[0];
  var r_row = document.createElement("tr");
  var affcode_rd = document.createElement("td");
  var aff_code = document.createTextNode(r_data.aff_code);
  affcode_rd.appendChild(aff_code);

  var affname_rd = document.createElement("td");
  var aff_name = document.createTextNode(r_data.aff_team);
  affname_rd.appendChild(aff_name);
  affname_rd.className = "visible-lg";

  var negcode_rd = document.createElement("td");
  var neg_code = document.createTextNode(r_data.neg_code);
  negcode_rd.appendChild(neg_code);

  var negname_rd = document.createElement("td");
  var neg_name = document.createTextNode(r_data.neg_team);
  negname_rd.appendChild(neg_name);
  negname_rd.className = "visible-lg";

  var judge_rd = document.createElement("td");
  var judge_name = document.createTextNode(r_data.judge);
  judge_rd.appendChild(judge_name)

  r_row.appendChild(affcode_rd);
  r_row.appendChild(affname_rd);
  r_row.appendChild(negcode_rd);
  r_row.appendChild(negname_rd);
  r_row.appendChild(judge_rd);
  table.appendChild(r_row)
}

function enter_rounds(data) {
  for (var i = 0; i < data.length; i ++) {
  	var r = data[i];
  	var complete = (r.winner == "undecided") ? enter_round(r, "undecided_table") : enter_round(r, "decided_table");
  }
}

$(document).ready(function() {
  var t_name = $(".t_name_hidden").attr("data-name");
  var r_num = $(".r_num_hidden").attr("data-num");
  $.ajax({
      type: 'GET',
      url: location.protocol + "//" + location.hostname + ":8000/1/tournament/" + t_name + "/round/" + r_num,
      contentType: 'application/json',
      success: function (data) {
        enter_rounds(data.rounds);
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving tournament round info for admin_round.js');
      },
      async: true
  });
})