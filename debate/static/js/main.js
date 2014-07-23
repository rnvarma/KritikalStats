function create_spinner_div() {
  var spinner = document.createElement("div");
  spinner.className = "spinner";

  for (var i = 1; i < 6; i++) {
    var div = document.createElement("div");
    var class_name = "rect" + i.toString();
    div.className = class_name;
    spinner.appendChild(div);
  }
  return spinner
}

$(document).ready(function() {
  
  //**
  //Set the right class to be active (highlighted)
  //**
  function makeActive(){
    $('.click').removeClass('active')
    $('#active-home').removeClass('active')
    href = document.URL;
    href = href.split('/');
    $('#active-' + href[href.length-1]).addClass('active')
    //console.log(href)
  
    var sidebar = ['Dashboard', 'Main Sheet', 'Entries', 'Bracket'];
    for (i=0 ; i<sidebar.length; i++){
      //console.log('href ' + href[href.length-1])
      //console.log('sidebar ' + sidebar[i])
      if (href[href.length-1] == sidebar[i]){
        //console.log(href[href.length-2])
        var clickable = document.getElementById("#" +  href[href.length-2])
        //console.log(clickable)
        //GARY LIN fix this auto click
        //$( "#" +  href[href.length-2]).trigger( "click" );
        //makeActiveHelper(href[href.length-2], href[href.length-1]);
        //console.log(href[href.length-2], href[href.length-1]);
      }
    }

  }

  function makeActiveHelper(tournament, sidebar){
    //console.log(".subsidebar-" + tournament)
    $(".subsidebar-" + tournament).show();
    $('active-Berkeley-Dashboard').show();
  }

  //**
  //This is used to create the webpage
  //**
  function createPage(tournamentData){
    
    tournamentList = [];
    var prelim;
    for (i=0;i<tournamentData.length;i++){
      tournamentList.push(tournamentData[i].tournament_name);
    }


    //makes sidebar
    for (i = 0; i < tournamentList.length; i++){
      var tournament = tournamentList[i];
      var liGroup = document.createElement("li");
      liGroup.id= "active-" + tournament;
      var aGroup = document.createElement("a");
      aGroup.className = "tournament";
      aGroup.setAttribute("id", tournament);
      var node = document.createTextNode(tournament);
      aGroup.appendChild(node);
      liGroup.appendChild(aGroup);
      var element = document.getElementById("sidebar-populate");
      element.appendChild(liGroup);


      var sidebar = ['Dashboard', 'Main Sheet', 'Entries', 'Bracket'];
      //makes subsidebar
      for (j = 0; j<sidebar.length; j++){
        var side = sidebar[j];
        var liGroup = document.createElement("li");
      liGroup.className = 'subsidebar-' + tournament;
        if (side == 'Main Sheet'){
          side = 'Main';
        }
        liGroup.id= "active-" + tournament + '-' + side;
      liGroup.style.display = "none";
        var aGroup = document.createElement("a");
        aGroup.className = "subsidebar " + side;
        if (side == 'Main Sheet'){
          aGroup.setAttribute("id", tournament + '-'+ "Main");
          aGroup.id = tournament + '-'+ "Main";
          aGroup.href = "/" + tournament + '/' + "main";
        }
        else {
          aGroup.setAttribute("id", tournament + '-'+ side);
        aGroup.href = "/" + tournament + '/' + side;
      }
        if (side == 'Main'){
          side = 'Main Sheet';
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
        //console.log(href);
        //$(href)

        //take off the subnav subactive
        $('.subactive').removeClass('subactive')
        
        $('#'+'active-'+href).addClass('subactive')

      })

    }

  }

  //**
  //Handles the tournament
  //**
  function tournament_handle(tournamentList) {
    //when a tournament gets clicked
    //creates the table
    $('.tournament').click(function(){
      //opens the right page and makes sidebar active
      var href = this.id;
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
        createPage(data);
        tournament_handle(tournamentList);

      },
      error: function(a , b, c){
        console.log('There is an error in tournamentQuery');
      },
      async: true
    });
  }

  makeActive();
  tournamentQuery();
});
