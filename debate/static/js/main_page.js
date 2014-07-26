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
    var round = document.createElement('div');
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
	  if (j%2 == 0){
	  	sectionGroup.className += " standardeven";
	  }
	  else {
	  	sectionGroup.className += " standardodd";
	  }
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

	  //Gary Lin
	  sectionGroup.appendChild(record);
	  for (y = 0; y<prelim; y++){
	  	var round = document.createElement('div');
	  	round.className = "col round" + prelim
	  	x = y + 1
	  	round.id = tournament + '-round' + x + '-'+  team_id
	  	sectionGroup.appendChild(round);
	  }

	}

}

function roundQuery(tournament){
  $.ajax({
      type: 'GET',
      url: "http://127.0.0.1:8000/1/tournament/" + tournament + '/round/',
      contentType: 'application/json',
      success: function (data) {
        //console.log(tournament + ' ' + data.rounds.length)
        if (data.rounds.length > 0){
          var currentRound = data.curr_round;
          if (currentRound == 0){
            currentRound = 7;
          }
          //console.log(data.rounds[0]['round_num'])
          x = 0;
          for (t=0; t<currentRound; t++){
          round = currentRound + 1
            while (data.rounds[x]['round_num'] <= round){
              populateMain(tournament, data['rounds'][x]);
              x += 1;
            }
          }

        }
        

      },
      error: function(a , b, c){
        console.log('There is an error in quering for ' + tournament + ' in roundQuery');
      },
      async: true
  });
}

function populateMain (tournament, data){
  //console.log(tournament + '-round' + data.round_num + '-' + data.aff_id);
  console.log(tournament + '-round' + data.round_num + '-' + data.aff_id);
  var elementAff = document.getElementById(tournament + '-round' + data.round_num + '-' + data.aff_id);
  var nodeAff = document.createTextNode(data.neg_code);
  elementAff.appendChild(nodeAff);
  var elementNeg = document.getElementById(tournament + '-round' + data.round_num + '-' + data.neg_id);
  var nodeNeg = document.createTextNode(data.aff_code);
  elementNeg.appendChild(nodeNeg);
  
}

$(document).ready(function() {
  var tournament = $(".main_page").attr("data-tournament");
  console.log($("#active-" + tournament));
  $("#active-" + tournament).addClass("active");

  var divMain = document.getElementById('container-' + tournament + '-Main')
  var header = document.createElement("div");
  header.className = "header";
  var h1 = document.createElement("h1");
  h1.className = 'page-header';
  var node = document.createTextNode(tournament + ' Main Sheet');
  h1.appendChild(node);
  var divTable = document.createElement("div");
  divTable.id = 'table-' + tournament + '-Main';
  divTable.className = "entry_table";
  header.appendChild(h1);
  divMain.appendChild(header);
  divMain.appendChild(divTable);

  mainPagePopulate(tournament);
  roundQuery(tournament);

});
