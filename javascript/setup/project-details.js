$(document).ready(function(){
	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    
    var currentUser = Parse.User.current();

    var type = currentUser.get('type');
 	$('#back-button').on('click', function(){
        $(location).attr('href', '/#/' + type + '/projects');
    })
    if (type == 'customer') {
    	$('#geek-add-submit').hide();
    	$('#geek-watchlist').hide();
    	$('#customer-submisions').show();
    };
    if (type == 'geek') {
    	$('#geek-add-submit').show();
    	$('#geek-watchlist').show();
    	$('#customer-submisions').hide();
    	var watchlistArray = currentUser.get('watchlist');
    	if (watchlistArray == undefined) {
    		watchlistArray = [];
    	};
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

	for(var i in watchlistArray){
		if(watchlistArray[i] == id){
			$('#add-watchlist').hide();
		}
	}

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
			$('#customer-email').html(res.get('user').get('email'));
			$('#customer-name').html(res.get('user').get('username'));
			$('#customer-phone').html(res.get('phone'));

		}
	})


	$('#add-watchlist').on('click', function(){
		watchlistArray.push(id);
		currentUser.set('watchlist', watchlistArray);
		currentUser.save()
			.then(function(){
				$('#add-watchlist').hide();
			})
	});
});