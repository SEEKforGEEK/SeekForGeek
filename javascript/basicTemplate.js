'use strict';

jQuery(document).ready(function(){
	jQuery("#logout-button").on('click', function(){
		Parse.User.logOut();
		jQuery(location).attr("href","/#/home");
		jQuery(".navbarTemplate")
			.removeClass("templateOn")
			.addClass("templateNone");
		jQuery("#footerTemplate")
			.removeClass("templateOn")
			.addClass("templateNone");
	});

	jQuery("#profile-button").on('click', function(){
		var user = Parse.User.current();
		if (user.get('type') == 'customer') {
			jQuery(location).attr('href',"/#/customer/profile");
		}else{
			jQuery(location).attr('href',"/#/geek/profile");
		}
	});
	
});