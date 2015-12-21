$(document).ready(function(){
	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    
    var currentUser = Parse.User.current();

    var type = currentUser.get('type');

    if (type == 'customer') {
    	$('#geek-add-submit').hide();
    	$('#geek-watchlist').hide();
    	$('#customer-submisions').show();
    };
    if (type == 'geek') {
    	$('#geek-add-submit').show();
    	$('#geek-watchlist').show();
    	$('#customer-submisions').hide();
    };
    $.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	}
		
	var id = $.urlParam('id')

	var query = new Parse.Query("Projects");

	query.equalTo('objectId', id);
	query.first({
		success: function(res){
			$('#project-name').html(res.get('title'));
			$('#project-details').append('<p>' + res.get('task') + '</p>');
			$('#project-category').html(res.get('type'));
			$('#project-picture').attr('src', res.get('picture').url());
			$('#project-price').html(res.get('price'));
			$('#project-date').html(res.get('endDate'));
			// $('#customer-email')


		}
	})
});