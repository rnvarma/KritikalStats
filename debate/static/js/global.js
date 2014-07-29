
sub_pages = ["Dashboard", "Main", "Entries", "Bracket"];

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
		var t_div = create_tournament_div(tourns_data[i]);
		sidebar.appendChild(t_div);
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
    	if ($(".brand").css("width") == "240px") {
    		$(".brand").animate({
    			width: "70px"
    		}, {duration: 500, queue: false});
    		$(".sb-tab").hide(0);
    		$(".brand_img").attr("src", "/debate/static/images/crown.png");
    		$(".brand_img").css("width", "46px");
    		$(".dcjq-parent").each(function() {
    			$(this).removeClass("sb-active");
    			$(this).nextAll(".sub").hide();
    		})
            $("#main-content").css("margin-left", "70px");
    	} else {
    		$(".brand").animate({
    			width: "240px"
    		}, {duration: 500, queue: false});
    		$(".sb-tab").show(0);
    		$(".brand_img").attr("src", "/debate/static/images/logo.png");
    		$(".brand_img").css("width", "210");
            $("#main-content").css("margin-left", "240px");
    	}
    	if ($("#sidebar").css("width") == "240px") {
    		$("#sidebar").animate({
    			width: "70px"
    		}, {duration: 500, queue: false});
    	} else {
    		$("#sidebar").animate({
    			width: "240px"
    		}, {duration: 500, queue: false});
    	}
    })
}

$(document).ready(function () {
    $.ajax({
    	type: 'GET',
    	url: location.protocol + "//" + location.hostname + ":8000/1/tournament/",
    	contentType: 'application/json',
    	success: function (data) {
    		load_tournaments_in_sidebar(data);
    		click_handlers();
    	}
    })
})