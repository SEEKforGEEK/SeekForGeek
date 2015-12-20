$(document).ready(function(){
	$("#logout-button").click(function(){
		Parse.User.logOut();
		$(location).attr("href","/#/home");
		$(".navbarTemplate")
        .removeClass("navbarTemplateOn")
        .addClass("navbarTemplateNone");
	});

	$("#profile-button").click(function(){
		var user = Parse.User.current();
		if (user.get('type') == 'customer') {
			$(location).attr('href',"/#/customer/profile");
		}else{
			$(location).attr('href',"/#/geek/profile");
		}
	})
});