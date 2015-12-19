$(document).ready(function(){
	$("#logout-button").click(function(){
		Parse.User.logOut();
		$(location).attr("href","/#/home");
		$(".navbarTemplate")
        .removeClass("navbarTemplateOn")
        .addClass("navbarTemplateNone");
	});

	$("#profile-button").click(function(){
		$(location).attr('href',"/#/geek/profile");
	})
});