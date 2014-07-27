function mainPagePopulate(tournament){
	$.ajax({
    type: 'GET',
    url: "http://127.0.0.1:8000/1/tournament/",
    contentType: 'application/json',
    success: function (data) {
      var prelim;
      for (i=0;i<data.length;i++){
        if (data[i].tournament_name == tournament){
          prelim = data[i].prelims
        }
      } 
  	  
  	  mainPagePopulateHelper(tournament, prelim)

    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in mainPagePopulate');
    },
    async: true
});
}

function mainPagePopulateHelper(tournament, prelim){
	$.ajax({
    type: 'GET',
    url: "http://127.0.0.1:8000/1/tournament/" + tournament + '/entries/',
    contentType: 'application/json',
    success: function (data) {
      entryList = [];
      //console.log(data);
      for (i=0;i<data.length;i++){
        entryList.push([data[i].team_name]);
      }

      //makes the headers
      tableHeaders(tournament, prelim);

      //makes the side column in the main page
      populateMasterColumn(tournament, data, prelim);
      roundQuery(tournament);
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in mainPagePopulateHelper');
    },
    async: true
});
}

function tableHeaders(tournament, prelim){
  var table = document.getElementById("table-" + tournament + "-Main")
  var sectionGroup = document.createElement('div');
  sectionGroup.className = "section group tableheader";
  var teamName = document.createElement('div');
  teamName.className = "col teamName";
  var node1 = document.createTextNode('Team Code');
  table.appendChild(sectionGroup);
  teamName.appendChild(node1);
  sectionGroup.appendChild(teamName);
  var record = document.createElement('div');
  record.className = "col record"
  var node2 = document.createTextNode('W-L');
  record.appendChild(node2);
  sectionGroup.appendChild(record);
  for (i=0; i<prelim; i++){
    var round = document.createElement('span');
    round.className = "col round" + prelim
    var roundNumber = i + 1 
    var node3 = document.createTextNode('Round ' + roundNumber);
    round.appendChild(node3);
    sectionGroup.appendChild(round);
  }
}

function populateMasterColumn(tournament, entryData, prelim){
	var table = document.getElementById("table-" + tournament + "-Main")
	for (j = 0; j < entryData.length; j++){
	  var sectionGroup = document.createElement('div');
	  sectionGroup.className = "section";
	  sectionGroup.className += " group";
	  sectionGroup.id = entryData[j]['team_id']
	  team_id = entryData[j]['team_id']
	  var teamName = document.createElement('div');
	  teamName.className = "col teamName";
	  var node = document.createTextNode(entryData[j]['team_code'])
	  teamName.appendChild(node);
	  //each container's ID is labeled under this format
	  //[tournament]-[TYPE]-[team_id]
	  //ex: Berkeley-round1-1
	  sectionGroup.appendChild(teamName);
	  table.appendChild(sectionGroup);
	  var record = document.createElement('div');
	  record.className = "col record";
	  record.id = tournament + '-record-' + team_id
    record.setAttribute("data-wins", "0");
    record.setAttribute("data-losses", "0");

	  //Gary Lin
	  sectionGroup.appendChild(record);
	  for (y = 0; y<prelim; y++){
	  	var round = document.createElement('span');
	  	round.className = "col round" + prelim
	  	x = y + 1
	  	round.id = tournament + '-round' + x + '-'+  team_id
	  	sectionGroup.appendChild(round);
	  }

	}

}


function assign_records(tournament) {
  var first_item = true;
  $(".record").each(function() {
    if (first_item) {
      first_item = false;
    } else {
      var wins = $(this).attr("data-wins");
      var losses = $(this).attr("data-losses");
      var record = wins + " - " + losses;
      $(this).text(record);
    }
  })
}

function roundQuery(tournament){
  $.ajax({
      type: 'GET',
      url: "http://127.0.0.1:8000/1/tournament/" + tournament + '/round/',
      contentType: 'application/json',
      success: function (data) {
        if (data.rounds.length > 0){
          for (var r_index = 0; r_index < data.rounds.length; r_index++) {
            populateMain(tournament, data.rounds[r_index]);
          }
          assign_records(tournament);
        }
      },
      error: function(a , b, c){
        console.log('There is an error in quering for ' + tournament + ' in roundQuery');
      },
      async: true
  });
}

function populateMain (tournament, data){
  var aff_record_cls = "#" + tournament + "-record-" + data.aff_id
  var neg_record_cls = "#" + tournament + "-record-" + data.neg_id
  var elementAff = document.getElementById(tournament + '-round' + data.round_num + '-' + data.aff_id);
  if (data.aff_id == data.winner){
    elementAff.className += ' win'
    var wins = $(aff_record_cls).attr("data-wins");
    $(aff_record_cls).attr("data-wins", (Number(wins) + 1).toString());
  }
  else {
    elementAff.className += ' lose'
    var losses = $(aff_record_cls).attr("data-losses");
    $(aff_record_cls).attr("data-losses", (Number(losses) + 1).toString());
  }
  var nodeAff = document.createTextNode(data.neg_code);
  elementAff.appendChild(nodeAff);
  var elementNeg = document.getElementById(tournament + '-round' + data.round_num + '-' + data.neg_id);
  if (data.neg_id == data.winner){
    elementNeg.className += ' win'
    var wins = $(neg_record_cls).attr("data-wins");
    $(neg_record_cls).attr("data-wins", (Number(wins) + 1).toString());
  }
  else {
    elementNeg.className += ' lose'
    var losses = $(neg_record_cls).attr("data-losses");
    $(neg_record_cls).attr("data-losses", (Number(losses) + 1).toString());
  }
  var nodeNeg = document.createTextNode(data.aff_code);
  elementNeg.appendChild(nodeNeg);
  
}

$(document).ready(function() {
  var tournament = $(".main_page").attr("data-tournament");
  console.log($("#active-" + tournament));
  $("#active-" + tournament).addClass("active");

  var divMain = document.getElementById('container-' + tournament + '-Main')
  var header = document.createElement("div");
  header.className = "page_header";
  var title = document.createElement("div");
  title.className = 'page_title';
  var node = document.createTextNode(tournament + ' Main Sheet');
  title.appendChild(node);

  var full_page = document.createElement('div');
  full_page.className = 'full_page';

  var divTable = document.createElement("div");
  divTable.id = 'table-' + tournament + '-Main';
  divTable.className = "entry_table";
  header.appendChild(title);

  filler1 = document.createElement('div');
  filler1.className = 'after_header_seperator';
  filler2 = document.createElement('div');
  filler2.className = 'after_header_grey';

  full_page.appendChild(divTable);

  divMain.appendChild(header);
  divMain.appendChild(filler1);
  divMain.appendChild(filler2);
  divMain.appendChild(full_page);

  mainPagePopulate(tournament);
});
