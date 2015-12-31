$(document).ready(function(){
 	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    
    
    var dateToday = new Date();
	var dates = $("#datepicker").datepicker({
	    defaultDate: "+1w",
	    changeMonth: true,
	    numberOfMonths: 1,
	    minDate: dateToday,
	    onSelect: function(selectedDate) {
	        var option = this.id == "from" ? "minDate" : "maxDate",
	            instance = $(this).data("datepicker"),
	            date = $.datepicker.parseDate(instance.settings.dateFormat 
	            	|| $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
	        dates.not(this).datepicker("option", option, date);
	    }
	});

	var currentUser = Parse.User.current();
	var email = currentUser.get('email');
	$('#payment-email').val(email);



	$('#details-next').on('click', function(){
	
		$('#description-link').attr('href', '#description')
			.attr('data-toggle', 'tab')
			.attr('aria-expanded', true)
			.addClass('tabs');
	    	
    	$('#description-link').trigger('click');
    	$('#details-link').removeAttr('href')
    		.removeAttr('aria-expanded')
    		.removeAttr('data-toggle');	
		
    });	
	$('#description-next').on('click', function(){  		

		if (validateDetails()) {
	  		$('#payment-link').attr('href', '#payment')
	  			.attr('data-toggle', 'tab')
	  			.attr('aria-expanded', true)
	  			.addClass('tabs');

			$('#payment-link').trigger('click');


			$('#description-link').removeAttr('href')
			.removeAttr('aria-expanded')
			.removeAttr('data-toggle')
			.removeClass('tabs');
		};			

    });

    $('#done').on('click', function(){
    	if (validatePayment()) {
    		sendData();
    	};
    	
    });
})

function validateDetails(){
	var title = $('#title').val();
	var task = $('#task').val();
	var	date = $('#datepicker').val();
	var titleForm = $('#describe-title-form');
	var taskForm = $('#describe-task-form');
	var dateForm = $('#describe-date-form');
	if (title == '') {
		if (titleForm.hasClass('has-success')) {
            titleForm.removeClass('has-success');
        }
        titleForm.addClass('has-error');
		return false;
	}else{
		if (titleForm.hasClass('has-error')) {
            titleForm.removeClass('has-error');
        }
        titleForm.addClass('has-success');
	}
	if (task == '') {
		if (taskForm.hasClass('has-success')) {
            taskForm.removeClass('has-success');
        }
        taskForm.addClass('has-error');
		return false;
	}else{
		if (taskForm.hasClass('has-error')) {
            taskForm.removeClass('has-error');
        }
   		taskForm.addClass('has-success');
	};
	if (date == '') {
		if (dateForm.hasClass('has-success')) {
            dateForm.removeClass('has-success');
        }
        dateForm.addClass('has-error');
		return false;
	}else{
		if (dateForm.hasClass('has-error')) {
            dateForm.removeClass('has-error');
        }
   		dateForm.addClass('has-success');
	};
	return true;
}

function validatePayment(){
	var price = $('#payment-price').val();
	var email = $('#payment-email').val();
	var phone = $('#payment-phone').val();
	var priceForm = $('#contact-price-form');
	var emailForm = $('#contact-email-form');
	var phoneForm = $('#contact-phone-form');
	 var patternForEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

	if (price == '' && parseInt(price) < 0) {
		if (priceForm.hasClass('has-success')) {
            priceForm.removeClass('has-success');
        }
        priceForm.addClass('has-error');
		return false;
	}else{
		if (priceForm.hasClass('has-error')) {
            priceForm.removeClass('has-error');
        }
        priceForm.addClass('has-success');
	}
	if (!email.match(patternForEmail)) {
		if (emailForm.hasClass('has-success')) {
            emailForm.removeClass('has-success');
        }
        emailForm.addClass('has-error');
		return false;
	}else{
		if (emailForm.hasClass('has-error')) {
            emailForm.removeClass('has-error');
        }
   		emailForm.addClass('has-success');
	};
	if (phone == '') {
		if (phoneForm.hasClass('has-success')) {
            phoneForm.removeClass('has-success');
        }
        phoneForm.addClass('has-error');
		return false;
	}else{
		if (phoneForm.hasClass('has-error')) {
            phoneForm.removeClass('has-error');
        }
   		phoneForm.addClass('has-success');
	};
	return true;
}

function sendData(){
	var details = {
		title: $('#title').val(),
		task: $('#task').val(),
		date: $('#datepicker').val(),
		type: $('input[name=radioButtons]:checked', '#radioDetails').val(),
		price: $('#payment-price').val(),
		phone: $('#payment-phone').val(),
		email: $('#payment-email').val()
	}
	var fileUploadControl = $("#picture")[0];
	var currentUser = Parse.User.current();
	var currentUserName = currentUser.get('username');
	if (fileUploadControl.files.length > 0) {
	  	var file = fileUploadControl.files[0];
	 	var name = 'picture.png';

	 	var parseFile = new Parse.File(name, file);
	 	parseFile.save()
	 		.then(function() {
	 			var fileUploadControlFiles = $('#files')[0];
	 			if (fileUploadControlFiles.files.length > 0) {
	 				console.log('sadasdadsadas');
	 				var files = fileUploadControlFiles.files[0];
	 				var nameFiles = "project-files.zip";
	 				var parseFiles = new Parse.File(nameFiles, files);
	 				parseFiles.save()
	 					.then(function(){   

	 						var Projects = new Parse.Object("Projects");
							Projects.set("title", details.title);
							Projects.set('task', details.task);
							Projects.set('endDate', details.date);
							Projects.set('type', details.type);
							Projects.set('price', parseInt(details.price));
							Projects.set('phone', details.phone);
							Projects.set("picture", parseFile);
							Projects.set('files', parseFiles);
							Projects.set('owner', currentUserName);
							Projects.set('ownerEmail', details.email);
							Projects.save();
							toastr.success('You successfully create new project!');
							$(location).attr('href','/#/customer/projects');
	 					},
	 					function(error){
	 						toastr.error('Something happen, please try later!');
	 					});
	 			};

		}, function(error) {
			toastr.error('Something happen, please try later!');
		});
	}	
}