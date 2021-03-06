
sub_pages = ["Dashboard", "Prelims", "Entries", "Elims"];

function create_tournament_div(tourn_data) {
	var t_name_text = tourn_data["tournament_name"];
	var t_div = document.createElement("li");
	t_div.className = "sub-menu dcjq-parent-li";

	var t_a = document.createElement("a");
	t_a.className = "dcjq-parent";
	t_a.setAttribute("href", "javascript:;");

	t_i = document.createElement("i");
	t_i.className = "fa fa-tasks";

	t_name_span = document.createElement("span");
	t_name_span.className = "sb-tab";
	t_name = document.createTextNode(t_name_text);
	t_name_span.appendChild(t_name);

	t_name_icon = document.createElement("span");
	t_name_icon.className = "dcjq-icon";

	t_a.appendChild(t_i);
	t_a.appendChild(t_name_span);
	t_a.appendChild(t_name_icon);

	t_div.appendChild(t_a);

	options_ul = document.createElement("ul");
	options_ul.className = "sub";

	for (var i = 0; i < sub_pages.length; i ++) {
		var page = sub_pages[i];
		var url = "/" + t_name_text + "/" + page;
		li = document.createElement("li");
		page_a = document.createElement("a");
		page_a.href = url;
		page_name = document.createTextNode(page);
		page_a.appendChild(page_name);
		li.appendChild(page_a);
		options_ul.appendChild(li);
	}

	t_div.appendChild(options_ul);

	return t_div;
}

function load_tournaments_in_sidebar(tourns_data) {
	var sidebar = document.getElementsByClassName("sidebar-menu")[0];
	for (var i = 0; i < tourns_data.length; i ++) {
		
		//checks the date of the tournament and sees 
		//if it should be in the sidebar or archived

		var this_today = new Date();
		var this_year = this_today.getFullYear();
		var this_month = this_today.getMonth() + 1
		var this_day = this_today.getDate();
		var this_date = this_month + '/' + this_day + '/' + this_year
		var this_date_final = new Date(this_date);


		var start_date = String(tourns_data[i].start_date);
    	var start_year = parseInt(start_date.substring(0,4));
    	var start_month = parseInt(start_date.substring(4,6));
    	var start_day = parseInt(start_date.substring(6));
    	var start_date = start_month + '/' + start_day + '/' + start_year
    	var start_date_final = new Date(start_date);

		var timeDiff = this_date_final.getTime() - start_date_final.getTime();
		var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

		if ((diffDays > -8) && (diffDays <22) ){
			var t_div = create_tournament_div(tourns_data[i]);
			sidebar.appendChild(t_div);
		}

	}
}

function click_handlers() {
	$(".dcjq-parent").click(function () {
    	if ($(".brand").css("width") == "70px") {
    		$(".brand").animate({
    			width: "240px"
    		}, {duration: 500, queue: false});
    		$(".sb-tab").show(0);
    		$(".brand_img").attr("src", "/debate/static/images/logo.png");
    		$(".brand_img").css("width", "210");
    		$("#sidebar").animate({
    			width: "240px"
    		}, {duration: 500, queue: false});
            $("#main-content").css("margin-left", "240px");
    	}
    	var thisPointer = this
    	if ($(thisPointer).hasClass("sb-active")) {
    		$(thisPointer).removeClass("sb-active");
    	} else {
            $(".sb-active").each(function(){
                $(this).removeClass("sb-active");
                $(this).nextAll(".sub").slideToggle("fast");
            });
    		$(thisPointer).addClass("sb-active");
    	}
        $(thisPointer).nextAll(".sub").slideToggle("fast");
    })

    $(".sidebar-toggle-box").click(function() {
        $("#sidebar").toggleClass("hide-left-bar");
        $("#main-content").toggleClass("merge-left");
    })
}

$(document).ready(function () {
    $.ajax({
    	type: 'GET',
    	url: kritstats.urls.tournament_query,
    	contentType: 'application/json',
    	success: function (data) {
    		real_data = [];
            for (var i = 0; i<data.length; i++){
        		if (data[i].association != 'UDL'){
          			real_data.push(data[i])
        		}
      		}
    		load_tournaments_in_sidebar(real_data);
    		click_handlers();
    	}
    })
})
