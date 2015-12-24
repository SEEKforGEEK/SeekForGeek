$(document).ready(function(){
    $(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");


    


	var currentUser = Parse.User.current();    
	
    $('#all-projects').on('click', function(){
    	$(location).attr('href', '/#/search?index=all');
    });

    $('#dev-projects').on('click', function(){
    	$(location).attr('href', '/#/search?index=dev');
    });

    $('#design-projects').on('click', function(){
    	$(location).attr('href', '/#/search?index=design');
    });

    $.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	}
		
	var index = $.urlParam('index');

	
	if (currentUser.get('type') == 'customer') {
		switch(index){
			case 'all': customerAllQuery(); break;
			case 'dev': customerDevProjects(); break;
			case 'design': customerDesignProjects(); break;
			case 'web' : customerSearch('web development'); break;
			case 'software': customerSearch('software development'); break;
			case 'mobile': customerSearch('mobile development'); break;
			case 'game': customerSearch('game development'); break;
			case 'graphic': customerSearch('graphic design'); break;
			case 'web-design': customerSearch('web design'); break;
			case 'logo': customerSearch('logo design'); break;
			case 'banner': customerSearch('banner design'); break;
			case 'brochure': customerSearch('brochure design'); break;
			default: customerAllQuery(); break;
		}
	}else{
		switch(index){
			case 'all': allQuery(); break;
			case 'dev': devProjects(); break;
			case 'design': designProjects(); break;
			case 'web' : geekSearch('web development'); break;
			case 'software': geekSearch('software development'); break;
			case 'mobile': geekSearch('mobile development'); break;
			case 'game': geekSearch('game development'); break;
			case 'graphic': geekSearch('graphic design'); break;
			case 'web-design': geekSearch('web design'); break;
			case 'logo': geekSearch('logo design'); break;
			case 'banner': geekSearch('banner design'); break;
			case 'brochure': geekSearch('brochure design'); break;
			default: allQuery(); break;
		}
	}



});

function customerSearch(type){
	var currentUser = Parse.User.current();  	
	var watchlistArray = currentUser.get('watchlist');
	var query = new Parse.Query('Projects');
	query.equalTo('type', type);
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
		            '</tr>'
				);
			
			};
		}
	})
}
function geekSearch(type){
	var currentUser = Parse.User.current();  	
	var watchlistArray = currentUser.get('watchlist');
	var query = new Parse.Query('Projects');
	query.equalTo('type', type);
	query.find({
		success: function(res){
			for (var i = 0; i < res.length; i++) {
				if (checkWatchlist(watchlistArray, res[i].id)) {
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
				}else{
					$('#append-projects').append(
						'<tr>' +
			               '<td class="search-project-title"><a href="/#/project-details?id='+ 
			               res[i].id + '">' + res[i].get('title') + '</a></td>' +
			               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
			               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
			               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
			            '</tr>'
					);
				}
			
			};
		}
	})
}

function allQuery(){
	var currentUser = Parse.User.current();  	
	var watchlistArray = currentUser.get('watchlist');
	var query = new Parse.Query('Projects');
	query.exists('title');
	query.find({
		success: function(res){
			for (var i = 0; i < res.length; i++) {
				if (checkWatchlist(watchlistArray, res[i].id)) {
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
				}else{
					$('#append-projects').append(
						'<tr>' +
			               '<td class="search-project-title"><a href="/#/project-details?id='+ 
			               res[i].id + '">' + res[i].get('title') + '</a></td>' +
			               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
			               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
			               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
			            '</tr>'
					);
				}
			};
		}
	});
}

function devProjects(){
	var currentUser = Parse.User.current();  	
	var watchlistArray = currentUser.get('watchlist');
	var query = new Parse.Query('Projects');
	query.exists('type');
	query.find({
		success: function(res){
			for (var i = 0; i < res.length; i++) {
				if (checkTypeDev(res[i].get('type'))) {
					if (checkWatchlist(watchlistArray, res[i].id)) {
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
					}else{
						$('#append-projects').append(
							'<tr>' +
				               '<td class="search-project-title"><a href="/#/project-details?id='+ 
				               res[i].id + '">' + res[i].get('title') + '</a></td>' +
				               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
				               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
				               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
				            '</tr>'
						);
					}
				};
				
			};
		}
	})
}

function designProjects(){
	var currentUser = Parse.User.current();  	
	var watchlistArray = currentUser.get('watchlist');
	var query = new Parse.Query('Projects');
	query.exists('type');
	query.find({
		success: function(res){
			for (var i = 0; i < res.length; i++) {
				if (!checkTypeDev(res[i].get('type'))) {
					if (checkWatchlist(watchlistArray, res[i].id)) {
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
					}else{
						$('#append-projects').append(
							'<tr>' +
				               '<td class="search-project-title"><a href="/#/project-details?id='+ 
				               res[i].id + '">' + res[i].get('title') + '</a></td>' +
				               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
				               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
				               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
				            '</tr>'
						);
					}
				};
				
			};
		}
	})
}

function checkTypeDev(str){
	var dev = 'development';
	var j = 0;
	
	for (var i = str.length - dev.length; i < str.length; i++) {
		if(str[i] != dev[j++]){
			return false;
		}
	};
	return true;
}
function checkWatchlist(watchlist, str){
	for (var i = 0; i < watchlist.length; i++) {
		if (watchlist[i] == str) {
			return true;
		};
	};
	return false;
}


function customerAllQuery(){
	var query = new Parse.Query('Projects');
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
		            '</tr>'
				);
			};
		}
	});
}

function customerDevProjects(){
	var query = new Parse.Query('Projects');
	query.exists('type');
	query.find({
		success: function(res){
			for (var i = 0; i < res.length; i++) {
				if (checkTypeDev(res[i].get('type'))) {
					$('#append-projects').append(
						'<tr>' +
			               '<td class="search-project-title"><a href="/#/project-details?id='+ 
			               res[i].id + '">' + res[i].get('title') + '</a></td>' +
			               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
			               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
			               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
			            '</tr>'
					);	
				};
				
			};
		}
	})
}

function customerDesignProjects(){
	var query = new Parse.Query('Projects');
	query.exists('type');
	query.find({
		success: function(res){
			for (var i = 0; i < res.length; i++) {
				if (!checkTypeDev(res[i].get('type'))) {
					$('#append-projects').append(
						'<tr>' +
			               '<td class="search-project-title"><a href="/#/project-details?id='+ 
			               res[i].id + '">' + res[i].get('title') + '</a></td>' +
			               '<td class="search-project-category">' + res[i].get('type') + '</td>' +
			               '<td class="search-project-date">' + res[i].get('endDate') + '</td>' +
			               '<td class="search-project-price">' + res[i].get('price') + '</td>' +
			            '</tr>'
					);	
				};
				
			};
		}
	})
}

// function searchInput(){
// 	var searched = $('#search-input').val();

// 	var query = new Parse.Query('Projects');

// }