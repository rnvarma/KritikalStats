function generateJudgePage(data, id) { 
  $(".judge_name").text(data.judge_data.name); 


}


$(document).ready(function() {
  var judge_id = $(".judge_id_hidden").attr("data-id"); 

  $.ajax({
      type: 'GET',
      url: kritstats.urls.base + "1/judge/" + judge_id,
      contentType: 'application/json',
      success: function (data) {
      	generateJudgePage(data, judge_id); 
//        load_team_info(data, team_id);
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving team_info');
      },
      async: true
  });

}); 
