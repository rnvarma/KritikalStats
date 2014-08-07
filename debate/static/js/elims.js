//sunnys bracket code

function createOneRound(rd_type, divNum, divHeight) { 
  var rd = document.createElement("div"); 
  if (divNum == 0) { 
    var rest = document.createElement("div"); 
    rd.className = "top_elim_round"; 
    rest.className = rd_type; 
    rd.style.height = (divHeight / 2); 
  } else if (divNum % 2 == 1) { 
    rd.className = rd_type; 
    rd.style.borderRight = "thin solid black"
  } else { 
    rd.className = rd_type; 
  }
  var label = document.createElement("div"); 
  label.className = "bracket_text";
  var some_label = document.createTextNode("000"); 
  label.appendChild(some_label); 
  rd.appendChild(label); 
  return rd; 
}


function createRounds(column, round_type, rounds_to_make, divNum, divHeight) { 
    column.appendChild(createOneRound(round_type, divNum, divHeight));  
}



function generateRoundColumn(column, elim_round) { 
  var rounds_to_create = 0; 
  var height = 0; 
  switch(elim_round) { 
    case "doubles": 
      rounds_to_create = 32; 
      height = 32; 
      break; 
    case "octos": 
      rounds_to_create = 16; 
      height = 64; 
      break; 
    case "quarters": 
      rounds_to_create = 8; 
      height = 128; 
      break; 
    case "semifinals": 
      rounds_to_create = 4; 
      height = 256; 
      break;
    case "finals": 
      rounds_to_create = 2; 
      height = 512; 
      break;
    case "champion": 
      rounds_to_create = 1; 
      height = 1024; 
      break; 
    default: 
      return; 
    }
  for (var i = 0; i < rounds_to_create; i++) { 
      createRounds(column, elim_round, rounds_to_create, i, height); 
  }
}

function make_bracket(){
  var elimRounds = ["doubles", "octos", "quarters", "semifinals", "finals", "champion"];
  var columns = document.getElementsByClassName("col"); 
  for (var i = 0; i < columns.length; i ++) { 
    generateRoundColumn(columns[i], elimRounds[i]); 
  }
}

function make_framework(){
  var panel_body = document.createElement('div');
  panel_body.className = "panel-body bracket_box";
  
  var col0 = document.createElement('div');
  col0.className = "col"
  var col1 = document.createElement('div');
  col1.className = "col"
  var col2 = document.createElement('div');
  col2.className = "col"
  var col3 = document.createElement('div');
  col3.className = "col"
  var col4 = document.createElement('div');
  col4.className = "col"
  var col5 = document.createElement('div');
  col5.className = "col"

  panel_body.appendChild(col0);
  panel_body.appendChild(col1);
  panel_body.appendChild(col2);
  panel_body.appendChild(col3);
  panel_body.appendChild(col4);
  panel_body.appendChild(col5);

  colList = [col0, col1, col2, col3, col4, col5]

  var elimRounds = ["doubles", "octos", "quarters", "semifinals", "finals", "champion"];
  for (var i = 0; i < elimRounds.length; i ++) { 
    generateRoundColumn(colList[i], elimRounds[i]); 
  }

  return panel_body
}


//elim code

function create_elim_tabs(tournament_data){
  var table = document.getElementsByClassName("tournament_nav")[0];
  var elim_size = tournament_data.breaks_to
  if (elim_size == 64){
    tab_list = ['Triples', 'Doubles', 'Octos', 'Quarters', 'Semis', 'Finals', 'Bracket' ]
  }
  else if (elim_size == 32){
    tab_list = ['Doubles', 'Octos', 'Quarters', 'Semis', 'Finals', 'Bracket' ]
  }
  else if (elim_size == 16){
    tab_list = ['Octos', 'Quarters', 'Semis', 'Finals', 'Bracket' ]
  }
  else if (elim_size == 8){
    tab_list = ['Quarters', 'Semis', 'Finals', 'Bracket' ]
  }
  else if (elim_size == 4){
    tab_list = ['Semis', 'Finals', 'Bracket' ]
  }
  else if (elim_size == 2){
    tab_list = ['Finals', 'Bracket' ]
  }
  for (var i = 0; i < tab_list.length; i ++ ) {
    var tab_name = tab_list[i];
    var li = document.createElement("li");
    if (i == 0) {
      li.className = "active";
    }
    var a = document.createElement("a");
    var tab_text = document.createTextNode(tab_name);
    a.setAttribute("data-toggle", "tab");
    a.appendChild(tab_text);
    a.href = "#" + tab_name;
    a.className = "tourn-tab-" + tab_name;
    li.appendChild(a);
    table.appendChild(li);
  }

  return tab_list

}

function add_tab_content() {
  var panel = document.getElementById("elims_panel");
  var panel_body = document.createElement("div");
  panel_body.className = "panel-body";

  var tab_content = document.createElement("div");
  tab_content.className = "tab-content tasi-tab tournament_panel_tab";
  panel_body.appendChild(tab_content);
  panel.appendChild(panel_body);
}

function make_tab_page(tab_name, active){
  if (tab_name == 'Bracket'){
    var tab_head = make_framework()
  }

  else {
    var tab_head = document.createElement("div");
    tab_head.id = "#" + tab_name;
    tab_head.className = "tab-pane " + tab_name + "-tab";
    if (active) {
      tab_head.className += " active";
    }

    var main_scroll_div = document.createElement("div");
    main_scroll_div.className = "row";
    var main_scroll_filler = document.createElement("div");
    main_scroll_filler.className = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
    var section_div = document.createElement("section");
    section_div.className = "panel";
    var panel_body_div = document.createElement("div");
    panel_body_div.className = "panel-body";
    panel_body_div.style.height = "70%";
    panel_body_div.style.overflow = "scroll";
    var section_scroll = document.createElement("section");
    section_scroll.id = "flip-scroll";
    var table = document.createElement("table");
    table.className = "table table-hover general-table"
    var table_head = document.createElement("thead");
    table_head.className = "cf";
    var tr = document.createElement("tr");
    tr.className = "main_table_header";
    var th_aff = document.createElement("th");
    var th_aff_text = document.createTextNode("Aff");
    th_aff.appendChild(th_aff_text);
    var th_neg = document.createElement("th");
    var th_neg_text = document.createTextNode("Neg");
    th_neg.appendChild(th_neg_text);
    var th_judge1 = document.createElement("th");
    var th_judge1_text = document.createTextNode("Judge 1");
    th_judge1.appendChild(th_judge1_text);
    var th_judge2 = document.createElement("th");
    var th_judge2_text = document.createTextNode("Judge 2");
    th_judge2.appendChild(th_judge2_text);
    var th_judge3 = document.createElement("th");
    var th_judge3_text = document.createTextNode("Judge 3");
    th_judge3.appendChild(th_judge3_text);
    var th_1ac = document.createElement("th");
    var th_1ac_text = document.createTextNode("1AC");
    th_1ac.appendChild(th_1ac_text);
    var th_1nc = document.createElement("th");
    var th_1nc_text = document.createTextNode("1NC");
    th_1nc.appendChild(th_1nc_text);
    var th_2nr = document.createElement("th");
    var th_2nr_text = document.createTextNode("2NR");
    th_2nr.appendChild(th_2nr_text);

    tr.appendChild(th_aff);
    tr.appendChild(th_neg);
    tr.appendChild(th_judge1);
    tr.appendChild(th_judge2);
    tr.appendChild(th_judge3);
    tr.appendChild(th_1ac);
    tr.appendChild(th_1nc);
    tr.appendChild(th_2nr);
    table_head.appendChild(tr);
    table.appendChild(table_head);
    section_scroll.appendChild(table);
    panel_body_div.appendChild(section_scroll);
    section_div.appendChild(panel_body_div);
    main_scroll_filler.appendChild(section_div)
    main_scroll_div.appendChild(main_scroll_filler);
    tab_head.appendChild(main_scroll_div);
  }

  return tab_head
}

function add_tab_click_handler(tab_name){
  $(".tourn-tab-" + tab_name).click(function() {
    var tab_id = $(this).attr("href");
    tab_id = "." + tab_id.slice(1, tab_id.length) + "-tab";
    if (!$(this).hasClass("active")) {
      $(".tab-pane").removeClass("active");
      $(tab_id).addClass("active");
    }
  })
}

function load_tabs(tab_list){
  for (i = 0; i<tab_list.length; i++){
    if (i == 0) {
      var active = true;
    }
    else{
      var active = false;
    }

    var tab_name = tab_list[i];
    var tab = document.getElementsByClassName("tournament_panel_tab")[0];
    var tab_page = make_tab_page(tab_name, active);
    tab.appendChild(tab_page);
    add_tab_click_handler(tab_name);
    //call function and make query to populate the page
    //similar to team.js load_tournament_rounds
  }
}

function load_elims(data,tournament){
  for (i=0; i<data.length; i++){
    if (data[i].tournament_name == tournament){
      tab_list = create_elim_tabs(data[i]);
      add_tab_content();
      load_tabs(tab_list);
    }
  }
}

$(document).ready(function () {
  var tournament = $(".elims_hidden").attr("data-tournament");
  $.ajax({
      type: 'GET',
      url: location.protocol + "//" + location.hostname + ":8000/1/tournament/",
      contentType: 'application/json',
      success: function (data) {
        load_elims(data, tournament);
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving team_info');
      },
      async: true
  });
})