var allElims = ["Triples", "Doubles", "Octos", "Quarters", "Semifinals", "Finals", "Champion"]
var allTabs = ["Triples", "Doubles", "Octos", "Quarters", "Semifinals", "Finals", "Bracket"]
var elimTeamsDict = {"Triples": 64, "Doubles": 32, "Octos": 16, "Quarters": 8, "Semifinals": 4,
"Finals": 2, "Champion": 1, "Bracket": 0}; 
var elimRoundsDict = {32: "Triples", 16: "Doubles", 8: "Octos", 4: "Quarters", 2: "Semifinals", 1: "Finals"}; 
var elimRounds = []; 
var tabList = []; 
var cleared_teams = 0; 


//tab generation code
function add_tab_content() {
  var panel = document.getElementById("elims_panel");
  var panel_body = document.createElement("div");
  panel_body.className = "panel-body";
  var tab_content = document.createElement("div");
  tab_content.className = "tab-content tasi-tab tournament_panel_tab";
  panel_body.appendChild(tab_content);
  panel.appendChild(panel_body);
}


function make_tab_page(tab_name, active, tournament, tab){
  if (tab_name == 'Bracket'){
    return make_bracket(tab_name, active, tournament, tab); 
  } else {
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

    var columns = ["Aff", "Neg", "Judge 1", "Judge 2", "Judge 3", "1AC", "1NC", "2NR"]; 
    for (var i = 0; i < columns.length; i++) { 
      var th_add = document.createElement("th"); 
      var th_fill_text = document.createTextNode(columns[i]); 
      th_add.appendChild(th_fill_text); 
      tr.appendChild(th_add); 
    }

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


function make_bracket(tab_name, active, tournament, tab) { 
    $.ajax({
      type: 'GET',
      url: kritstats.urls.base + "1/tournament/" + tournament["tournament_name"] + '/bracket/',
      contentType: 'application/json',
      success: function (data) {
        tab_head = generateBracket(data); 
        tab.appendChild(tab_head)
        add_tab_click_handler(tab_name);
      },
      error: function(a , b, c){
        console.log('There is an error in quering for ' + tournament["tournament_name"] + 'for the bracket');
      },
      async: true
    });
}

function generateBracket(tournament_data) { 
  var panel_body = document.createElement('div');
  var tournament_bracket = tournament_data["bracket_list"]; 
  var filled_divs = Math.pow(2, elimRounds.length) - 1; 
  panel_body.className = "panel-body bracket_box tab-pane Bracket-tab";
  panel_body.id = "#Bracket";

  for (var i = 0; i < (allElims.length - restrict); i++) {
    elimRounds[i] = allElims[restrict + i]; 
    var elim_col = document.createElement("div"); 
    elim_col.className = "col"; 
    panel_body.appendChild(elim_col); 
    generateRoundColumn(tournament_data, elim_col, elimRounds[i], filled_divs); 
    filled_divs = filled_divs - elimTeamsDict[elimRounds[i]]; 
  }
  return panel_body
}


function generateRoundColumn(tournament, column, elim_round, div_to_fill) { 
  var rounds_to_create = elimTeamsDict[elim_round]; 
  var height = 0; 
  switch(elim_round) { 
    case "Doubles": 
      divHeight = 32; 
      break; 
    case "Octos": 
      divHeight = 64; 
      break; 
    case "Quarters": 
      divHeight = 128; 
      break; 
    case "Semifinals": 
      divHeight = 256; 
      break;
    case "Finals": 
      divHeight = 512; 
      break;
    case "Champion": 
      divHeight = 1024; 
      break; 
    default: 
      return; 
    }
  for (var divNum = 0; divNum < rounds_to_create; divNum++) { 
    column.appendChild(createOneRound(tournament, elim_round, divNum, divHeight, div_to_fill)); 
    div_to_fill--; 
  }
}


function createOneRound(tournament, rd_type, divNum, divHeight, div_to_fill) { 
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
  console.log("dtf: " + div_to_fill); 
  var seed = tournament["bracket_list"][div_to_fill]; 
  var some_label = document.createTextNode("Team " + tournament["seeds"][seed]); 
  label.appendChild(some_label); 
  rd.appendChild(label); 
  return rd; 
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


function load_tabs(tab_list, tournament){
  for (var i = 0; i<tab_list.length; i++){
    if (i == 0) {
      var active = true;
    }
    else{
      var active = false;
    }

    var tab_name = tab_list[i];
    var tab = document.getElementsByClassName("tournament_panel_tab")[0];
    var tab_page = make_tab_page(tab_name, active, tournament, tab);
    if (!(tab_name == "Bracket")) {
      tab.appendChild(tab_page);
      add_tab_click_handler(tab_name);
    }
    //call function and make query to populate the page
    //similar to team.js load_tournament_rounds
  }
}


function populate_elim(elim_data){
  if (elim_data.length > 0){
    var elim_name = elimRoundsDict[elim_data.length]     
    var table = document.getElementById('table-' + elim_name);
    var tbody = fill_elim_page(elim_data);
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


function load_elims(tournament){
  determineElims(tournament["breaks_to"]); 
  create_elim_tabs(tabList);
  add_tab_content();
  load_tabs(tabList, tournament);

  for (var i = 0; i < tabList.length; i++) { 
    var elim_value = elimTeamsDict[tabList[i]]; 
    $.ajax({
      type: 'GET',
      url: kritstats.urls.base + "1/tournament/" + tournament["tournament_name"] + '/elim_round/' + elim_value,
      contentType: 'application/json',
      success: function (data) {
        populate_elim(data.rounds);
        row_click_handler();
      },
      error: function(a , b, c){
        console.log('There is an error in quering for ' + tournament["tournament_name"] + 'for ' + elim_value + ' in load elims');
      },
      async: true
    });
  }
}

function determineElims(num_clear) { 
  cleared_teams = num_clear; 
  if (cleared_teams <= 2) { 
    restrict = 5; 
  } else if (cleared_teams <= 4) { 
    restrict = 4; 
  } else if (cleared_teams <= 8) { 
    restrict = 3; 
  } else if (cleared_teams <= 16) {
    restrict = 2;   
  } else if (cleared_teams <= 32) { 
    restrict = 1; 
  } else { 
    elimRounds = allElims; 
  }   

  for (var i = 0; i < (allElims.length - restrict); i++) {
    elimRounds.push(allElims[restrict + i]); 
    tabList.push(allTabs[restrict + i]); 
  }
}


function create_elim_tabs(tabList){
  var table = document.getElementsByClassName("tournament_nav")[0];
  var elim_size = cleared_teams; 

  for (var i = 0; i < tabList.length; i ++ ) {
    var tab_name = tabList[i];
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
        for (var i = 0; i < data.length; i++) {
          if (data[i].tournament_name == tournament){
            load_elims(data[i]); 
          }
        }
      },
      error: function(a , b, c){
        console.log('There is an error in retrieving team_info');
      },
      async: true
  });
});
