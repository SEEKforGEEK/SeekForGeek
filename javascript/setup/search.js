$(document).ready(function(){
    $(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");

    var query;
    $('#all-projects').on('click', function(){
    	query = new Parse.Query('Projects');
    	query.exists('title');
    	query.find({
    		success: function(res){
    			for (var i = 0; i < res.length; i++) {
    				$('#append-projects').append(
						'<tr>' +
			               '<td class="search-project-title"><a href="/#/project-details?id='+ 
			               res[i].id + '">' + res[i].get('title') + '</a></td>' +
			               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
			               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
			               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
			               '<td><button data-id="'+ res[i].id + '" class="button remove-buttons">Add to watchlist</button></td>' +
			            '</tr>'
					);
    			};
    		}
    	})
    })


});