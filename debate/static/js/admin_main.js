

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

function create_tournament_button(data) {
  var li = document.createElement("li");
  var a = document.createElement("a");
  var href = "/admin/modifydashboard/" + data.tournament_name;
  a.setAttribute("href", href);
  var t_name = document.createTextNode(data.tournament_name);
  a.appendChild(t_name);
  li.appendChild(a);
  return li
}

function load_tournaments_in_sidebar(data) {
  var tourn_panel = document.getElementsByClassName("admin-tournament-sub")[0];
  for (var i = 0; i < data.length; i ++) {
  	var tournament = create_tournament_button(data[i]);
  	tourn_panel.appendChild(tournament);
  }
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