var tournament_marker_list; 
var map; 

function tournamentQueryAndSet() {
	$.ajax({
		type: 'GET',
		url: "http://127.0.0.1:8000/1/tournament/",
		contentType: 'application/json',

		success: 
		function (data) {
        for (i = 0;i < data.length; i++) {
        	setTournament(data[i]); 
        }
    },
    error: function(a , b, c){
    	console.log('There is an error in tournamentQuery');
    },
    async: true
	});
}


function determineBid(bid_number) { 
	switch(bid_number) { 
	  case 16: 
	    return "Octos"; 
	  case 8: 
	    return "Quarters"; 
	  case 4: 
	    return "Sems"; 
	  case 2: 
	    return "Finals"; 
	  case 0: 
	    return "Not Bidded"; 
	  default: 
	    return "FAIL"; 
	} 
}



function TournamentMarker(tournamentLatLng, tournament) { 
	this.Marker = new google.maps.Marker({ 
	    position: tournamentLatLng, 
	    map: map, 
	    clickable: true, 
	    draggable: false, 
	    icon: "/debate/static/images/crownicon.png"
	}); 

	this.tournament_window = new google.maps.InfoWindow(); 
	this.tournament_bid = determineBid(tournament["bid_round"]); 
	this.tournament_info = '<div style = "width:100px;">' +  
	'<h4 style = "text-align: center;">' + tournament["tournament_name"] +
  ' (' + this.tournament_bid + ') </h4>';
	this.tournament_window.setContent(this.tournament_info); 
	this.tournament_window.setPosition(tournamentLatLng); 
	this.Marker.setMap(map); 
} 


function setTournament(tournament) {  
	var address_geocoder = new google.maps.Geocoder(); 
	address_geocoder.geocode({'address': tournament["loc"]}, 
		function (results, status) { 
			if (status == google.maps.GeocoderStatus.OK) { 
				var addedTournament = new TournamentMarker(results[0].geometry.location, tournament); 
				tournament_marker_list.push(addedTournament); 

				google.maps.event.addListener(addedTournament.Marker, 'click', 
					function(evt) { 
						addedTournament.tournament_window.open(map); 
					}
				);

				google.maps.event.addListener(addedTournament.Marker, 'mouseover', 
					function(evt) { 
						addedTournament.tournament_window.open(map); 
					}
				); 

				google.maps.event.addListener(addedTournament.Marker, 'mouseout', 
					function(evt) { 
						setTimeout(function() { addedTournament.tournament_window.close(); }, 5000); 
					}
				); 

			} else { 
				alert("failure " + status); 
			}
		}
	);
}


function createDelay() { 

}

/*
function filterTournaments(filter_field, requirement) { 
	if (filter_field == "all") { 
		for (var i = 0; i < tournament_marker_list.length; i++) { 
			tournament_marker_list[i].Marker.setMap(map); 
		}
	}
	if (filter_field == "bid_round") { 
		if (requirement == "bids only") { 
			filter = "Not Bidded"; 
		}
	}
	for (var i = 0; i < tournament_marker_list.length; i++) { 
		if (tournament_marker_list[i].tournament_bid == filter) { 
			tournament_marker_list[i].Marker.setMap(null); 
		} else { 
			tournament_marker_list[i].Marker.setMap(map); 
		}
	}
}




function showBidsOnly() { 
	for (var i = 0; i < tournament_marker_list.length; i++) { 
		if (tournament_marker_list[i].tournament_bid == "Not Bidded") { 
			tournament_marker_list[i].Marker.setMap(null); 
		} else { 
			tournament_marker_list[i].Marker.setMap(map); 
		}
	}
}


function showAll() { 
	for (var i = 0; i < tournament_marker_list.length; i++) { 
		tournament_marker_list[i].Marker.setMap(map); 
	}
}
*/



function initialize() { 
	alert("hello");
	tournament_marker_list = []; 
	var center_start = new google.maps.LatLng(40, -98); 
	var map_options = { 
		zoom: 5,
		scrollwheel: false,
		center: center_start, 
		mapTypeControl: false,
		panControl: false, 
		streetViewControl: false, 
		zoomControl: false,
		mapTypeId: 'cleanMapStyle',
        minZoom: 4
	}

/* 
  var filterTournamentBox = document.createElement('div'); 
  var filterTournamentHTML = document.createElement('div'); 
  filterTournamentHTML.style.fontSize = '12px';
  filterTournamentHTML.style.paddingLeft = '4px';
  filterTournamentHTML.style.paddingRight = '4px';
  filterTournamentHTML.innerHTML = '<tr> <td> <button style="background-color:blue;" class = "filterButton" data-filter = "bidsOnly">' + 
                                   'Bid Tournaments </button> </td>' + 
                                   '<td> <button class = "filterButton" data-filter = "None">' + 
                                   'All </button> </td>';

  filterTournamentBox.appendChild(filterTournamentHTML);
*/ 

	var cleanMapStyle = [
	{
		featureType: "poi",
		elementType: "all",
		stylers: [
		{ visibility: "off" }
		]
	},{
		featureType: "water",
		elementType: "labels",
		stylers: [
		{ visibility: "off" }
		]
	},{
		featureType: "road",
		elementType: "all",
		stylers: [
		{ visibility: "off" }
		]
	}, {
		featureType: "landscape.natural", 
		elementType: "all", 
		stylers: [ 
		{ visibility: "off" }
		]
	}
	];


	map = new google.maps.Map(document.getElementById('maps-canvas'), map_options); 
	map.mapTypes.set('cleanMapStyle', new google.maps.StyledMapType(cleanMapStyle, { name: 'cleanMapStyle' }));
//  map.controls[google.maps.ControlPosition.TOP_CENTER].push(filterTournamentBox);
//  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(test);

	tournamentQueryAndSet(); 


	$(".test_click").click(function() {
		alert("wrked");
	})
	//hardcoded for display
/* 

  $(".filterButton").click(
  	function() { 
  		alert("called");
  		var filter_crit = $(this).attr("data-filter"); 
  		if (filter_crit == "bidsOnly") { 
  			for (var i = 0; i < tournament_marker_list.length; i++) { 
  				if (tournament_marker_list[i].tournament_bid == "Not Bidded") { 
  					tournament_marker_list[i].Marker.setMap(null); 
  				} else { 
  					tournament_marker_list[i].Marker.setMap(map); 
  				}
  			}
  		} else if (filter_crit == "None") { 
  			for (var i = 0; i < tournament_marker_list.length; i++) { 
  				tournament_marker_list[i].Marker.setMap(map); 
  			}
  		} else {
  			alert("error"); 
  		}
  	}                                   
  ); 
*/ 

}


$(document).ready(initialize)
