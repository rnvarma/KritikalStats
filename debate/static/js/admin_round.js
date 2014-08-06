
function decided_round(r_data) {
  console.log("decided!");
}

function make_modal(r_data, table_class) {
  var modal = document.createElement("div");
  modal.setAttribute("id", "r_modal_" + r_data.round_id.toString());
  modal.className = "modal fade";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("style", "display:none;");

  var m_d = document.createElement("div");
  m_d.className = "modal-dialog";
  var m_c = document.createElement("div");
  m_c.className = "modal-content";
  var m_h = document.createElement("div");
  m_h.className = "modal-header";
  var m_t = document.createElement("h4");
  m_t.className = "modal-title";
  var title = document.createTextNode("Select the winner of this round and then save the result");
  m_t.appendChild(title);
  var m_b = document.createElement("div");
  m_b.className = "modal-body";

  var row = document.createElement("div");
  row.className = "row"
  var aff = document.createElement("div");
  aff.className = "col-xs-12 col-sm-12 col-md-6 col-lg-6";
  var aff_panel = document.createElement("div");
  aff_panel.className = "panel aff-side-admin";
  aff_panel.setAttribute("r_id", r_data.round_id.toString());
  aff_panel.setAttribute("aff_id", r_data.aff_id.toString());
  aff_panel.setAttribute("neg_id", r_data.neg_id.toString());
  var a_panel_head = document.createElement("div");
  a_panel_head.className = "panel-heading";
  var aff_text = document.createTextNode("Aff");
  a_panel_head.appendChild(aff_text);
  var a_panel_body = document.createElement("div");
  a_panel_body.className = "panel-body";
  var aff_team_name = document.createTextNode(r_data.aff_code);
  a_panel_body.appendChild(aff_team_name);
  aff_panel.appendChild(a_panel_head)
  aff_panel.appendChild(a_panel_body);
  aff.appendChild(aff_panel);
  row.appendChild(aff);

  var neg = document.createElement("div");
  neg.className = "col-xs-12 col-sm-12 col-md-6 col-lg-6";
  var neg_panel = document.createElement("div");
  neg_panel.className = "panel neg-side-admin";
  neg_panel.setAttribute("r_id", r_data.round_id.toString());
  neg_panel.setAttribute("aff_id", r_data.aff_id.toString());
  neg_panel.setAttribute("neg_id", r_data.neg_id.toString());
  var n_panel_head = document.createElement("div");
  n_panel_head.className = "panel-heading";
  var neg_text = document.createTextNode("Neg");
  n_panel_head.appendChild(neg_text);
  var n_panel_body = document.createElement("div");
  n_panel_body.className = "panel-body";
  var neg_team_name = document.createTextNode(r_data.neg_code);
  n_panel_body.appendChild(neg_team_name);
  neg_panel.appendChild(n_panel_head)
  neg_panel.appendChild(n_panel_body);
  neg.appendChild(neg_panel);
  row.appendChild(neg);

  if (table_class == "decided_table") {
    if (r_data.aff_id == r_data.winner) {
      a_panel_body.className += " bg-success";
      n_panel_body.className += " bg-danger";
    } else {
      n_panel_body.className += " bg-success";
      a_panel_body.className += " bg-danger";
    }
  }
  m_b.appendChild(row);

  var m_f = document.createElement("div");
  m_f.className = "modal-footer";
  var close_button = document.createElement("button");
  close_button.setAttribute("data-dismiss", "modal");
  close_button.className = "btn btn-danger";
  close_button.setAttribute("type", "button");
  var close_text = document.createTextNode("Cancel");
  close_button.appendChild(close_text);

  var save_button = document.createElement("button");
  save_button.setAttribute("data-dismiss", "modal");
  save_button.className = "btn btn-success save-round-admin";
  save_button.setAttribute("type", "button");
  save_button.setAttribute("r_id", r_data.round_id.toString());
  var save_text = document.createTextNode("Save");
  save_button.appendChild(save_text);
  m_f.appendChild(close_button);
  m_f.appendChild(save_button);

  var results_div = document.createElement("div");
  results_div.className = "results-round-" + r_data.round_id.toString();
  results_div.setAttribute("winner", "none");
  results_div.setAttribute("loser", "none");

  m_h.appendChild(m_t);
  m_c.appendChild(m_h);
  m_c.appendChild(m_b);
  m_c.appendChild(m_f);
  m_c.appendChild(results_div);
  m_d.appendChild(m_c);
  modal.appendChild(m_d);
  return modal
}

function enter_round(r_data, table_class) {
  var table = document.getElementsByClassName(table_class)[0];
  var r_row = document.createElement("tr");
  r_row.className = "admin_round_row round-" + r_data.round_id.toString();
  r_row.setAttribute("data-toggle", "modal");
  r_row.setAttribute("href", "#r_modal_" + r_data.round_id.toString());
  var affcode_rd = document.createElement("td");
  var aff_code = document.createTextNode(r_data.aff_code);
  affcode_rd.className = "aff-code-col";
  affcode_rd.appendChild(aff_code);
  affcode_rd.setAttribute("aff_id", r_data.aff_id);

  var affname_rd = document.createElement("td");
  var aff_name = document.createTextNode(r_data.aff_team);
  affname_rd.appendChild(aff_name);
  affname_rd.className = "aff-name-col visible-lg";

  var negcode_rd = document.createElement("td");
  var neg_code = document.createTextNode(r_data.neg_code);
  negcode_rd.className = "neg-code-col";
  negcode_rd.appendChild(neg_code);
  negcode_rd.setAttribute("neg_id", r_data.neg_id);

  var negname_rd = document.createElement("td");
  var neg_name = document.createTextNode(r_data.neg_team);
  negname_rd.appendChild(neg_name);
  negname_rd.className = "neg-name-col visible-lg";

  var judge_rd = document.createElement("td");
  var judge_name = document.createTextNode(r_data.judge);
  judge_rd.appendChild(judge_name)

  if (table_class == "decided_table") {
    if (r_data.aff_id == r_data.winner) {
      affcode_rd.className += " bg-success";
      affname_rd.className += " bg-success";
      negcode_rd.className += " bg-danger";
      negname_rd.className += " bg-danger";
    } else {
      negcode_rd.className += " bg-success";
      negname_rd.className += " bg-success";
      affcode_rd.className += " bg-danger";
      affname_rd.className += " bg-danger";
    }
  }

  r_row.appendChild(affcode_rd);
  r_row.appendChild(affname_rd);
  r_row.appendChild(negcode_rd);
  r_row.appendChild(negname_rd);
  r_row.appendChild(judge_rd);
  var modal = make_modal(r_data, table_class);
  table.appendChild(r_row);
  table.appendChild(modal);
}

function enter_rounds(data) {
  for (var i = 0; i < data.length; i ++) {
  	var r = data[i];
  	var complete = (r.winner == "undecided") ? enter_round(r, "undecided_table") : enter_round(r, "decided_table");
  }

  $(".aff-side-admin").click(function () {
    $(this).find(".panel-body").removeClass("bg-danger");
    $(this).find(".panel-body").addClass("bg-success");
    $(this).parent().next().find(".panel-body").removeClass("bg-success");
    $(this).parent().next().find(".panel-body").addClass("bg-danger");

    var r_id = $(this).attr("r_id");
    $(".results-round-" + r_id).attr("winner", $(this).attr("aff_id"));
    $(".results-round-" + r_id).attr("loser", $(this).attr("neg_id"));
  })

  $(".neg-side-admin").click(function () {
    $(this).find(".panel-body").removeClass("bg-danger");
    $(this).find(".panel-body").addClass("bg-success");
    $(this).parent().prev().find(".panel-body").removeClass("bg-success");
    $(this).parent().prev().find(".panel-body").addClass("bg-danger");

    var r_id = $(this).attr("r_id");
    $(".results-round-" + r_id).attr("winner", $(this).attr("neg_id"));
    $(".results-round-" + r_id).attr("loser", $(this).attr("aff_id"));
  })

  $(".save-round-admin").click(function() {
    var r_id = $(this).attr("r_id");
    var win_id = $(".results-round-" + r_id).attr("winner");
    var lose_id = $(".results-round-" + r_id).attr("loser");
    var post_data = {"update": "round_result", "win_id": win_id, "lose_id": lose_id, "r_id": r_id};
    var url = kritstats.url.update_round;

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
    var csrftoken = getCookie('csrftoken');
    console.log(post_data);

    $.ajax({
      type: 'POST',
      url: url,
      data: post_data,
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      },
      success: function (data) {
        register_inputed_round(data);
      },
      error: function(a , b, c){
        console.log('There is an error in merging the team');
      },
      async: true
    });

  })
}

function register_inputed_round(data) {
  var row_class = ".round-" + data.r_id;
  var aff_id = $(row_class).find(".aff-code-col").attr("aff_id");
  var neg_id = $(row_class).find(".neg-code-col").attr("neg_id");
  if (data.winner == aff_id) {
    $(row_class).find(".aff-code-col").removeClass("bg-danger");
    $(row_class).find(".aff-name-col").removeClass("bg-danger");
    $(row_class).find(".aff-code-col").addClass("bg-success");
    $(row_class).find(".aff-name-col").addClass("bg-success");

    $(row_class).find(".neg-code-col").removeClass("bg-success");
    $(row_class).find(".neg-name-col").removeClass("bg-success");
    $(row_class).find(".neg-code-col").addClass("bg-danger");
    $(row_class).find(".neg-name-col").addClass("bg-danger");
  } else {
    $(row_class).find(".neg-code-col").removeClass("bg-danger");
    $(row_class).find(".neg-name-col").removeClass("bg-danger");
    $(row_class).find(".neg-code-col").addClass("bg-success");
    $(row_class).find(".neg-name-col").addClass("bg-success");

    $(row_class).find(".aff-code-col").removeClass("bg-success");
    $(row_class).find(".aff-name-col").removeClass("bg-success");
    $(row_class).find(".aff-code-col").addClass("bg-danger");
    $(row_class).find(".aff-name-col").addClass("bg-danger");
  }
  $(row_class).appendTo($(".decided_table"));
}

$(document).ready(function() {
  var t_name = $(".t_name_hidden").attr("data-name");
  var r_num = $(".r_num_hidden").attr("data-num");
  $.ajax({
    type: 'GET',
    url: kritstats.urls.base + "/1/tournament/" + t_name + "/round/" + r_num,
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
