//Populate table
$(document).ready(function() {
	// Variable to store your files
	var files;

	//All the navigation ID's here
	var query = [['Leland YEE', '4-2', 'Bellarmine CK', 'GBN SW', 
	'Hooch EE', 'GBS SW', 'Stratford LL', 'Kinkaid VV'], 
	['Bellarmine CK', '3-3', 'Leland YEA', 'OPRF QQ', 'GBN AA', 
	'Kinkaid VV', 'Greenhill PP', 'CPS VI']];

	function makeTable() {

		//populates table

		/*
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
		*/

		$('.click').click(function(){
			var href = $(this).attr('href');
			$('#table-' + href.substr(1)).empty();


			for (i = 0; i < query.length; i++){
				var list = query[i];
				var sectionGroup = document.createElement("div");
				sectionGroup.className = "section";
				sectionGroup.className += " group";
				for (j = 0; j < list.length; j++){
					var div = document.createElement('div');
					var node = document.createTextNode(list[j]);
					div.className = "col";
					if (j == 0){
						div.className += " standard";
						div.className += " teamName";
					}
					if (j == 1){
						div.className += " standard";
						div.className += " record";
					}
					if (j > 1){
						div.className += " round6";
						div.className += " standard";
					}

					div.appendChild(node);
					sectionGroup.appendChild(div);
					var element = document.getElementById("table-" + href.substr(1));
					element.appendChild(sectionGroup);
				}
			}

			
		})


	}

	makeTable();
	
});