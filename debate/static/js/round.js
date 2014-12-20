
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

function load_one_ac(one_ac_data) {
  var row = document.getElementsByClassName("one_ac_name")[0];
  var one_ac_node = document.createElement("div");
  one_ac_node.className = "arg-name-data"
  if (!one_ac_data.length) {
    var filler_text = document.createTextNode("Click edit to enter a 1AC!");
    one_ac_node.appendChild(filler_text);
  } else {
    var one_ac_text = document.createTextNode(one_ac_data[0].name);
    one_ac_node.appendChild(one_ac_text);
  }
  row.appendChild(one_ac_node);
}

function load_one_nc(one_nc_data) {
  var row = document.getElementsByClassName("one_nc_name")[0];
  if (!one_nc_data.length) {
    var one_nc_node = document.createElement("div");
    one_nc_node.className = "arg-name-data"
    var filler_text = document.createTextNode("Click edit to enter the 1NC arguments!");
    one_nc_node.appendChild(filler_text);
    row.appendChild(one_nc_node);
  } else {
    for (var i = 0; i < one_nc_data.length; i ++) {
      var argument = one_nc_data[i];
      var arg_node = document.createElement("div");
      arg_node.className = "arg-name-data"
      var arg_text = document.createTextNode(argument.name);
      arg_node.appendChild(filler_text);
      row.appendChild(arg_node);
    }
  }
}

function load_round_summary(data) {
  console.log(data);
  load_one_ac(data.one_ac);
  load_one_nc(data.one_nc);
  load_block(data.block);
  load_two_nr(data.two_nr)
}

function load_round_page(data, round_id, round_type) {
  if (round_type == "elim_round") {
    var r_num = " " + calculate_elim_round(data.round_num);
    for (var i = 0; i < data.judge.length; i ++) {
      var judge = data.judge[i];
      $(".judge_name-" + (i + 1)).text(judge.judge_name);
      $(".judge-link-" + (i + 1)).attr("href", "/judge/" + judge.judge_id);
    }
  } else {
    var r_num = " Round " + data.round_num;
    $(".judge_name").text("Judge: " + data.judge);
    $(".judge-link").attr("href", "/judge/" + data.judge_id);
  }
  $(".round_header").text(data.tournament + r_num);
  $(".aff_team_code").text(data.aff_code);
  $('.aff_team_code').attr('id', data.aff_id);
  $(".neg_team_code").text(data.neg_code);
  $('.neg_team_code').attr('id', data.neg_id);
  if (data.winner == data.aff_id) {
  	$(".aff-panel").addClass("bg-success");
  	$(".neg-panel").addClass("bg-danger");
  } else if (data.winner == data.neg_id) {
  	$(".neg-panel").addClass("bg-success");
  	$(".aff-panel").addClass("bg-danger");
  }

  load_round_summary(data);

  round_click_handler();
}

function round_click_handler(){
  $(".aff_team_code").click(function () {
    var team_id = (this).id
    var url = kritstats.urls.base + "team/" + team_id;
    window.location = url;
  });
  $(".neg_team_code").click(function () {
    var team_id = (this).id
    var url = kritstats.urls.base + "team/" + team_id;
    window.location = url;
  });
}

$(document).ready(function() {
  var round_id = $(".round_hidden").attr("data-round-id");
  var round_type = $(".round_hidden").attr("data-round-type");
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
