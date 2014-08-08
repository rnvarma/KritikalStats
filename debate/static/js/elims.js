/* 
var theTOC = {
        "tournament_name": "TOC", 
        "num_entries": 85, 
        "start_date": 20140426, 
        "end_date": 20140428, 
        "bid_round": 0, 
        "prelims": 7, 
        "breaks_to": 16, 
        "curr_rounds": 0, 
        "loc": "Lexington, Kentucky", 
        "bracket": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 16, 8, 9, 4, 
        13, 5, 12, 2, 15, 7, 10, 3, 14, 6, 11, 1, 'XX', 16, 'XX', 8, 'XX', 9, 'XX', 
        4, 'XX', 13, 'XX', 5, 'XX', 12, 'XX', 2, 'XX', 15, 'XX', 7, 'XX', 10, 'XX', 
        3, 'XX', 14, 'XX', 6, 'XX', 11, 'XX'], 
        "registration_date": ""
    }
*/ 

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


function generateRoundColumn(column, elim_round) { 
  var rounds_to_create = 0; 
  var height = 0; 
  switch(elim_round) { 
    case "Doubles": 
      rounds_to_create = 32; 
      divHeight = 32; 
      break; 
    case "Octos": 
      rounds_to_create = 16; 
      divHeight = 64; 
      break; 
    case "Quarters": 
      rounds_to_create = 8; 
      divHeight = 128; 
      break; 
    case "Semifinals": 
      rounds_to_create = 4; 
      divHeight = 256; 
      break;
    case "Finals": 
      rounds_to_create = 2; 
      divHeight = 512; 
      break;
    case "Champion": 
      rounds_to_create = 1; 
      divHeight = 1024; 
      break; 
    default: 
      return; 
    }
  for (var divNum = 0; divNum < rounds_to_create; divNum++) { 
      column.appendChild(createOneRound(elim_round, divNum, divHeight)); 
  }
}


function make_framework(tournament){
  var allElims = ["Triples", "Doubles", "Octos", "Quarters", "Semifinals", "Finals", "Champion"];
  var panel_body = document.createElement('div');
  var elims = []; 
  var columns = []; 
  var tournament_bracket = []; //to be dynamic tournament["bracket"]; 
  var cleared_teams = 32; //to be dynamic tournament_bracket.seed_array.length; 
  panel_body.className = "panel-body bracket_box tab-pane Bracket-tab";
  panel_body.id = "#Bracket";

  if (cleared_teams <= Math.pow(2, 1)) { 
    restrict = 5; 
  } else if (cleared_teams <= Math.pow(2, 2)) { 
    restrict = 4; 
  } else if (cleared_teams <= Math.pow(2, 3)) { 
    restrict = 3; 
  } else if (cleared_teams <= Math.pow(2, 4)) {
    restrict = 2;   
  } else if (cleared_teams <= Math.pow(2, 5)) { 
    restrict = 1; 
  } else { 
    elims = allElims; 
  } 

  for (var i = 0; i < (allElims.length - restrict); i++) {
    elims[i] = allElims[restrict + i]; 
    var elim_col = document.createElement("div"); 
    elim_col.className = "col"; 
    panel_body.appendChild(elim_col); 
    columns[i] = elim_col; 
  }

  for (var i = 0; i < columns.length; i++) { 
    generateRoundColumn(columns[i], elims[i]); 
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
    var tab_head = make_framework("aTOC"); //to be dynamic soon
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
    table.id = "table-" + tab_name
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

function populate_elim(elim_data){
  if (elim_data.length > 0){
    if (elim_data.length == 16){
      var elim_name = "Doubles"
    }
    else if (elim_data.length == 8){
      var elim_name = "Octos"
    }
    else if (elim_data.length == 4){
      var elim_name = "Quarters"
    }
    else if (elim_data.length == 2){
      var elim_name = "Semis"
    }
    else if (elim_data.length == 1){
      var elim_name = "Finals"
    }

    
    var table = document.getElementById('table-' + elim_name);
    //console.log(table)
    var tbody = fill_elim_page(elim_data);
    //console.log(elim_data);
    table.appendChild(tbody);
  }

}

function is_in(item, list) {
  for (var i = 0; i < list.length; i ++) {
    if (item == list[i]) {
      return true;
    }
  }
  return false;
}

function add_judge_background(elim_data, td, j_num) {
  if (is_in(elim_data.judge[j_num], elim_data.aff_votes)) {
    if (elim_data.aff_id == elim_data.winner){
      td.className += " bg-success";
    } else {
      td.className += " bg-danger";
    }
  } else if (is_in(elim_data.judge[j_num], elim_data.neg_votes)) {
    if (elim_data.aff_id == elim_data.winner){
      td.className += " bg-danger";
    } else {
      td.className += " bg-success";
    }
  }
}

function fill_elim_page(elim_data){
  var row_headers = ['Aff', 'Neg', 'Judge1', 'Judge2', 'Judge3', '1AC', '1NC', '2NR']
  var tbody = document.createElement('tbody');
  tbody.className = 'elim_page_table'
  for (i=0; i<elim_data.length; i++){
    var tr = document.createElement('tr');
    tr.className = "team-row round-row-" + elim_data[i].round_id;
    tr.id = "row-" + elim_data[i].round_id;
    for (j=0; j<row_headers.length; j++){
      var td = document.createElement('td');
      td.className = row_headers[j];
      if (row_headers[j] == 'Aff'){
        td.id = elim_data[i].aff_id;
        if (elim_data[i].winner == elim_data[i].aff_id) {
          td.className += " bg-bright-win";
        } else if (elim_data[i].winner == elim_data[i].neg_id) {
          td.className += " bg-bright-loss";
        }
      }
      if (row_headers[j] == 'Neg'){
        td.id = elim_data[i].neg_id;
        if (elim_data[i].winner == elim_data[i].neg_id) {
          td.className += " bg-bright-win";
        } else if (elim_data[i].winner == elim_data[i].aff_id) {
          td.className += " bg-bright-loss";
        }
      }

      if (row_headers[j] == 'Aff'){
        var td_text = document.createTextNode(elim_data[i].aff_code);
      }
      else if (row_headers[j] == 'Neg'){
        var td_text = document.createTextNode(elim_data[i].neg_code);
      }
      else if (row_headers[j] == 'Judge1'){
        console.log(elim_data[i].judge[0]);
        console.log(elim_data[i].neg_votes)
        var td_text = document.createTextNode(elim_data[i].judge[0]);
        add_judge_background(elim_data[i], td, 0);
      }
      else if (row_headers[j] == 'Judge2'){
        var td_text = document.createTextNode(elim_data[i].judge[1]);
        add_judge_background(elim_data[i], td, 1);
      }
      else if (row_headers[j] == 'Judge3'){
        var td_text = document.createTextNode(elim_data[i].judge[2]);
        add_judge_background(elim_data[i], td, 2);
      }
      else if (row_headers[j] == '1AC'){
        var td_text = document.createTextNode('');
      }
      else if (row_headers[j] == '1NC'){
        var td_text = document.createTextNode('');
      }
      else if (row_headers[j] == '2NR'){
        var td_text = document.createTextNode('');
      }
      td.appendChild(td_text);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }
  return tbody;
}

function load_elims(data,tournament){
  for (var i = 0; i<data.length; i++){
    if (data[i].tournament_name == tournament){
      tab_list = create_elim_tabs(data[i]);
      add_tab_content();
      load_tabs(tab_list);
    }
  }

  var elim_value = '';
  for (j=0; j<tab_list.length; j++){
    if (tab_list[j] == "Doubles"){
      elim_value = 32
    }
    else if (tab_list[j] == "Octos"){
      elim_value = 16
    }
    else if (tab_list[j] == "Quarters"){
      elim_value = 8
    }
    else if (tab_list[j] == "Semis"){
      elim_value = 4
    }
    else if (tab_list[j] == "Finals"){
      elim_value = 2
    }

    $.ajax({
      type: 'GET',
      url: kritstats.urls.base + "1/tournament/" + tournament + '/elim_round/' + elim_value,
      contentType: 'application/json',
      success: function (data) {
        populate_elim(data.rounds);
        row_click_handler();
      },
      error: function(a , b, c){
        console.log('There is an error in quering for ' + tournament + 'for ' + elim_value + ' in load elims');
      },
      async: true
    });
  }

}

function row_click_handler(){
  $(".team-row").click(function() {
    var id = this.id
    id = id.substring(4)
    var url = kritstats.urls.base + "elim_round/" + id;
    window.location = url;
  })
}

$(document).ready(function () {
  var tournament = $(".elims_hidden").attr("data-tournament");
  $.ajax({
      type: 'GET',
      url: kritstats.urls.base + "1/tournament/",
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