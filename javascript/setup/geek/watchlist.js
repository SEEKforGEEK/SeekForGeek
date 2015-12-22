$(document).ready(function(){
	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");


	$('.browse-job').on('click', function(){
		$(location).attr('href', '/#/search');
	});

	var currentUser = Parse.User.current();
	var watchlistArray = currentUser.get('watchlist');
	
	if (watchlistArray == undefined) {
		$('#append-body').append(
			'<h1>No projects in watchlist</h1>'
		);
	}
	else{
		var query = new Parse.Query("Projects");
		for (var i = 0; i < watchlistArray.length; i++) {

			query.equalTo('objectId', watchlistArray[i]);
			query.first({
				success: function(res){

					$('#append-body').append(
						'<tr>' +
			               '<td class="project-title"><a href="/#/project-details?id='+ 
			               res.id + '">' + res.get('title') + '</a></td>' +
			               '<td class="project-category">' + res.get('type') + '</td>' +
			               '<td class="project-date">' + res.get('endDate') + '</td>' +
			               '<td class="project-price">' + res.get('price') + '</td>' +
			               '<td><button id="remove-' + res.id + '" class="button">Remove</button></td>' +
			            '</tr>'
					);
				},
				error: function(err){
					console.log(err);
				}
			});
		}	
	}


	
});