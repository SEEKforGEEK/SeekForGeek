$(document).ready(function(){
	
	var currentUser = Parse.User.current();  	
	var watchlistArray = currentUser.get('watchlist');
	var query = new Parse.Query('Projects');	
	$('#search-input').keypress(function() {
	    var input = this.value;
	    query.startsWith('title', input);
	    query.find({
	    	success: function(res){
	    		$('#append-projects').html("")
	    		for (var i = 0; i < res.length; i++) {

	    			if (currentUser.get('type') == 'customer') {
	    				$('#append-projects').append(
							'<tr>' +
				               '<td class="search-project-title"><a href="/#/project-details?id='+ 
				               res[i].id + '">' + res[i].get('title') + '</a></td>' +
				               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
				               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
				               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
				            '</tr>'
						);
	    			}else{
	    				$('#append-projects').append(
							'<tr>' +
				               '<td class="search-project-title"><a href="/#/project-details?id='+ 
				               res[i].id + '">' + res[i].get('title') + '</a></td>' +
				               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
				               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
				               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
				               '<td class="watchlist-func"><button data-id="'+ res[i].id + '" class="button add-to-watchlist">Add to watchlist</button></td>' +
				            '</tr>'
						);
	    			}
	    		};
	    	}
	    })


	});


});