var judge_list_data;

function create_judge(judges) {
  name = judges.name
  id = judges.j_id
  var name_row = document.createElement("tr");
  name_row.className = "judge_row_year judge-" + id;
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

function contains(original, filter) { 
  var check = original.toLowerCase(); 
  return check.indexOf(filter.toLowerCase()) != -1; 
}

function filter_results(query) {
  $(".judge_row_year").hide();
  for (var i = 0; i < judge_list_data.length; i ++) {
    if (contains(judge_list_data[i].name, query)) {
      $(".judge-" + judge_list_data[i].j_id).show();
    }
  }
}

function load_click_handlers(data){
  $(".judge_table_header").click(function() {
    $(".judge_table_header").not(this).removeClass("forward").removeClass("backward").addClass("unsorted");
    if ($(this).hasClass("backward")) {
      var order = "forward";
      $(this).removeClass("backward").addClass("forward");
    }
    else {
      var order = "backward";
      $(this).removeClass("forward").addClass("backward");
    }
    var sort_by = $(this).attr("data-type");
    var rows = [];
    for (var i = 0; i < data.length; i ++){
      var row = {};
      var judge = data[i];
      row["data"] = judge[sort_by]
      row["row-class"] = ".judge-" + judge['j_id'].toString();
      rows.push(row);
    }
    if (order == "forward") {
      rows.sort(function(a,b){
        return a.data < b.data ? 1 : -1 ;
      })
    }
    else {
      rows.sort(function(a,b){
        return a.data > b.data ? 1 : -1;
      })
    }
    for (var j = 0; j< rows.length; j++){
      var obj = rows[j];
      $(obj['row-class']).appendTo($(".judge_name"));
    }

  })

  $('.judge_table_header').trigger('click');
}

$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "1/judges/list",
    contentType: 'application/json',
    success: function (data) {
      judge_list_data = data;
      judge_table_populate(data);
      load_click_handlers(data);
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + 'judge.js');
    },
    async: true
  });
  var searchInput = document.getElementsByClassName("judges-search-box")[0]; 
  searchInput.oninput = function (event) { filter_results(event.target.value);};
})
