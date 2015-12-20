$(document).ready(function(){
 	$(".navbarTemplate")
        .removeClass("navbarTemplateNone")
        .addClass("navbarTemplateOn");
    
    
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


	$('#details-next').click(function(){


		var radioButton = $('input[name=radioButtons]:checked', '#radioDetails').val()
		

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
		
  		$('#payment-link').attr('href', '#payment')
  			.attr('data-toggle', 'tab')
  			.attr('aria-expanded', true)
  			.addClass('tabs');

		$('#payment-link').trigger('click');


		$('#description-link').removeAttr('href')
		.removeAttr('aria-expanded')
		.removeAttr('data-toggle')
		.removeClass('tabs');
    });
})