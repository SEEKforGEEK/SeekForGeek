'use strict';

jQuery(document).ready(function(){
	
	var currentUser = Parse.User.current();  	
	var watchlistArray = currentUser.get('watchlist') || [];
	var query = new Parse.Query('Projects');

	var appendProjects = '#append-projects';

	jQuery('#search-input').bind("change paste keyup", function() {
	    var input = this.value;
	    query.startsWith('title', input);
	    query.find({
	    	success: function(res){
				jQuery(appendProjects).empty();
	    		for (var i = 0; i < res.length; i++) {

	    			if (currentUser.get('type') == 'customer') {
						jQuery(appendProjects).append(
							'<tr>' +
				               '<td class="search-project-title"><a href="/#/project-details?id='+ 
				               res[i].id + '">' + res[i].get('title') + '</a></td>' +
				               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
				               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
				               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
		               		   '<td class="empty-cell"></td>' +
				            '</tr>'
						);
	    			}else{
	    				if (checkWatchlist(watchlistArray, res[i].id)) {
							jQuery(appendProjects).append(
								'<tr>' +
					               '<td class="search-project-title"><a href="/#/project-details?id='+ 
					               res[i].id + '">' + res[i].get('title') + '</a></td>' +
					               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
					               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
					               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
		               			   '<td class="empty-cell"></td>' +					               
					            '</tr>'
							);
		    			}
		    			else{
							jQuery(appendProjects).append(
			    				'<tr>' +
					               	'<td class="search-project-title"><a href="/#/project-details?id='+ 
					               	res[i].id + '">' + res[i].get('title') + '</a></td>' +
					               	'<td class="search-project-category">' + res[i].get('type') + '</td>' +
					               	'<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
					               	'<td class="search-project-price">' + res[i].get('price') + '</td>' +
				            		'<td class="watchlist-func"><button data-id="'+ res[i].id + '" class=" add-to-watchlist" alt="Add to watchlist">' +
									'<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></td>' +
					            '</tr>'
				            );
		    			}
	    			}
	    		}
	    	}
	    })


	});



	jQuery(appendProjects).on('click', '.add-to-watchlist', function(){
		var id = jQuery(this).attr('data-id');
		var handler = jQuery(this);

		watchlistArray.push(id);
		currentUser.set('watchlist', watchlistArray);
		currentUser.save()
			.then(function(){
				handler.hide();
			})
	});

});


function checkWatchlist(watchlist, str){
	for (var i = 0; i < watchlist.length; i++) {
		if (watchlist[i] == str) {
			return true;
		}
	}
	return false;
}