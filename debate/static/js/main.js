//fixes the sidebar issue
var fromSideBar = 0
//subsidebar elements
var sidebar = ['Dashboard', 'Main', 'Entries', 'Bracket'];

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
  
    //this shit seems to do nothing useless??
    for (i=0 ; i<sidebar.length; i++){
      //console.log('href ' + href[href.length-1])
      //console.log('sidebar ' + sidebar[i])
      if (href[href.length-1] == sidebar[i]){
        //console.log(href[href.length-2])
        var clickable = document.getElementById("#" +  href[href.length-2])

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
      liGroup.className = "";
      var aGroup = document.createElement("a");
      aGroup.className = "tournament";
      aGroup.setAttribute("id", tournament);
      var node = document.createTextNode(tournament);
      aGroup.appendChild(node);
      liGroup.appendChild(aGroup);
      var element = document.getElementById("sidebar-populate");
      element.appendChild(liGroup);



      //makes subsidebar
      for (j = 0; j<sidebar.length; j++){
        var side = sidebar[j];
        var liGroup = document.createElement("li");
      liGroup.className = 'subsidebar subsidebar-' + tournament;
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

 

      /* useless??
        $('.subsidebar').click(function(scrollfix){
        //Takes care of active sidebar
        var href = this.id;
        //console.log(href);
        //$(href)

        //take off the subnav subactive
        $('.subactive').removeClass('subactive')
        
        $('#'+'active-'+href).addClass('subactive')

      })*/


      url = document.URL;
      url = url.split('/');
      if (tournament == url[url.length-2]){
        href = url[url.length-2]
        //shows subsidebar
        for(m=0; m<tournamentList.length; m++){
          tournament = tournamentList[m];
          if (tournament!=href){
            $(".subsidebar-" + tournament).hide(300);
          }
        }
        $(".subsidebar-" + href).show(400);

        //makes the sidebar and subsidebar active
        $('#active-' + href).addClass('active');
       
        sidevalue = url[url.length-1];
        for(n=0; n<sidebar.length; n++){
          check = sidebar[n]
          if (sidebar[n] == 'Main Sheet'){
            check = 'Main';
          }
          if (sidevalue == check){
            console.log('#active-' + href+ '-' + sidevalue)
            $('#active-' + href+ '-' + sidevalue).addClass('subactive')
          }
        }
      }
      
    }


  }

  //**
  //Handles the tournament
  //**
  function tournament_handle_click(tournamentList) {
    //when tournament is clicked it is opened
    $('.tournament').click(function(){
      fromSideBar = 0
      var href = this.id;
      console.log ('id: '+ href)
      //shows subsidebar
      for(m=0; m<tournamentList.length; m++){
        tournament = tournamentList[m];
        if (tournament!=href){
        $(".subsidebar-" + tournament).hide(300);
        }
      }
      $(".subsidebar-" + href).show(400);
      
      //makes tournaments active
      $(".active").removeClass("active");
      $(this).parent().addClass('active');
    });

    //takes care of when the mouse is not over the sidebar
    $('.sidebar').hover(function() {
      },
      //contracts the subsidebar and opens the correct subsidebar (if necessary)
      //makes the right sidebar active (based on url)
      function(fromSideBar){
        for(n=0 ; n<tournamentList.length; n++){
          tournament = tournamentList[n];
          //console.log('tournament ' + href)
          if (tournament!=href){
            $(".subsidebar-" + tournament).hide(300);
          }
        }
        
        newHREF = document.URL.split('/')
        newHREF1 = newHREF[newHREF.length-2]
        if (href != newHREF1){
          href = newHREF[newHREF.length-1]
        }
        $('.subsidebar-' + href).show(400);
        $(".active").removeClass("active");
        $('#active-' + href).addClass('active');   
        console.log(href)
                    
    });

  }


  function tournament_handle_hover(tournamentList) {

    //expands the right sidebar and makes it active
    $('.tournament').hover(function(){
      fromSideBar = 0
      var href = this.id;
      //shows subsidebar
      for(m=0; m<tournamentList.length; m++){
        tournament = tournamentList[m];
        if (tournament!=href){
        $(".subsidebar-" + tournament).hide(300);
        }
      }
      $(".subsidebar-" + href).show(400);
      
      //makes tournaments active
      $(".active").removeClass("active");
      $(this).parent().addClass('active');

  },
    //hover off
    function(){
      var check = 0;
      sidebar1 = sidebar
      sidebar1[1] = 'Main'
      
      //gets href- the tournament it is on
      for(m=0; m<tournamentList.length; m++){
        url = document.URL.split('/');
        if (url[url.length-2] == tournamentList[m]){
          href = url[url.length-2];
        }
      }
      
      //checks if it is a subsidebar
      if (sidebar1.indexOf(url[url.length-1]) < 0 ){
        //Gary Lin
        //When not hovering over tournament- contract
      }
      else {
        
        //check if hovering over a sidebar
        var isHovered = true;
          for(p=0 ; p<tournamentList.length; p++){
            for (q=0 ; q<sidebar1.length; q++){
              isHovered = $('#active-' + tournamentList[p] + '-' + sidebar1[q]).is(function() { return $(this).is(":hover"); });
              console.log(isHovered);
              if (isHovered == true){
                q = sidebar1.length
                p = tournamentList.length
              }
            }
          }

        //once user 'hover-offs' subsidebar-- contracts
        if (isHovered == true){
          fromSideBar = 1;
          $('.sidebar').hover(function() {
            //when subsidebar is hovered
          },
            function(fromSideBar){
                for(n=0 ; n<tournamentList.length; n++){
                  tournament = tournamentList[n];
                  //console.log('tournament ' + href)
                  if (tournament!=href){
                    $(".subsidebar-" + tournament).hide(300);
                  }
                }
                $('.subsidebar-' + href).show(400);
                $(".active").removeClass("active");
                $('#active-' + href).addClass('active');

                if (check == 0){
                  //console.log('1: ' + check);
                }     
               
              
          });
        

        }
 
        else {

          //hides whatever was showing and show the sidebar that the 
          //website is on
          for(n=0 ; n<tournamentList.length; n++){
            tournament = tournamentList[n];
            console.log('tournament ' + href)
            if (tournament!=href){
              $(".subsidebar-" + tournament).hide(300);
            }
          }
            $('.subsidebar-' + href).show(400);
            $(".active").removeClass("active");
            $('#active-' + href).addClass('active');

            if (check == 0){
              console.log('1: ' + check);
            }
        }
      }
    });
  }

  function onSkin(){
    for(p=0 ; p<tournamentList.length; p++){
      for (q=0 ; q<sidebar1.length; q++){
        isHovered = $('#active-' + tournamentList[p] + '-' + sidebar1[q]).is(function() { return $(this).is(":hover"); });
        if (isHovered == true){
          q = sidebar1.length
          p = tournamentList.length
        }
      }
    }
    if (isHovered == false) {
      fromSideBar = 0;
    }
    else {
      fromSideBar = 1;
    }

  }

  //**
  //Main function that puts everything together
  //**
  function tournamentQuery(){
    //queries for tournaments
    $.ajax({
      type: 'GET',
      url: "http://54.191.230.74/1/tournament/",
      contentType: 'application/json',
      success: function (data) {
        //console.log(data);
        tournamentList = [];
        for (i=0;i<data.length;i++){
          tournamentList.push(data[i].tournament_name);
        }
        createPage(data);
        tournament_handle_click(tournamentList);

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
