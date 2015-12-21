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



	$('#details-next').click(function(){
	
		$('#description-link').attr('href', '#description')
			.attr('data-toggle', 'tab')
			.attr('aria-expanded', true)
			.addClass('tabs');
	    	
    	$('#description-link').trigger('click');
    	$('#details-link').removeAttr('href')
    		.removeAttr('aria-expanded')
    		.removeAttr('data-toggle');	
		
    });	
	$('#description-next').click(function(){  		
		console.log(validateDetails());

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

    $('#done').click(function(){
    	if (validatePayment()) {
    		sendData();
    		$(location).attr('href','/#/customer/projects');
    	};
    	
    });
})

function validateDetails(){
	var title = $('#title').val();
	var task = $('#task').val();
	var	date = $('#datepicker').val();
	if (title == '' || task == '' || date == '') {
		return false;
	};
	return true;
}

function validatePayment(){
	var price = $('#payment-price').val();
	var email = $('#payment-email').val();
	var phone = $('#payment-phone').val();
	if (price == '' || email == '' || phone == '') {
		return false;
	};
	return true;
}

function sendData(){
	var details = {
		title: $('#title').val(),
		task: $('#task').val(),
		date: $('#datepicker').val(),
		type: $('input[name=radioButtons]:checked', '#radioDetails').val(),
		price: $('#payment-price').val()

	}
	var fileUploadControl = $("#picture")[0];
	if (fileUploadControl.files.length > 0) {
	  	var file = fileUploadControl.files[0];
	 	var name = 'picture.png';

	 	var parseFile = new Parse.File(name, file);
	 	parseFile.save()
	 		.then(function() {
	 			var fileUploadControlFiles = $('#files')[0];
	 			if (fileUploadControlFiles.files.length > 0) {
	 				
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
							Projects.set('price', details.price);
							Projects.set("picture", parseFile);
							Projects.set('files', parseFiles);
							Projects.save();
							return true;
	 					},
	 					function(error){
	 						console.log('error files' + error);
	 						return false;
	 					});
	 			};

		}, function(error) {
			console.log('error picture ' + error );
			return false;
		});
	}
	return true;
	
	
}