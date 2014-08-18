
function isNumeric(num){
  return !isNaN(num)
}

function load_seed_click_handlers(data) {
  $(".seed-input").keyup(function() {
    $(this).addClass("seed-val-changed");
    if ($(this).val() == $(this).attr("value")) {
      $(this).removeClass("seed-val-changed");
    }
  })

  $(".assignseeds-submit").click(function () {
    var changed_seeds = []
    var is_valid_form = true;
    $(".seed-input.seed-val-changed").each(function() {
      if (!isNumeric($(this).val())) {
      	$(this).css("background-color", "#F2DEDE");
        is_valid_form = false;
      } else {
      	$(this).css("background-color", "white");
        var data = {
          "team_id": $(this).attr("data-id"),
          "seed": $(this).val()
        }
        changed_seeds.push(data);
      }
    })
    if (is_valid_form) {
      console.log(changed_seeds);
    }
  })
}

function create_seed_row(seed_data) {
  var tr = document.createElement("tr");
  tr.className = "seed-row row-team-" + seed_data.id;
  
  var code_td = document.createElement("td");
  var code_text = document.createTextNode(seed_data.code)
  code_td.appendChild(code_text);
  var seed_td = document.createElement("td");
  var seed_input = document.createElement("input");
  seed_input.className = "form-control seed-input";
  seed_input.setAttribute("data-id", seed_data.id);
  seed_input.setAttribute("value", seed_data.seed);
  seed_td.appendChild(seed_input);

  tr.appendChild(code_td);
  tr.appendChild(seed_td);
  return tr
}

function load_seed_table(data) {
  var table = document.getElementsByClassName("seed-table-body")[0];
  for (var i = 0; i < data.length; i ++) {
    var seed_row = create_seed_row(data[i]);
    table.appendChild(seed_row);
  }
}

$(document).ready(function() {
  var t_name = $(".hidden_tournament").attr("data-tournament");
  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/tournament/" + t_name + '/breaks/',
    contentType: 'application/json',
    success: function (data) {
      load_seed_table(data);
      load_seed_click_handlers(data)
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in roundQuery');
    },
    async: true
  });
})