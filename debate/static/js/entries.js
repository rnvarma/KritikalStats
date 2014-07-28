function mainPagePopulate(tournament){
	$.ajax({
    type: 'GET',
    url: location.protocol + "//" + location.hostname + ":8000/1/tournament/",
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
      console.log('There is an error in quering for ' + tournament + ' in roundQuery');
    },
    async: true
});
}

function mainPagePopulateHelper(tournament, prelim){
	$.ajax({
    type: 'GET',
    url: location.protocol + "//" + location.hostname + ":8000/1/tournament/" + tournament + '/entries/',
    contentType: 'application/json',
    success: function (data) {
      tableHeaders(tournament)
      populateMasterColumn(tournament, data, prelim)
    },
    error: function(a , b, c){
      console.log('There is an error in quering for ' + tournament + ' in roundQuery');
    },
    async: true
});
}

function tableHeaders(tournament){
  var table = document.getElementById("table-" + tournament + "-Entries")
  var sectionGroup = document.createElement('div');
  sectionGroup.className = "section group tableheader";
  var header = document.createElement('div');
  header.className = "col";
  var node1 = document.createTextNode("Team Code");
  header.appendChild(node1);
  table.appendChild(sectionGroup);
  sectionGroup.appendChild(header);
}

function populateMasterColumn(tournament, entryData, prelim){
	var table = document.getElementById("table-" + tournament + "-Entries")
	for (j = 0; j < entryData.length; j++){
	  var sectionGroup = document.createElement('div');
    sectionGroup.setAttribute("data-href", location.protocol + "//" + location.hostname + ":8000/team/" + entryData[j]['team_id'].toString());
	  sectionGroup.className = "section";
	  sectionGroup.className += " group entry";
	  if (j%2 == 0){
	  	sectionGroup.className += " standardeven";
	  }
	  else {
	  	sectionGroup.className += " standardodd";
	  }
	  sectionGroup.id = entryData[j]['team_id']
	  team_id = entryData[j]['team_id']
	  var teamName = document.createElement('div');
	  teamName.className = "col";
	  var node = document.createTextNode(entryData[j]['team_code'])
	  teamName.appendChild(node);
	  //each container's ID is labeled under this format
	  //[tournament]-[TYPE]-[team_id]
	  //ex: Berkeley-round1-1
	  sectionGroup.appendChild(teamName);
	  table.appendChild(sectionGroup);
	}
  $(".entry").click(function() {
    var href = $(this).attr("data-href");
    window.location.href = href;
  })
}

$(document).ready(function() {
  var tournament = $(".entries").attr("data-tournament");

  var divMain = document.getElementById('container-' + tournament + '-Entries')
  var header = document.createElement('div');
  header.className = "page_header";
  var title = document.createElement("div");
  title.className = 'page_title';
  var node = document.createTextNode(tournament + ' Entries');
  title.appendChild(node);
  var divTable = document.createElement("div");
  divTable.id = 'table-' + tournament + '-Entries';
  divTable.className = "entry_table";
  header.appendChild(title);

  var full_page = document.createElement('div');
  full_page.className = 'full_page';
  full_page.appendChild(divTable);

  divMain.appendChild(header);
  divMain.appendChild(full_page);

  mainPagePopulate(tournament);

});
