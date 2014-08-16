
selection_attributes = {"teama": "teamb", "teamb": "judge", "judge": "finished"};
prelim_selection_msgs = {"teamb": "Click on the column with the Neg team!",
                  "judge": "Click on the column with the judge!",
                  "finished": "Click on the button below to submit!"};
elim_selection_msgs = {"teamb": "Click on the column with the second team!",
                  "judge": "Click on the column with the judges!",
                  "finished": "Click on the button below to submit!"};


var selection_msgs, r_type;

elim_round_choices = [{"label": "Double-Octofinals", "value": 32},
                      {"label": "Octofinals", "value": 16},
                      {"label": "Quarterfinals", "value": 8},
                      {"label": "Semifinals", "value": 4},
                      {"label": "Finals", "value": 2}];

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function populate_select_table(data) {
  var num_cols = data.length;
  var header_row = document.getElementsByClassName("choosecol-th")[0];
  for (var i = 0; i < num_cols; i ++) {
  	var th = document.createElement("th");
  	var head_text = document.createTextNode((i + 1).toString());
  	th.appendChild(head_text);
  	header_row.appendChild(th);
  }
  var table_row = document.getElementsByClassName("choosecol-body")[0];
  for (var i = 0; i < num_cols; i ++) {
  	var td = document.createElement("td");
  	td.className = "choosecol-col choosecol-" + i.toString();
  	var text = document.createTextNode(data[i]);
  	td.appendChild(text);
  	td.setAttribute("data-index", i.toString())
  	table_row.appendChild(td);
  }

  $(".choosecol-col").click(function() {
  	if ($(".choosecol-table").attr("data-cur-selection") == "finished") {
  	  $(".choosecol-msg").text($(".choosecol-msg").text() + "!");
  	} else if ($(this).hasClass("selected")) {
  	  $(".choosecol-msg").text($(".choosecol-msg").text() + " Try Again!");
  	} else {
  	  $(this).addClass("selected");
  	  var index = $(this).attr("data-index");
  	  var store_key = $(".choosecol-table").attr("data-cur-selection");
  	  $(".choosecol-store").attr("data-" + store_key, index);
  	  var new_key = selection_attributes[store_key];
  	  $(".choosecol-table").attr("data-cur-selection", new_key);
  	  $(".choosecol-msg").text(selection_msgs[new_key]);
  	}
  })
}

function create_submit_handler(data) {
  $(".choosecol-submit").click(function() {
  	if ($(".choosecol-table").attr("data-cur-selection") != "finished") {
  	  $(".choosecol-msg").text($(".choosecol-msg").text() + "!");
  	} else {
      if (r_type == "prelim") {
    	  var aff = Number($(".choosecol-store").attr("data-teama"));
    	  var neg = Number($(".choosecol-store").attr("data-teamb"));
    	  var judge = Number($(".choosecol-store").attr("data-judge"));
    	  var indexes = [aff, neg, judge];
    	  p_data = {"tname": data["t_name"],
                  "round_num": data["r_num"],
                  "round_url": data["round_url"],
                  "status": "second",
                  "indexes": indexes,
                  "r_type": r_type}
        var csrftoken = getCookie('csrftoken');
        $.ajax({
          type: 'POST',
          url: kritstats.urls.base + "1/create/round",
          data: p_data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function (response_data) {
            window.location.href = kritstats.urls.base + "admin/modifydashboard/" + data["t_name"];
          },
          error: function(a , b, c){
            console.log('There is an error in create round api');
          },
          async: true
        });
      } else {
        var aff = Number($(".choosecol-store").attr("data-teama"));
        var neg = Number($(".choosecol-store").attr("data-teamb"));
        var judge = Number($(".choosecol-store").attr("data-judge"));
        var indexes = [aff, neg, judge];
        p_data = {"tname": data["t_name"],
                  "round_num": data["r_num"],
                  "round_url": data["round_url"],
                  "status": "second",
                  "indexes": indexes,
                  "r_type": r_type}
        var csrftoken = getCookie('csrftoken');
        $.ajax({
          type: 'POST',
          url: kritstats.urls.base + "1/create/round",
          data: p_data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function (response_data) {
            window.location.href = kritstats.urls.base + "admin/modifydashboard/" + data["t_name"];
          },
          error: function(a , b, c){
            console.log('There is an error in create round api');
          },
          async: true
        });
      }
    }
  })
}

$(document).ready(function() {
  r_type = $(".create-round-type").attr("data-round-type");
  if (r_type == "prelim")  {
    selection_msgs = prelim_selection_msgs;
  }  else {
    selection_msgs = elim_selection_msgs;
  }
  $(".createround-submit").click(function() {
  	var t_name = $("#input_tname").val();
  	var url = $("#input_url").val();
  	var r_num = $("#input_round_num").val();
    var r_type = $(".create-round-type").attr("data-round-type");
  	var p_data = {"tname": t_name,
                  "round_url": url,
                  "round_num": r_num,
                  "status": "first"}
    var csrftoken = getCookie('csrftoken');
    $.ajax({
      type: 'POST',
      url: kritstats.urls.base + "1/create/round",
      data: p_data,
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      },
      success: function (data) {
      	if ($(".choosecol-status").attr("data-status") == "nodata") {
      	  $(".choosecol-status").attr("data-status", "hasdata");
          $(".choosecol-row").slideDown();
          populate_select_table(data["top_row"]);
          create_submit_handler(data);
        }
      },
      error: function(a , b, c){
        console.log('There is an error in merging the team');
      },
      async: true
    });
  })
})