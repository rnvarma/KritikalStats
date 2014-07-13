/**
 * An example of bootstrap
 * 
 */
$(document).ready(function() {
	// Variable to store your files
	var files;

	var tournamentList = [];

	function init() {

		
		//Navigation Bar Controls

		//modifies the click class- displays the right webpage
		$('.click').click(function(){
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

		//sub side-bar features
		//to be made
		/*
		$('.click').click(function(){
			var href = $(this).attr('href');
			var li = document.createElement('li');
			li.className = '';
			var node = document.createTextNode('hello');
			li.appendChild(node);

			var element = document.getElementById("table-" + href.substr(1));
			element.appendChild(li);
		})
		*/


	}


	function createPage(){
		for (i = 0; i < tournamentList.length; i++){
			var tournament = tournamentList[i];
			var liGroup = document.createElement("li");
			liGroup.id= "active-" + tournament;
			var aGroup = document.createElement("a");
			aGroup.className = "click";
			aGroup.className += " tournament";
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

	function validateForm() {
		if ($('#filePath').val() == "") {
			// display error message...
			return false;
		}
		return true;
	}

	/**
	 * Submit the form
	 * @param  {String} action upload | action
	 */
	function submitForm(action) {
		if (!validateForm()) return;

		$('#form').submit();
	}

	function onSubmit(event) {
		event.stopPropagation(); // Stop stuff happening
        event.preventDefault(); // Totally stop stuff happening

        // Create a formdata object and add the files
		var data = new FormData();
		data.append("upload_file", files[0]);

		$.ajax({
			url: '/upload',
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			success: function(data, textStatus, jqXHR) {
				if (data.success === true) {
					console.log('success');
				} else {
					console.log('error: ' + data.error);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('error: ' + textStatus);
			}
		});
	}


	function tournamentQuery(){
		$.ajax({
			type: 'GET',
			url: "http://127.0.0.1:8000/1/tournament/",
			contentType: 'application/json',
			success: function (data) {
				for (i=0;i<data.length;i++){
					tournamentList.push(data[i].tournament_name);
				}
				//createPage();
				//init();
			},
			error: function(a , b, c){
				console.log('There is an error in tournamentQuery');
			},
			async: false
		});

	}

	tournamentQuery();
	createPage();
	init();
	
	
});
