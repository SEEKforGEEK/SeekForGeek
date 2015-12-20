$(document).ready(function(){
 	$(".navbarTemplate")
        .removeClass("navbarTemplateNone")
        .addClass("navbarTemplateOn");


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