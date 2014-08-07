
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

function load_round_page(data, round_id, round_type) {
  if (round_type == "elim_round") {
    var r_num = " " + calculate_elim_round(data.round_num);
  } else {
    var r_num = " Round " + data.round_num;
  }
  $(".round_header").text(data.tournament + r_num);
  $(".aff_team_code").text(data.aff_code);
  $(".neg_team_code").text(data.neg_code);
  $(".judge_name").text("Judge: " + data.judge);
  if (data.winner == data.aff_id) {
  	$(".aff-panel").addClass("bg-success");
  	$(".neg-panel").addClass("bg-danger");
  } else if (data.winner == data.neg_id) {
  	$(".neg-panel").addClass("bg-success");
  	$(".aff-panel").addClass("bg-danger");
  }
}

$(document).ready(function() {
  var round_id = $(".round_hidden").attr("data-round-id");
  var round_type = $(".round_hidden").attr("data-round-type");
  console.log(round_type);
  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/" + round_type + "/" + round_id,
    contentType: 'application/json',
    success: function (data) {
      load_round_page(data[0], round_id, round_type);
    },
    error: function(a , b, c){
      console.log('There is an error in retrieving team_info');
    },
    async: true
  });
})
