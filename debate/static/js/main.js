/**
 * An example of bootstrap
 * 
 */
$(document).ready(function() {

  // Variable to store your files
  var files;

  var tournamentList = [];

  function createPage(){
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
    //change cndi to tournamentlist
    for (i = 0; i < tournamentList.length; i++){  
      var tournament = tournamentList[i];
      var divMain = document.createElement("div");
      divMain.id= "container-" + tournament;
      divMain.className = 'container';
      var h1 = document.createElement("h1");
      h1.className = 'page-header';
      var node = document.createTextNode(tournament);
      h1.appendChild(node);
      var divTable = document.createElement("div");
      divTable.id = 'table-' + tournament;
      divMain.appendChild(h1);
      divMain.appendChild(divTable);

      var element = document.getElementById("container-master");
      element.appendChild(divMain);
    } 
  }

  // Variable to store your files
  var files;

  //All the navigation ID's here
  var query = [['Leland YEE', '4-2', 'Bellarmine CK', 'GBN SW', 
  'Hooch EE', 'GBS SW', 'Stratford LL', 'Kinkaid VV'], 
  ['Bellarmine CK', '3-3', 'Leland YEA', 'OPRF QQ', 'GBN AA', 
  'Kinkaid VV', 'Greenhill PP', 'CPS VI'], ['GBN AA', '4-2', 'Bellarmine CK', 'GBN SW', 
  'Hooch EE', 'GBS SW', 'Stratford LL', 'Kinkaid VV'], 
  ['Greenhill PS', '3-3', 'Leland YEA', 'OPRF QQ', 'GBN AA', 
  'Kinkaid VV', 'Greenhill PP', 'CPS VI']];
  function tournament_handle() {
	  $('.tournament').click(function(){
	  	console.log("got into tournament click");
	    var href = this.id;
	    $('#table-' + href).empty();

	    for (i = 0; i < query.length; i++){
	      var list = query[i];
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
	        if (i%2 == 0) div.className += " standardeven";
	        else div.className += " standardodd";

	        div.appendChild(node);
	        sectionGroup.appendChild(div);
	        var element = document.getElementById("table-" + href);
	        element.appendChild(sectionGroup);
	      }
	    }
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
	  });
  }

  function tournamentQuery(){
    $.ajax({
      type: 'GET',
      url: "http://127.0.0.1:8000/1/tournament/",
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        for (i=0;i<data.length;i++){
          tournamentList.push(data[i].tournament_name);
        }
        createPage();
        tournament_handle();
      },
      error: function(a , b, c){
        console.log('There is an error in tournamentQuery');
      },
      async: true
    });

  }
  //Navigation Bar Controls

  //modifies the click class- displays the right webpage
  $('.click').click(function(){
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
  }) 

  tournamentQuery();
});
