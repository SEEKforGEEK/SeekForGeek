$(document).ready(function(){
	$("#logout-button").on('click', function(){
		Parse.User.logOut();
		$(location).attr("href","/#/home");
		$(".navbarTemplate")
			.removeClass("templateOn")
			.addClass("templateNone");
		$("#footerTemplate")
			.removeClass("templateOn")
			.addClass("templateNone");
	});

	$("#profile-button").on('click', function(){
		var user = Parse.User.current();
		if (user.get('type') == 'customer') {
			$(location).attr('href',"/#/customer/profile");
		}else{
			$(location).attr('href',"/#/geek/profile");
		}
	});
	
});