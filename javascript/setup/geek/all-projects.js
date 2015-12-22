$(document).ready(function(){
	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");

	$('.browse-job').on('click',function(){
		$(location).attr('href', '/#/search');
	});



});