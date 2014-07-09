/**
 * An example of bootstrap
 * 
 */
$(document).ready(function() {
	// Variable to store your files
	var files;

	var tournamentList = ['CNDI', 'DDI', 'MICH', 'SNFI', 'NDI'];

	function init() {

		
		//Navigation Bar Controls

		//modifies the click class- displays the right webpage
		$('.click').click(function(){
			//var link = $('.container' + idList[i]);
			//link.hide();
			var href = this.id;

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


			//make the container pages for everything like this
			//fix the idList at the top
			//fix main.css to be more concise

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

	createPage();
	init();
	
});


$.ajax({
    type: 'GET',
    url: "http://127.0.0.1:8000/1/tournament/Berkely/entries"
    contentType: 'application/json',
    success: function (data) {
      var meta_data = parse_xml_for_data(data);
      populate_missing_data(id, meta_data, missing_data);
    },
    error: function(a, b, c){
      console.log(c + ". Failed to retrieve data for" + id);
    },
    async: true
  });