/* Map Module */ 

var tournament_marker_list; 
var dropdownTournamentList; 
var map; 


/* tournamentQueryAndSet() will access the tournaments listed in the *** and 
 * create a marker for those tournaments on the map. 
 */ 

function tournamentQueryAndSet() {
  $.ajax({
    type: 'GET',
    url: kritstats.urls.tournament_query,
    contentType: 'application/json',

    success: function (data) {
    	data.sort(function (tournA, tournB) { 
    		return tournA["start_date"] > tournB["start_date"] ? -1 : 1; 
    	}); 
    	addToTournamentList(null); 
      for (i = 0; i < data.length; i++) {
      	if (data[i].association != "UDL") {
          setTournament(data[i]); 
          addToTournamentList(data[i]); 
        }
      }
    },
    error: function(a , b, c){
      console.log('There is an error in tournamentQuery');
    },
    async: true
  });
}


/* determineBid() will take in the bid_number(number of teams that receive a bid) field 
 * of a tournamnet and return a user-friendly description to be displayed in the infoWindow. 
 * 
 * @param bid_number: the number of teams that receive a bid at the tournament 
 */ 
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



/* TournamentMarker object represents the tournaments listed in the ***. It contains the 
 * marker that is represented on the map and other important information about that tournament. 
 * 
 * Marker: the Google Maps Marker object displayed to the map based on the tournaments location
 * tournament_window: the Google Maps InfoWindow object, which contains information (tbd) about the
 * tournamnet
 * tournament_bid: the user-friendly description (Octos, Sems etc.) of the round needed to advance to
 * receive a bid
 * tournament_info: the html content for the InfoWindow object
 * 
 * @param tournamentLatLng is the Google Maps LatLng object determining the location of the Marker
 * @param tournament is the tournament that this object will be representing 
 */ 

function TournamentMarker(tournamentLatLng, tournament) { 
	this.Marker = new google.maps.Marker({ 
	    position: tournamentLatLng, 
	    map: map, 
	    clickable: true, 
	    draggable: false, 
	    icon: "/debate/static/images/crownicon.png"
	}); 

	this.tournament_name = tournament["tournament_name"]
	this.tournament_dates = [tournament["start_date"], tournament["end_date"]]; 
	this.tournament_window = new google.maps.InfoWindow(); 
	this.tournament_bid = determineBid(tournament["bid_round"]); 
	this.tournament_info = generateTournamentInfo(this.tournament_name, 
		this.tournament_bid, tournament["start_date"], tournament["end_date"]); 
	this.tournament_window.setContent(this.tournament_info); 
	this.tournament_window.setPosition(tournamentLatLng); 
	this.Marker.setMap(map); 
} 


function generateTournamentInfo(name, bid, start_date, end_date){ 
	var window_box = document.createElement("div"); 
	window_box.className = "maps_info_window"; 
	var link = document.createElement("a"); 
	link.className = "maps_info_window_text"; 
	link.href = '/' + name + '/Dashboard'; 
	var display = document.createElement("h4"); 
	var status = document.createElement("img"); 
	var today = parseInt(constructDateString(new Date())); 
	var start = parseInt(start_date); 
	var end = parseInt(end_date); 

	if (today > end) { 
		status.src = "/debate/static/images/red_status.png"; 
	} else if (today < start) { 
		status.src = "/debate/static/images/blue_status.png";
	} else { 
		status.src = "/debate/static/images/green_status.png"
	}

	status.className = "maps_info_window_bubble"; 
	display.appendChild(status); 
	display.appendChild(document.createTextNode(name + 
		' (' + bid + ')')); 
	link.appendChild(display); 
	window_box.appendChild(link); 
	return window_box; 
}



	
function constructDateString(date) { 
	var year = date.getFullYear(); 
	var month = date.getMonth() + 1; //starts at 0 
	var day = date.getDate(); 

	if (month < 10) { 
		month = "0" + month; 
	}
	if (day < 10) { 
		day = "0" + day; 
	}
	return year + month + day + ""; 

}


/* setTournament will take in a tournament from the *** and display that tournament on the map. 
 * Rather than pass geographical coordinates, we use the Google Maps Geocoder object which can 
 * take in a location in address format such as "San Jose, California" and generate a Google Maps
 * LatLng object for that location. For the Geocoder to work, the tournament's location *must* be 
 * written in string format, following the guidelines of : "city, state" . If the Geocoder is able 
 * to determine a latitude and longitude for the location, it will generate a TournamentMarker object
 * and represent it at that location. 
 * 
 * @param tournament is the tournament object passed from the *** 
 */ 
function setTournament(tournament) {  
	var address_geocoder = new google.maps.Geocoder(); 
	address_geocoder.geocode({'address': tournament["loc"]}, 
		function (results, status) { 
			if (status == google.maps.GeocoderStatus.OK) { 
				var addedTournament = new TournamentMarker(results[0].geometry.location, tournament); 
				tournament_marker_list.push(addedTournament);
				if (!isRecent(addedTournament)) { 
					addedTournament.Marker.setMap(null); 
				}


				google.maps.event.addListener(addedTournament.Marker, 'click', 
					function(evt) { 
						addedTournament.tournament_window.open(map); 
					}
				);

				google.maps.event.addListener(addedTournament.Marker, 'mouseover', 
					function(evt) { 
						if (addedTournament.tournament_window.getMap() == null) { 
							addedTournament.tournament_window.open(map); 
						}

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

// Recent: - 3 weeks + 1 week of current date.
function isRecent(tournament) { 
	var today = new Date();
	var one_week_ahead = new Date();
	var three_weeks_back = new Date(); 
	one_week_ahead.setDate(today.getDate() + 8); 
	three_weeks_back.setDate(today.getDate() - 22); 
	one_week_ahead = constructDateString(one_week_ahead); 
	three_weeks_back = constructDateString(three_weeks_back); 
	today = constructDateString(today); 

	if ((parseInt(tournament.tournament_dates[0]) < one_week_ahead) 
		&& (parseInt(tournament.tournament_dates[1])> three_weeks_back)) { 
		return true; 
	} else { 
		return false; 
	}
}


/* initialize will initialize all global fields and generate the map. This map contains a specific 
 * style where no roads, terrain, or places of interest are shown. 
 */ 
function initialize() { 
  tournament_marker_list = []; 
  var center_start = new google.maps.LatLng(38, -96); 
  var map_options = { 
    zoom: 4,
    scrollwheel: false,
    center: center_start, 
    mapTypeControl: false,
    panControl: false, 
    streetViewControl: false, 
    zoomControl: false,
    mapTypeId: 'cleanMapStyle',
    minZoom: 4
  }

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

	tournamentQueryAndSet(); 
}


/* Tournaments List Module */ 
function addToTournamentList(tournament_data) { 
	var listSpace = document.getElementById("all-tournaments"); 
	if (tournament_data == null) { 
		listSpace.appendChild(document.createElement("h3").appendChild(document.createTextNode("All Tournaments"))); 
		var tournament_list = document.createElement("table"); 
		tournament_list.id = "tournament-list"
		listSpace.appendChild(tournament_list); 
	} else { 
		var tournament_list = document.getElementById("tournament-list"); 
		var tournament_row = document.createElement("tr"); 
		tournament_row.className = "tournament_list_row";
		tournament_row.appendChild(generateTournamentListBox(tournament_data)); 
		tournament_row.onmouseover = function () { openHoverWindow(tournament_data["tournament_name"]); }; 
		tournament_row.onmouseout = function () { closeHoverWindow(tournament_data["tournament_name"]); }; 
		tournament_list.appendChild(tournament_row); 
	}


}

function generateTournamentListBox(tournament_data) { 
	var tournament_box = document.createElement("div"); 
	tournament_box.className = "tourn_list_box"; 
	var link = document.createElement("a"); 
	link.className = "tourn_list_text"; 
	link.href = '/' + tournament_data["tournament_name"] + '/Dashboard'; 
	var display = document.createElement("h6"); 
	var status = document.createElement("img"); 
	var today = parseInt(constructDateString(new Date())); 
	var start = parseInt(tournament_data["start_date"]); 
	var end = parseInt(tournament_data["end_date"]); 

	if (today > end) { 
		status.src = "/debate/static/images/red-circle-sidebar.png"; 
	} else if (today < start) { 
		status.src = "/debate/static/images/blue-circle-sidebar.png";
	} else { 
		status.src = "/debate/static/images/green-circle-sidebar.png";
	}

	status.className = "tourn_list_bubble"; 
	display.appendChild(status); 
	display.appendChild(document.createTextNode(tournament_data["tournament_name"] + 
		' (' + determineBid(tournament_data["bid_round"]) + ')')); 
	link.appendChild(display); 
	tournament_box.appendChild(link); 

	return tournament_box; 
}


function openHoverWindow(tournament_name) { 
	for (var i = 0; i < tournament_marker_list.length; i++) { 
		if (tournament_marker_list[i].tournament_name == tournament_name) { 
			tournament_marker_list[i].Marker.setMap(map); 
				if (tournament_marker_list[i].tournament_window.getMap() == null) { 
					console.log(tournament_name + ": opened"); 
					tournament_marker_list[i].tournament_window.open(map); 
				}
		}
	}
}


function closeHoverWindow(tournament_name) { 
	for (var i = 0; i < tournament_marker_list.length; i++) { 
		if (tournament_marker_list[i].tournament_name == tournament_name) { 
			if (!isRecent(tournament_marker_list[i])) { 
				tournament_marker_list[i].Marker.setMap(null); 
			}
			console.log(tournament_name + ": closed"); 
			setTimeout(tournament_marker_list[i].tournament_window.close(), 3000); 
		}
	}
}


$(document).ready(initialize)



