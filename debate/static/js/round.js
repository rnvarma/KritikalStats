
function load_round_page(data, round_id) {
  $(".round_header").text(data.tournament + " Round " + data.round_num);
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
  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/round/" + round_id,
    contentType: 'application/json',
    success: function (data) {
      load_round_page(data[0], round_id);
    },
    error: function(a , b, c){
      console.log('There is an error in retrieving team_info');
    },
    async: true
  });
})
