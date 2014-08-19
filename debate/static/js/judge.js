function create_elim_rounds_header(t_name, header) {

  var tourn_row = document.createElement("div");
  tourn_row.className = "row elim-row";
  var tourn_filler = document.createElement("div");
  tourn_filler.className = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
  tourn_row.appendChild(tourn_filler);
  header.appendChild(tourn_row);

  var elim_title = document.createElement("h3");
  var elim_title_text = document.createTextNode("Elims");
  elim_title.appendChild(elim_title_text);
  elim_title.setAttribute("style", "text-align: center;");
  tourn_filler.appendChild(elim_title);

  var table = document.createElement("table");
  table.className = "table table-hover general-table " + t_name + "-elim-table";
  tourn_filler.appendChild(table);
  var thead = document.createElement("thead");
  table.appendChild(thead);
  
  var tr = document.createElement("tr");
  var round_th = document.createElement("th");
  var round_text = document.createTextNode("Depth");
  round_th.appendChild(round_text);
  tr.appendChild(round_th);
  
  var side_th = document.createElement("th");
  var side_text = document.createTextNode("Aff")
  side_th.appendChild(side_text);
  tr.appendChild(side_th);
  
  var opponent_th = document.createElement("th");
  var opponent_text = document.createTextNode("Neg");
  opponent_th.appendChild(opponent_text);
  tr.appendChild(opponent_th);
  
  var dec_th = document.createElement("th");
  var dec_text = document.createTextNode("Decision");
  dec_th.appendChild(dec_text);
  tr.appendChild(dec_th);
  

  var judge2_th = document.createElement("th");
  var judge2_text = document.createTextNode("Winner");
  judge2_th.className = "hidden-xs hidden-sm";
  judge2_th.appendChild(judge2_text);
  tr.appendChild(judge2_th); 

  // NOTE TODO: add once judge info is with rounds  
  var judge1_th = document.createElement("th");
  var judge1_text = document.createTextNode("2NR");
  judge1_th.className = "hidden-xs hidden-sm";
  judge1_th.appendChild(judge1_text);
  tr.appendChild(judge1_th); 


  thead.appendChild(tr);
  table.appendChild(thead);
}

function create_round(round_data, elim, tbody) {
  var tr = document.createElement("tr");
  tr.className = "team_tourn_round";
  tr.setAttribute("id", round_data["round_id"]);
  tr.setAttribute("data-round_id", round_data["round_id"]);

  if (elim) { 
    var round_num = determine_elim_round(round_data["round_num"]); 
  } else { 
    var round_num = round_data["round_num"].toString();
  }
  var num_div = document.createElement("td");
  num_div.className = "round_num";
  num_div.innerText = round_num;
  tr.appendChild(num_div);

  var side_div = document.createElement("td");
  side_div.className = "round_side";
  side_div.innerText = round_data["aff_team"];
  tr.appendChild(side_div);

  var opponent_div = document.createElement("td");
  opponent_div.className = "opponent_name";
  opponent_div.innerText = round_data["neg_team"];
  tr.appendChild(opponent_div);

  var decision; 
  if (round_data.winner == "undecided") {
    decision = "undecided";
  } else {
    if (round_data["winner"] == round_data["aff_id"]) { 
      decision = "AFF"; 
    } else { 
      decision = "NEG"; 
    }
  }
  var decision_div = document.createElement("td");
  decision_div.className = "round_decision";
  decision_div.innerText = decision;
  tr.appendChild(decision_div);

  if (elim) { 
      var full_decision = document.createElement("td");
      full_decision.className = "round_decision";
      full_decision.innerText = decision; // this needs to be fixed 
      tr.appendChild(full_decision);
  }

  var two_nr_div = document.createElement("td");
  var two_nr = document.createTextNode(""); // insert 2NR
  two_nr_div.appendChild(two_nr);
  two_nr_div.className = "hidden-xs hidden-sm";
  tr.appendChild(two_nr_div);

  tbody.appendChild(tr);
}

function create_tournament_rounds(prelims, elims, tournament, judge_id) {
  for (var i = 0; i < prelims.length; i++) { 
    var table = document.getElementsByClassName(tournament + "-table")[0];
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    if (prelims[i]["tournament"] == tournament) { 
      create_round(prelims[i], false, tbody)
    }
  }

  for (var j = 0; j < elims.length; j++) { 
    if (elims[j]["tournament"] == tournament) { 
      var table = document.getElementsByClassName(tournament + "-elim-table")[0];
      var tbody = document.createElement("tbody");
      table.appendChild(tbody);
      create_round(elims[j], true, tbody)
    }
  }
}

function create_rounds_header(t_name, active) {
  var tab_head = document.createElement("div");
  tab_head.id = "#" + t_name;
  tab_head.className = "tab-pane " + t_name + "-tab";
  if (active) {
    tab_head.className += " active";
  }

  var tourn_row = document.createElement("div");
  tourn_row.className = "row";
  var tourn_filler = document.createElement("div");
  tourn_filler.className = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
  tourn_row.appendChild(tourn_filler);
  tab_head.appendChild(tourn_row);

  var prelim_title = document.createElement("h3");
  var prelim = document.createTextNode("Prelims");
  prelim_title.appendChild(prelim);
  prelim_title.setAttribute("style", "text-align: center;");
  tourn_filler.appendChild(prelim_title);

  var table = document.createElement("table");
  table.className = "table table-hover general-table " + t_name + "-table";
  tourn_filler.appendChild(table);
  var thead = document.createElement("thead");
  table.appendChild(thead);
  
  var tr = document.createElement("tr");
  var round_th = document.createElement("th");
  var round_text = document.createTextNode("Round");
  round_th.appendChild(round_text);
  tr.appendChild(round_th);
  
  var aff_th = document.createElement("th");
  var aff_text = document.createTextNode("Aff")
  aff_th.appendChild(aff_text);
  tr.appendChild(aff_th);
  
  var neg_th = document.createElement("th");
  var neg_text = document.createTextNode("Neg");
  neg_th.appendChild(neg_text);
  tr.appendChild(neg_th);
  
  var dec_th = document.createElement("th");
  var dec_text = document.createTextNode("Decision");
  dec_th.appendChild(dec_text);
  tr.appendChild(dec_th);
  
  // NOTE TODO: add once judge info is with rounds  
  var judge_th = document.createElement("th");
  var judge_text = document.createTextNode("2NR");
  judge_th.className = "hidden-xs hidden-sm";
  judge_th.appendChild(judge_text);
  tr.appendChild(judge_th); 

  thead.appendChild(tr);
  table.appendChild(thead);
  return tab_head;
}

function generate_tournament_tabs(tournaments) { 
  var table = document.getElementsByClassName("tournament_nav")[0];
  for (var i = 0; i < tournaments.length; i ++ ) {
    var t_name = tournaments[i];
    var li = document.createElement("li");
    if (i == 0) {
      li.className = "active";
    }
    var a = document.createElement("a");
    var t_text = document.createTextNode(t_name);
    a.setAttribute("data-toggle", "tab");
    a.appendChild(t_text);
    a.href = "#" + t_name;
    a.className = "tourn-tab-" + t_name;
    li.appendChild(a);
    table.appendChild(li);
  }
}

function generate_tournaments(data, judge_id) { 
  var judge_prelims= data["prelim_rounds"]; 
  var judge_elims = data["elim_rounds"]; 
  var judge_tournaments = determine_judge_tournaments(judge_prelims, judge_elims); 

  generate_tournament_tabs(judge_tournaments); 
  console.log(judge_tournaments); 
  add_tab_content(); 
  for (var i = 0; i < judge_tournaments.length; i ++) {
    if (i == 0) {
      var active = true;
    } else {
      var active = false;
    }
    var t_name = judge_tournaments[i];
    var tab = document.getElementsByClassName("tournament_panel_tab")[0];
    var header = create_rounds_header(t_name, active);
    tab.appendChild(header);
    add_tab_click_handler(t_name);
    if (judge_elims.length > 0) { 
      for (var x = 0; x < judge_elims.length; x++) { 
        if (judge_elims[x]["tournament"] == judge_tournaments[i]) { 
          var elim_header = create_elim_rounds_header(judge_tournaments[i], header); 
          break; 
        }
      }
    }
    create_tournament_rounds(judge_prelims, judge_elims, judge_tournaments[i], judge_id);
  }
}

function determine_elim_round(round_num) {
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

function determine_judge_tournaments(judge_prelims, judge_elims) { 
  var judge_tournaments = []; 
  for (var i = 0; i < judge_prelims.length; i++) { 
    if (judge_tournaments.length == 0) { 
      judge_tournaments.push(judge_prelims[i]["tournament"]); 
    } else { 
      var add = true; 
      for (var j = 0; j < judge_tournaments.length; j++) { 
        if (judge_prelims[i]["tournament"] == judge_tournaments[j]) { 
          add = false; 
        }
      }
      if (add) { 
        judge_tournaments.push(judge_prelims[i]["tournament"]); 
      }
    }
  }

  for (var i = 0; i < judge_elims.length; i++) { 
    if (judge_tournaments.length == 0) { 
      judge_tournaments.push(judge_elims[i]["tournament"]); 
    } else { 
      var add = true; 
      for (var j = 0; j < judge_tournaments.length; j++) { 
        if (judge_elims[i]["tournament"] == judge_tournaments[j]) { 
          add = false; 
        }
      }
      if (add) { 
        judge_tournaments.push(judge_elims[i]["tournament"]); 
      }
    }
  }
  return judge_tournaments; 
}


function add_tab_content() { 
  var panel = document.getElementById("tournaments_panel");
  var panel_body = document.createElement("div");
  panel_body.className = "panel-body";

  var tab_content = document.createElement("div");
  tab_content.className = "tab-content tasi-tab tournament_panel_tab";
  panel_body.appendChild(tab_content);
  panel.appendChild(panel_body);
}

function add_tab_click_handler(t_name) {
  $(".tourn-tab-" + t_name).click(function() {
    var tab_id = $(this).attr("href");
    tab_id = "." + tab_id.slice(1, tab_id.length) + "-tab";
    if (!$(this).hasClass("active")) {
      console.log(tab_id);
      $(".tab-pane").removeClass("active");
      $(tab_id).addClass("active");
    }
  })
}

function generateJudgePage(data, id) { 
  $(".judge_name").text(data.judge_data.name); 
  generate_tournaments(data, id); 


}


$(document).ready(function() {
  var judge_id = $(".judge_id_hidden").attr("data-id"); 

  $.ajax({
      type: 'GET',
      url: kritstats.urls.base + "1/judge/" + judge_id,
      contentType: 'application/json',
      success: function (data) {
      	generateJudgePage(data, judge_id); 
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving team_info');
      },
      async: true
  });

}); 
