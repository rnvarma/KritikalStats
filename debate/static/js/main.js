
$(document).ready(function() {

  //**
  //This is used to create the webpage
  //**
  function createPage(tournamentList){
    //makes sidebar
    for (i = 0; i < tournamentList.length; i++){
      var tournament = tournamentList[i];
      var liGroup = document.createElement("li");
      liGroup.id= "active-" + tournament;
      var aGroup = document.createElement("a");
      aGroup.className = "tournament";
      aGroup.setAttribute("id", tournament);
      aGroup.href = "#" + tournament;
      var node = document.createTextNode(tournament);
      aGroup.appendChild(node);
      liGroup.appendChild(aGroup);
      var element = document.getElementById("sidebar-populate");
      element.appendChild(liGroup);


      var sidebar = ['Main Sheet', 'Entries', 'Bracket'];
      //makes subsidebar
      for (j = 0; j<sidebar.length; j++){
        var side = sidebar[j];
        var liGroup = document.createElement("li");
    	liGroup.className = 'subsidebar-' + tournament;
        if (side == 'Main Sheet'){
          liGroup.id= "active-" + tournament + '-' + 'Main';
        }
        else {
          liGroup.id= "active-" + tournament + '-' + side;
    	}
    	liGroup.style.display = "none";
        var aGroup = document.createElement("a");
        aGroup.className = "subsidebar";
        if (side == 'Main Sheet'){
          aGroup.setAttribute("id", tournament + '-'+ "Main");
          aGroup.id = tournament + '-'+ "Main";
          aGroup.href = "#" + "Main";
        }
        else {
          aGroup.setAttribute("id", tournament + '-'+ side);
    	  aGroup.href = "#" + side;
    	}
        var node = document.createTextNode(side);
        aGroup.appendChild(node);
        liGroup.appendChild(aGroup);
        var element = document.getElementById("sidebar-populate");
        element.appendChild(liGroup);
      }

      $('.subsidebar').click(function(scrollfix){
      	//Takes care of active sidebar
        var href = this.id;
        console.log(href);
        //$(href)

        //take off the subnav subactive
        $('.subactive').removeClass('subactive')
        
        $('#'+'active-'+href).addClass('subactive')

        
        //hide all pages
        HideHelper(href);

        //show the right page
        $('#container-' + href).show();


        //fixes scroll problem
        scrollfix.preventDefault();


        //Determine which subsidebar to populate
        //GARY LIN
        for (m = 0; m<sidebar.length; m++){

    	}


      })

    }



    //make the containers
    for (i = 0; i < tournamentList.length; i++){  
      var tournament = tournamentList[i];
      var divMain = document.createElement("div");
      divMain.id= "container-" + tournament;
      divMain.className = 'container';
      var h1 = document.createElement("h1");
      h1.className = 'page-header';
      var node = document.createTextNode(tournament);
      h1.appendChild(node);
      var entry_table = document.createElement("div");
      entry_table.className = "tourn_section";
      entry_table.id = "entry_section";
      var entry_text = document.createElement("div");
      entry_text.className = "tourn_section_title";
      var entry_name = document.createTextNode("Section_1");
      entry_text.appendChild(entry_name);
      entry_table.appendChild(entry_text);
      var divTable = document.createElement("div");
      divTable.id = 'table-' + tournament;
      divTable.className = "entry_table";
      entry_table.appendChild(divTable);
      divMain.appendChild(h1);
      divMain.appendChild(entry_table);

      var element = document.getElementById("container-master");
      element.appendChild(divMain);
    }

    //make the subcontainers
    for (l=0; l<tournamentList.length; l++){
      var tournament = tournamentList[l];
      for (m=0; m<sidebar.length; m++){
        if (sidebar[m] == 'Main Sheet'){
          href = 'Main';
        }
        else{
          href = sidebar[m];
        }
        var divMain = document.createElement("div");
        divMain.id= "container-" + tournament + '-' + href;
        divMain.className = 'container';
        var h1 = document.createElement("h1");
        h1.className = 'page-header';
        var node = document.createTextNode(tournament + ' ' + sidebar[m]);
        h1.appendChild(node);
        //add table div
        var divTable = document.createElement("div");
        divTable.id = 'table-' + tournament + '-' + this.href;
        divTable.className = "entry_table";
        divMain.appendChild(h1);
        divMain.appendChild(divTable);

        var element = document.getElementById("container-master");
        element.appendChild(divMain);


      }
      
      //makes tables
      entryQuery(tournament);

      //makes entries
      //Gary Lin
      //makes master column
      mastercolumn(tournament);
      roundQuery(tournament);
      //console.log('prelim ' + prelim);
      //console.log('roundQuery for ' + tournament);

    }

//DISREGARD THIS FOR NOW
/*    var fakeList = [{"winner": "undecided", "neg_team": "Tsao & Wiechman", "aff_code": "Rowland Hall RU", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Dallas Jesuit TW", "aff_team": "Ritter & Uchitel", "round_num": 1}, 
    {"winner": "undecided", "neg_team": "Xiao & Loftus", "aff_code": "Green Valley AB", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Johns Creek LX", "aff_team": "Horn & Bhatti", "round_num": 1}, 
    {"winner": "undecided", "neg_team": "enter_names", "aff_code": "Downtown Magnets AD", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Maywood Academy GS", "aff_team": "Antonio & Davis", "round_num": 1}, 
    {"winner": "undecided", "neg_team": "Aguilar & Chung", "aff_code": "St Francis GU", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Loyola AC", "aff_team": "Gu & Ram", "round_num": 1}, 
    {"winner": "undecided", "neg_team": "Lee & Hunter", "aff_code": "Niles West CM", "tournament": "Berkeley", "loser": "undecided", "neg_code": "St. Vincent De Paul HL", "aff_team": "Geraghty & McLellan", "round_num": 1}, 
    {"winner": "undecided", "neg_team": "Le & Samson", "aff_code": "Juan Diego Catholic CL", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Millard South H.s. LS", "aff_team": "Lewis & Zmyslo", "round_num": 1}];
    var href = "TOC";

    //$('#table-' + href).empty();
    //console.log('table_handle ' + href);

    for (i = 0; i < fakeList.length; i++){
      var list1 = fakeList[i];
      var sectionGroup1 = document.createElement("div");
      sectionGroup1.className = "section";
      sectionGroup1.className += " group";
      affTeam = list1.aff_team
      console.log(affTeam);
      var div1 = document.createElement('div');
      var node1 = document.createTextNode(affTeam);
      div1.className = "col";
      div1.className += " teamName";
      //if (j == 1) div.className += " record";
      //if (j > 1) div.className += " round6";
      if (i%2 == 0) {
      	sectionGroup1.className += " standardeven";
  	  }
      else {
      	sectionGroup1.className += " standardodd";
  	  }

      div1.appendChild(node1);  
      sectionGroup1.appendChild(div1); 
      var sectionGroup1 = document.createElement("div"); 
      var element1 = document.getElementById("table-TOC-Main");
      element1.appendChild(sectionGroup1);
      console.log('work nigga');
      } */

      

  }
  
  //**
  //Helper- hide/show pages 
  //**
  function HideHelper(){
  	//hide
    var sidebar = ['Main Sheet', 'Entries', 'Bracket'];
    for(i=0; i<tournamentList.length; i++){
      $('#container-' + tournamentList[i]).hide();
      for (k=0; k<sidebar.length; k++){
      	if (sidebar[k] == 'Main Sheet'){
  		  $('#container-' + tournamentList[i]+ '-' + 'Main').hide();
      	}
	    else{
	      $('#container-' + tournamentList[i]+ '-' + sidebar[k]).hide();
        }
      }
    }
    $('#container-' + 'home').hide();
    $('#container-' + 'about').hide();
    $('#container-' + 'admin').hide();
    $('#container-' + 'addTournament').hide();
  }
  function HideShowHelper(href) {
    dashIndex = -1;
    for(i=0; i<href.length; i++){
      if (href[i].valueOf() == '-'.valueOf()){
        var dashIndex = i;
      }
    }
    if (dashIndex != -1){
      href = href.substring(dashIndex + 1);
    }

    //hide
    var sidebar = ['Main Sheet', 'Entries', 'Bracket'];
    for(i=0; i<tournamentList.length; i++){
      $('#container-' + tournamentList[i]).hide();
      for (k=0; k<sidebar.length; k++){
      	if (sidebar[k] == 'Main Sheet'){
  		  $('#container-' + tournamentList[i]+ '-' + 'Main').hide();
      	}
	    else{
	      $('#container-' + tournamentList[i]+ '-' + sidebar[k]).hide();
        }
      }
    }
    $('#container-' + 'home').hide();
    $('#container-' + 'about').hide();
    $('#container-' + 'admin').hide();
    $('#container-' + 'addTournament').hide();


    //show
    $('#container-' + href).show();
 
    //makes the sidebar active
    //takes away active class
    for(i=0; i<tournamentList.length; i++){
      var link = $('#active-' + tournamentList[i])
      link.removeClass('active')
    }
    $('#active-' + 'home').removeClass('active')
    $('#active-' + 'about').removeClass('active')
    $('#active-' + 'admin').removeClass('active')
    $('#active-' + 'addTournament').removeClass('active')

    //adds active class
    $('#active-' + href).addClass('active');

    //subsidebar active
    $('.subactive').removeClass('subactive')
  }
 
  //**
  //When a tournament is clicked the right page is shown 
  //and the sidebar is active
  //**
  function tournament_handle(tournamentList) {
	  //when a tournament gets clicked
	  //creates the table
	  $('.tournament').click(function(scrollfix){
	    //opens the right page and makes sidebar active
	    var href = this.id;
	    //dashindex is used to handle the home page which
	    //can be accessed by two different buttons
	    HideShowHelper(href);

	    //fixes scroll problem
        scrollfix.preventDefault();


        //shows subsidebar

        for(m=0; m<tournamentList.length; m++){
        	tournament = tournamentList[m];
        	if (tournament!=href){
        	  $(".subsidebar-" + tournament).hide(300);
            }
    	}
        $(".subsidebar-" + href).show(400);


	  });
  }

  //**
  //This creates the table
  //currently set up for the mainpage
  //**
  function table_handle(tournament, entryList) {
	  //when a tournament gets clicked
	  //creates the table
	  	//console.log("got into tournament click");
	    var href = tournament;

	    $('#table-' + href).empty();
	    //console.log('table_handle ' + href);

	    for (i = 0; i < entryList.length; i++){
	      var list = entryList[i];
	      var sectionGroup = document.createElement("div");
	      sectionGroup.className = "section";
	      sectionGroup.className += " group";
	      for (j = 0; j < list.length; j++){
	        var div = document.createElement('div');
	        var node = document.createTextNode(list[j]);
	        div.className = "col";
	        if (j == 0) div.className += " teamName";
	        if (j == 1) div.className += " record";
	        //if (j > 1) div.className += " round6";
	        if (i%2 == 0) sectionGroup.className += " standardeven";
	        else sectionGroup.className += " standardodd";

	        div.appendChild(node);
	        sectionGroup.appendChild(div);
	        var element = document.getElementById("table-" + href + '-' + 'Entries');
	        element.appendChild(sectionGroup);
	      }
	    }
  }
  

  //**
  //Ajax request for entries
  //**
  function entryQuery(tournament){
    //queries for tournaments
    $.ajax({
      type: 'GET',
      url: "http://127.0.0.1:8000/1/tournament/" + tournament  + "/entries/",
      contentType: 'application/json',
      success: function (data) {
        entryList = [];
        //console.log(data);
        for (i=0;i<data.length;i++){
          entryList.push([data[i].team_name]);
        }
        table_handle(tournament, entryList);
      },
      error: function(a , b, c){
        console.log('There is an error in entryQuery');
      },
      async: true
    });
  }


  function mastercolumn(tournament){
  	//queries for entries and makes the side column
  	$.ajax({
      type: 'GET',
      url: "http://127.0.0.1:8000/1/tournament/" + tournament  + "/entries/",
      contentType: 'application/json',
      success: function (data) {
      	populateMasterColumn(tournament, data)
      },
      error: function(a , b, c){
        console.log('There is an error in mastercolumn');
      },
      async: true
    });
  }

  function populateMasterColumn(tournament, entryData){
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
  	  var teamName = document.createElement('div');
  	  teamName.className = "col teamName";
  	  var node = document.createTextNode(entryData[j]['team_code'])
  	  teamName.appendChild(node);
  	  sectionGroup.appendChild(teamName);
  	  table.appendChild(sectionGroup);
  	  var record = document.createElement('div');
  	  record.className = "col record";
  	  //this is static to be fixed later
  	  //Gary Lin
  	  var recordNode = document.createTextNode("6-0");
  	  record.appendChild(recordNode);
  	  sectionGroup.appendChild(record);

  	}



  }


  //**
  //Ajax for rounds
  //**
  function roundQuery(tournament){
  	//queries for rounds

  	//finds out how many rounds there are
  	$.ajax({
      type: 'GET',
      url: "http://127.0.0.1:8000/1/tournament/",
      contentType: 'application/json',
      success: function (data) {
        var prelim;
        for (i=0;i<data.length;i++){
          if (tournament == data[i]['tournament_name']) {
          	prelim = data[i]['prelims']
          }
        }
        for (g=0; g<prelim; g++){
          intermediateRoundQuery(tournament, g)
    	}

//GARY LIN 
//why wont it go into intermediateRoundQuery
        //intermediateRoundQuery(tournament, prelim);
        //console.log(tournament + ' ' + prelim);
      },
      error: function(a , b, c){
        console.log('There is an error in roundQuery1');
      },
      async: true
    });
  }

  function intermediateRoundQuery(tournament, prelim){
  	//queries for each round
    //console.log('intermediateRoundquery ' + tournament + ' '+ prelim);
    
    //account for starting at 0
    prelim += 1
    console.log(prelim)
      $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:8000/1/tournament/" + tournament + '/round/' + prelim,
        contentType: 'application/json',
        success: function (data) {
          console.log(tournament + ' ' + 'round ' + prelim);
          //for (i=0;i<data.length;i++){
           // prelim = data[i]['prelims']  
         // }  
          //console.log(data);
        
          //table_handle(tournament, entryList);
        },
        error: function(a , b, c){
          console.log('There is an error in quering for ' + tournament + 'round ' + g);
        },
        async: true
      });
  }

  //**
  //Main function that puts everything together
  //**
  function tournamentQuery(){
    //queries for tournaments
    $.ajax({
      type: 'GET',
      url: "http://127.0.0.1:8000/1/tournament/",
      contentType: 'application/json',
      success: function (data) {
        //console.log(data);
        tournamentList = [];
        for (i=0;i<data.length;i++){
          tournamentList.push(data[i].tournament_name);
        }
        createPage(tournamentList);
        tournament_handle(tournamentList);


      },
      error: function(a , b, c){
        console.log('There is an error in tournamentQuery');
      },
      async: true
    });

  }

  //**
  //Used to handle home, about, admin pages
  //**
  $('.click').click(function(scrollfix){
    console.log("clicked");
    //var link = $('.container' + idList[i]);
    //link.hide();
    var href = this.id;
    console.log(href);
    //dashindex is used to handle the home page which
    //can be accessed by two different buttons
    HideShowHelper(href)

    //hides the subsidebar
    for(m=0; m<tournamentList.length; m++){
	  tournament = tournamentList[m];
	  if (tournament!=href){
	    $(".subsidebar-" + tournament).hide(200);
      }
	}

    //fixes scroll problem
    scrollfix.preventDefault();
  }) 


  $('.admin').click(function(scrollfix){
    var href = this.id;
    //dashindex is used to handle the home page which
    //can be accessed by two different buttons
    HideShowHelper(href);

    //fixes scroll problem
    scrollfix.preventDefault();
  })


  /*function testing_function() {
	  //when a tournament gets clicked
	  //creates the table
	  	//console.log("got into tournament click");
	    var fakeList = [{"winner": "undecided", "neg_team": "Tsao & Wiechman", "aff_code": "Rowland Hall RU", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Dallas Jesuit TW", "aff_team": "Ritter & Uchitel", "round_num": 1}, 
	    {"winner": "undecided", "neg_team": "Xiao & Loftus", "aff_code": "Green Valley AB", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Johns Creek LX", "aff_team": "Horn & Bhatti", "round_num": 1}, 
	    {"winner": "undecided", "neg_team": "enter_names", "aff_code": "Downtown Magnets AD", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Maywood Academy GS", "aff_team": "Antonio & Davis", "round_num": 1}, 
	    {"winner": "undecided", "neg_team": "Aguilar & Chung", "aff_code": "St Francis GU", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Loyola AC", "aff_team": "Gu & Ram", "round_num": 1}, 
	    {"winner": "undecided", "neg_team": "Lee & Hunter", "aff_code": "Niles West CM", "tournament": "Berkeley", "loser": "undecided", "neg_code": "St. Vincent De Paul HL", "aff_team": "Geraghty & McLellan", "round_num": 1}, 
	    {"winner": "undecided", "neg_team": "Le & Samson", "aff_code": "Juan Diego Catholic CL", "tournament": "Berkeley", "loser": "undecided", "neg_code": "Millard South H.s. LS", "aff_team": "Lewis & Zmyslo", "round_num": 1}];
	    var href = "TOC";

	    $('#table-' + href).empty();
	    //console.log('table_handle ' + href);

	    for (i = 0; i < fakeList.length; i++){
	      var list = fakeList[i];
	      var sectionGroup = document.createElement("div");
	      sectionGroup.className = "section";
	      sectionGroup.className += " group";
	      affTeam = list.aff_team
          var div = document.createElement('div');
          var node = document.createTextNode(affTeam);
          div.className = "col";
          div.className += " teamName";
          //if (j == 1) div.className += " record";
          //if (j > 1) div.className += " round6";
          if (i%2 == 0) sectionGroup.className += " standardeven";
          else sectionGroup.className += " standardodd";

	      div.appendChild(node);
	      sectionGroup.appendChild(div);
	      var element = document.getElementById("table-TOC-Main");
	      element.appendChild(sectionGroup);
	      }
	    }*/
  


  tournamentQuery();
});
