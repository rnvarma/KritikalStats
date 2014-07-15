
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
      // aGroup.className += " tournament";
      aGroup.setAttribute("id", tournament);
      aGroup.href = "#" + tournament;
      var node = document.createTextNode(tournament);
      aGroup.appendChild(node);
      liGroup.appendChild(aGroup);
      var element = document.getElementById("sidebar-populate");
      element.appendChild(liGroup);
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
      var entry_name = document.createTextNode("Entries");
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


      //makes tables
      entryQuery(tournament);

    }
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
	    for(i=0; i<tournamentList.length; i++){
	      $('#container-' + tournamentList[i]).hide();
	    }
	    $('#container-' + 'home').hide();
	    $('#container-' + 'about').hide();
	    $('#container-' + 'admin').hide();

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

	    //adds active class
	    $('#active-' + href).addClass('active');

	    //fixes scroll problem
        scrollfix.preventDefault();

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
	        if (j > 1) div.className += " round6";
	        if (i%2 == 0) sectionGroup.className += " standardeven";
	        else sectionGroup.className += " standardodd";

	        div.appendChild(node);
	        sectionGroup.appendChild(div);
	        var element = document.getElementById("table-" + href);
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
    //dashindex is used to handle the home page which
    //can be accessed by two different buttons
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
    for(i=0; i<tournamentList.length; i++){
      $('#container-' + tournamentList[i]).hide();
    }
    $('#container-' + 'home').hide();
    $('#container-' + 'about').hide();
    $('#container-' + 'admin').hide();

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

    //adds active class
    $('#active-' + href).addClass('active');

    //fixes scroll problem
    scrollfix.preventDefault();
  }) 

  tournamentQuery();
});
