$(function() {
	$('#password_input').keyup(function() {
		var username = $('#id_input').val();
		var password = $(this).val();
		if (username && password){
			var login_hidden = $('#login_button').attr('data-hidden');
			if (login_hidden == "true") {
				$('#login_button').fadeIn("slow");
				$('#login_button').attr('data-hidden', 'false');
			}
		} else {
			var login_hidden = $('#login_button').attr('data-hidden');
			if (login_hidden == "false") {
				$('#login_button').fadeOut("slow");
				$('#login_button').attr('data-hidden', 'true');
			}
		}
	})
	$('#id_input').keyup(function() {
		var password = $('#password_input').val();
		var username = $(this).val();
		if (username && password){
			var login_hidden = $('#login_button').attr('data-hidden');
			if (login_hidden == "true") {
				$('#login_button').fadeIn("slow");
				$('#login_button').attr('data-hidden', 'false');
			}
		} else {
			var login_hidden = $('#login_button').attr('data-hidden');
			if (login_hidden == "false") {
				$('#login_button').fadeOut("slow");
				$('#login_button').attr('data-hidden', 'true');
			}
		}
	})
	$('#login_button').hover(function(){
		$(this).animate({
			backgroundColor: "black",
			color: "white"
		}, 300)
	}, function() {
		$(this).animate({
			backgroundColor: "white",
			color: "black"
		}, 300)
	})
	$('#login_button').hide();
	if ($('#login_button').attr('data-hidden') == "none"){
		$('#login_button').attr('data-hidden', 'true');
	}
	$('.page_select').hover(function() {
		if ($(this).attr("data-clicked") == "false"){
			$(this).animate({
				backgroundColor: "#A35200",
				color: "#FFCC99"
			}, 300)
		}
	}, function() {
		if ($(this).attr("data-clicked") == "false"){
			$(this).animate({
				backgroundColor: "white",
				color: "black"
			}, 300)
		}
	})
	$('#tabroom_button').click(function() {
		$(this).attr('data-clicked', 'true');
		$(this).css('background-color', '#A35200');
		$(this).css('color', '#FFCC99');
		if ($('#joy_button').attr('data-clicked') == 'true'){
			$('#joy_button').attr('data-clicked', 'false');
			$('#joy_button').css('background-color', 'white');
			$('#joy_button').css('color', 'black');
		}
	})
	$('#joy_button').click(function() {
		$(this).attr('data-clicked', 'true');
		$(this).css('background-color', '#A35200');
		$(this).css('color', '#FFCC99');
		if ($('#tabroom_button').attr('data-clicked') == 'true'){
			$('#tabroom_button').attr('data-clicked', 'false');
			$('#tabroom_button').css('background-color', 'white');
			$('#tabroom_button').css('color', 'black');
		}
	})
})