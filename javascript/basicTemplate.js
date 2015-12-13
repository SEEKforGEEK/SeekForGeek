$(document).ready(function(){
	$("#logout-button").click(function(){
		Parse.User.logOut();
		$(location).attr("href","/#/home");
	})
});