'use strict';

jQuery(document).ready(function(){
	jQuery(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    jQuery("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");

	var mail = {};
    var currentUser = Parse.User.current();
    var Messages = new Parse.Object("Messages");
    jQuery('#send-message').on('click', function(event){
    	event.preventDefault();
	   
	    mail.currentEmail = jQuery('#email').val() || currentUser.get('email');
	    mail.firstName = jQuery('#fname').val();
	    mail.lastName = jQuery('#lname').val();
	    mail.phone = jQuery('#phone').val();
	    mail.message = jQuery('#message').val();
	    
	    Messages.set('firstName', mail.firstName);
	    Messages.set('lastName', mail.lastName);
	    Messages.set('email', mail.currentEmail);
	    Messages.set('phone', mail.phone);
	    Messages.set('message', mail.message);

	    Messages.save()
	    	.then(function(){
	    		toastr.success('Successfully send message! Thank you!');
	    		jQuery('#email').val('');
	    		jQuery('#fname').val('');
	    		jQuery('#lname').val('');
	    		jQuery('#phone').val('');
	    		jQuery('#message').val('');
	    	});
	});
});