$(document).ready(function(){
	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");


	$('.browse-job').on('click', function(){
		$(location).attr('href', '/#/search?index=all');
	});

	var currentUser = Parse.User.current();
	var watchlistArray = currentUser.get('watchlist') || [];
	
	if (watchlistArray.length == 0) {
		$('#append-body').append(
			'<h1>No projects in watchlist</h1>'
		);
	}
	else{
		var pages;
		if (watchlistArray.length % 5 == 0) {
			pages = watchlistArray.length / 5;
		}else{
			pages = ((watchlistArray.length / 5) | 0) + 1;
		}
		$('#pagination-demo').twbsPagination({
			totalPages: pages,
			visiblePages: 5,
			onPageClick: function (event, page) {
				$('#append-body').empty();
				var index = page * 5;

				for (var i = index - 5; i < index; i++) {
					if (watchlistArray.length <= i ) {
						break;
					};
					var query = new Parse.Query("Projects");

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
						               '<td><button data-id="'+ res.id + '" class="button remove-buttons">Remove</button></td>' +
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
	}



	$('body').on('click', '.remove-buttons', function(event){


		var id = $('.remove-buttons').data('id');
		var newArray = [],
			j = 0;
		for (var i = 0; i < watchlistArray.length; i++) {
			if (watchlistArray[i] != id){
				newArray[j++] = watchlistArray[i];
			};
		};



		currentUser.set('watchlist', newArray);
		currentUser.save();
		$(this).parent().parent().remove();
	})

	
});