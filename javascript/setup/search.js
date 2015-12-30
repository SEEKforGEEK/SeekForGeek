var SearchModule = function(settings){

	var options = {
		parse: {
		},
		currentUser: {
		},
		selectors: {
			appendProjects: '#append-projects',
			btnAllProjects: '#all-projects',
			btnDevProjects: '#dev-projects',
			btnDesignProjects: '#design-projects',
			urlAllProjects: '/#/search?index=all',
			urlDevProjects: '/#/search?index=dev',
			urlDesignProjects: '/#/search?index=design'
		},
		variables: {
			
		},
	},
	

	initialize = function(){

		jQuery(".navbarTemplate")
	        .removeClass("templateNone")
	        .addClass("templateOn");
	    jQuery("#footerTemplate")
	        .removeClass("templateNone")
	        .addClass("templateOn");

		options.parse.currentUser = Parse.User.current();
		options.parse.queryProjects = new Parse.Query('Projects');
		options.variables.urlParameter = urlParam('index');

		options.currentUser.type = options.parse.currentUser.get('type');
		options.currentUser.watchlist = options.parse.currentUser.get('watchlist') || []
		moneySlider();

	    jQuery(options.selectors.btnAllProjects).on('click', function(){
	    	jQuery(location).attr('href', options.selectors.urlAllProjects);
	    });

	    jQuery(options.selectors.btnDevProjects).on('click', function(){
	    	jQuery(location).attr('href', options.selectors.urlDevProjects);
	    });

	    jQuery(options.selectors.btnDesignProjects).on('click', function(){
	    	jQuery(location).attr('href', options.selectors.urlDesignProjects);
	    });
	    if (parseInt(options.variables.urlParameter) > 0) {
	    	var url = parseInt(options.variables.urlParameter);
    		if (jQuery('#slider2').attr('max') < url){
    			return;
    		}
    		jQuery('#slider2').attr('value', url);
	        jQuery("#budget").html(url);
	    	searchWithSlider(url);
	    };
	    switch(options.variables.urlParameter){
			case 'all': allProjects(options.currentUser.type); break;
			case 'dev': developmentProjects(); break;
			case 'design': designProjects(); break;
			case 'web' : typeSearch(options.currentUser.type, 'web development'); break;
			case 'software': typeSearch(options.currentUser.type, 'software development'); break;
			case 'mobile': typeSearch(options.currentUser.type, 'mobile development'); break;
			case 'game': typeSearch(options.currentUser.type, 'game development'); break;
			case 'graphic': typeSearch(options.currentUser.type, 'graphic design'); break;
			case 'web-design': typeSearch(options.currentUser.type, 'web design'); break;
			case 'logo': typeSearch(options.currentUser.type, 'logo design'); break;
			case 'banner': typeSearch(options.currentUser.type, 'banner design'); break;
			case 'brochure': typeSearch(options.currentUser.type, 'brochure design'); break;
			// default: customerAllQuery(); break;
		}

	},


	checkWatchlist = function(watchlist, str){
		for (var i = 0; i < watchlist.length; i++) {
			if (watchlist[i] == str) {
				return true;
			};
		};
		return false;
	},

	successGeekSearch = function(result){
		var pages;
		if (result.length % 5 == 0) {
			pages = result.length / 5;
		}else{
			pages = ((result.length / 5) | 0) + 1;
		}
		jQuery('#pagination-demo').twbsPagination({
			totalPages: pages,
			visiblePages: 5,
			onPageClick: function (event, page) {

				jQuery(options.selectors.appendProjects).empty();
				var index = page * 5;

				for (var i = index - 5; i < index; i++) {
					if (result.length <= i ) {
						break;
					}
					if (!checkWatchlist(options.currentUser.watchlist, result[i].id)) {
						jQuery(options.selectors.appendProjects).append(tableRowWatchlist(result[i]));
					}else{
						jQuery(options.selectors.appendProjects).append(tableRowWithoutWatchlist(result[i]));
					}			
				}
			}
		});	
	},

	successCustomerSearch = function(result){
		var pages;
		if (result.length % 5 == 0) {
			pages = result.length / 5;
		}else{
			pages = ((result.length / 5) | 0) + 1;
		}

		jQuery('#pagination-demo').twbsPagination({
			totalPages: pages,
			visiblePages: 5,
			onPageClick: function (event, page) {
				jQuery(options.selectors.appendProjects).empty();
				var index = page * 5;

				for (var i = index - 5; i < index; i++) {
					if (result.length <= i ) {
						break;
					}
					jQuery(options.selectors.appendProjects).append(tableRowWithoutWatchlist(result[i]));
				}
			}
		});	
	},

	errorParse = function(error){
		alert("Sorry something is wrong! Please log out and log in again");
	},

	typeSearch = function(userType, type){
		options.parse.queryProjects.equalTo('type', type);

		if (userType == 'customer') {
			options.parse.queryProjects.find({
				success: function(result){
					successCustomerSearch(result)
				},
				error: function(){
					 errorParse();	
				}
			});
		}else{
			options.parse.queryProjects.find({
				success: function(result){ 
					successGeekSearch(result);
				},
				error: function(){
					 errorParse();	
				}
			});
		}
	},

	allProjects = function(type){			
		if (type == 'customer') {
			options.parse.queryProjects.exists('title');
			options.parse.queryProjects.find({
				success: function(result){
					successCustomerSearch(result);	
				},
				error: function(){
					 errorParse();	
				}
			});	
		}else if(type == 'geek'){
			options.parse.queryProjects.exists('title');
			options.parse.queryProjects.find({
				success: function(result){
					successGeekSearch(result);
				},
				error: function(){
					 errorParse();	
				}
			});
		}
	},

	developmentProjects = function(){
		options.parse.queryProjects.exists('type');
		if (options.currentUser.type == 'geek') {
			options.parse.queryProjects.find({
				success: function(result){
					for (var i = 0; i < result.length; i++) {
						if (checkTypeDev(result[i].get('type'))) {
							if (!checkWatchlist(options.currentUser.watchlist, result[i].id)) {
								jQuery(options.selectors.appendProjects).append(tableRowWatchlist(result[i]));
							}else{
								jQuery(options.selectors.appendProjects).append(tableRowWithoutWatchlist(result[i]));
							}
						};
					};
				},
				error: function(){
					 errorParse();	
				}
			});
		}else{
			options.parse.queryProjects.find({
				success: function(result){
					for (var i = 0; i < result.length; i++) {
						if (checkTypeDev(result[i].get('type'))) {
							jQuery(options.selectors.appendProjects).append(tableRowWithoutWatchlist(result[i]));
						}
					};
				},
				error: function(){
					 errorParse();	
				}
			});
		}	
	},

	designProjects = function(){
		options.parse.queryProjects.exists('type');
		if (options.currentUser.type == 'geek') {
			options.parse.queryProjects.find({
				success: function(result){
					for (var i = 0; i < result.length; i++) {
						if (!checkTypeDev(result[i].get('type'))) {
							if (!checkWatchlist(options.currentUser.watchlist, result[i].id)) {
								jQuery(options.selectors.appendProjects).append(tableRowWatchlist(result[i]));
							}else{
								jQuery(options.selectors.appendProjects).append(tableRowWithoutWatchlist(result[i]));
							}
						};
					};
				},
				error: function(){
					 errorParse();	
				}
			});
		}else{
			options.parse.queryProjects.find({
				success: function(result){
					for (var i = 0; i < result.length; i++) {
						if (!checkTypeDev(result[i].get('type'))) {
							jQuery(options.selectors.appendProjects).append(tableRowWithoutWatchlist(result[i]));
						}
					};
				},
				error: function(){
					 errorParse();	
				}
			});
		}	
	},
	moneySlider = function(){
		var maxPrice = 0;
		options.parse.queryProjects.exists('price');
		options.parse.queryProjects.find({
			success: function(result){
				for (var i = 0; i < result.length; i++) {
					if (result[i].get('price') > maxPrice) {
						maxPrice = result[i].get('price');
					};
				};
				jQuery('#slider2').attr('max', maxPrice);
			},
			error: function(err){
				errorParse();
			}
		});
		var budget;
		jQuery("#slider2").change( function(e){
	        budget = jQuery(this).val();
	        jQuery("#budget").html(budget);
	        jQuery(location).attr('href', '/#/search?index=' + budget);
	    });
	},

	searchWithSlider = function(price){
		options.parse.queryProjects.greaterThan('price', parseInt(price));
		options.parse.queryProjects.find({
			success: function(result){
				jQuery('#pagination-demo').hide();
				if (result.length == 0) {
					jQuery(options.selectors.appendProjects).html('<h1>No projects</h1>');
				};
				if (options.currentUser.type == 'geek') {

					jQuery(options.selectors.appendProjects).empty();
					for (var i = 0; i < result.length; i++) {
						if (!checkWatchlist(options.currentUser.watchlist, result[i].id)) {
							jQuery(options.selectors.appendProjects).append(tableRowWatchlist(result[i]));
						}else{
							jQuery(options.selectors.appendProjects).append(tableRowWithoutWatchlist(result[i]));
						}			
					}
				}else{
					for (var i = 0; i < result.length; i++) {	
						jQuery(options.selectors.appendProjects).append(tableRowWithoutWatchlist(result[i]));
					}				
				}
			}
		})
	}
	
	tableRowWithoutWatchlist = function(result){
		var rowWithoutWatchlist = '<tr>' +
			'<td class="search-project-title"><a href="/#/project-details?id='+ result.id + '">' + result.get('title') + '</a></td>' +
			'<td class="search-project-category">' + result.get('type') + '</td>' + 
			'<td class="search-project-date">' + result.get('endDate') + '</td>' + 
			'<td class="search-project-price">' + result.get('price') + '</td>' +
			'<td class="empty-cell"></td>' +
		'</tr>';

        return rowWithoutWatchlist;
	},

	tableRowWatchlist = function(result){
		var rowWatchlist = '<tr>' +
			'<td class="search-project-title"><a href="/#/project-details?id='+ result.id + '">' + result.get('title') + '</a></td>' + 
			'<td class="search-project-category">' + result.get('type') + '</td>' + 
			'<td class="search-project-date">' + result.get('endDate') + '</td>' + 
			'<td class="search-project-price">' + result.get('price') + '</td>' + 
            '<td class="watchlist-func"><button data-id="'+ result.id + '" class=" add-to-watchlist" alt="Add to watchlist"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></td>' +
		'</tr>';
        return rowWatchlist;
	},

	checkTypeDev = function(str){
		var dev = 'development';
		var j = 0;
		
		for (var i = str.length - dev.length; i < str.length; i++) {
			if(str[i] != dev[j++]){
				return false;
			}
		};
		return true;
	},

	urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	};

	return{
		initialize: initialize
	};
}


jQuery(document).ready(function(){
	
	SearchModule().initialize();
})