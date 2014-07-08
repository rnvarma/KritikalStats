/**
 * An example of bootstrap
 * 
 */
$(document).ready(function() {
	// Variable to store your files
	var files;

	//All the navigation ID's here
	var idList = ['container-home', 'container-about', 'container-NDI', 
	'container-CNDI', 'container-DDI', 'container-MICH', 'container-SNFI', 
	'container-admin'];

	function init() {
		// browse file
		$('#btnBrowse').click(function() {
			$('#inputFile').click();
		});

		// file input change event
		$('#inputFile').change(function(event) {
			$('#filePath').val($(this).val().replace("C:\\fakepath\\", ""));
			files = event.target.files;
		});

		// upload
		$('#btnUpload').click(function() {
			submitForm('upload');
		});

		// form submit
		$('#form').on('submit', onSubmit);


		//Navigation Bar Controls

		//modifies the click class- displays the right webpage
		$('.click').click(function(){
			for(i=0;i<idList.length;i++){
				var link = $('#' + idList[i])
				link.hide()
			}
			var href = $(this).attr('href')
			$('#container-' + href.substr(1)).show()
			
			
			//makes the sidebar active
			for(i=0;i<idList.length;i++){
				var link = $('#active-' + idList[i].substring(10))
				link.removeClass('active')
			}
			$('#active-' + href.substr(1)).addClass('active');

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
			sucgcess: function(data, textStatus, jqXHR) {
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

	init();
	
});