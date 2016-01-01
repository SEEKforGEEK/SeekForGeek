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
			projects: []
		}
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

		options.parse.queryProjects.exists('title');
		options.parse.queryProjects.find({
			success: function(result){
				for (var i = 0; i < result.length; i++) {
					options.variables.projects[i] = result[i];
				};
			}
		}).then(function(){
		    if (parseInt(options.variables.urlParameter) >= 0) {
		    	var url = parseInt(options.variables.urlParameter);
				if (jQuery('#slider2').attr('max') < url){
					return;
				}
				jQuery('#slider2').attr('value', url);
		        jQuery("#budget").html(url);
		    	searchWithSlider(url, options.currentUser.type);
		    };
		    
			switch(options.variables.urlParameter){
				case 'all': allProjects(options.currentUser.type); break;
				case 'dev': developmentProjects(options.currentUser.type); break;
				case 'design': designProjects(options.currentUser.type); break;
				case 'web' : typeSearch(options.currentUser.type, 'web development'); break;
				case 'software': typeSearch(options.currentUser.type, 'software development'); break;
				case 'mobile': typeSearch(options.currentUser.type, 'mobile development'); break;
				case 'game': typeSearch(options.currentUser.type, 'game development'); break;
				case 'graphic': typeSearch(options.currentUser.type, 'graphic design'); break;
				case 'web-design': typeSearch(options.currentUser.type, 'web design'); break;
				case 'logo': typeSearch(options.currentUser.type, 'logo design'); break;
				case 'banner': typeSearch(options.currentUser.type, 'banner design'); break;
				case 'brochure': typeSearch(options.currentUser.type, 'brochure design'); break;
			}
			//searchInput(options.currentUser.type);

		})
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
		jQuery('.pagination-demo').twbsPagination({
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

		jQuery('.pagination-demo').twbsPagination({
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

	typeSearch = function(userType, type){
		var typeProjects = [],
			j = 0;
		for (var i = 0; i < options.variables.projects.length; i++) {
			if (options.variables.projects[i].get('type') == type) {
				typeProjects[j++] = options.variables.projects[i];
			};
		}

		if (userType == 'customer') {
			successCustomerSearch(typeProjects);	
		}else if(userType == 'geek'){
			successGeekSearch(typeProjects);
		}
	},

	allProjects = function(type){			
		if (type == 'customer') {
			successCustomerSearch(options.variables.projects);	
		}else if(type == 'geek'){
			successGeekSearch(options.variables.projects);
		}
	},

	developmentProjects = function(type){
		var devProjects = [],
			j = 0;
		for (var i = 0; i < options.variables.projects.length; i++) {
			if (checkTypeDev(options.variables.projects[i].get('type'))) {
				devProjects[j++] = options.variables.projects[i];
			};
		}
		if (type == 'customer') {
			successCustomerSearch(devProjects);	
		}else if(type == 'geek'){
			successGeekSearch(devProjects);
		}


	},

	designProjects = function(type){
		var designProjects = [],
			j = 0;
		for (var i = 0; i < options.variables.projects.length; i++) {
			if (!checkTypeDev(options.variables.projects[i].get('type'))) {
				designProjects[j++] = options.variables.projects[i];
			};
		}
		if (type == 'customer') {
			successCustomerSearch(designProjects);	
		}else if(type == 'geek'){
			successGeekSearch(designProjects);
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

	searchWithSlider = function(price, type){
		var sliderProjects = [],
			j = 0,
			price = parseInt(price);

		for (var i = 0; i < options.variables.projects.length; i++) {
			if (options.variables.projects[i].get('price') > price) {
				sliderProjects[j++] = options.variables.projects[i];
			};
		}
		if (type == 'customer') {
			successCustomerSearch(sliderProjects);	
		}else if(type == 'geek'){
			successGeekSearch(sliderProjects);
		}
	},

	// searchInput = function(type){

	// 	$('#search-input').bind("change paste keyup", function() {
	// 	    var input = this.value;
	// 	    options.parse.queryProjects.startsWith('title', input);
	// 	    options.parse.queryProjects.find({
	// 	    	success: function(res){
	// 	    		if (type == 'customer') {
	// 					successCustomerSearch(res);	
	// 				}else if(type == 'geek'){
	// 					successGeekSearch(res);
	// 				}
	// 			}
	// 		});
	// 	});
	// },
	
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