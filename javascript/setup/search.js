$(document).ready(function(){
    $(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");


    $('#all-projects').on('click', function(){
    	$(location).attr('href', '/#/search?index=all');
    });

    $('#dev-projects').on('click', function(){
    	$(location).attr('href', '/#/search?index=dev');
    });

    $('#design-projects').on('click', function(){
    	$(location).attr('href', '/#/search?index=design');
    });

    var query;
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

	switch(index){
		case 'all': allQuery(); break;
		case 'dev': devProjects(); break;
		case 'design': designProjects(); break;
	}


    // $('#all-projects').on('click', function(){
    // $(location).attr('href', '/#/search?index=all');
    // 	
    // })



});


function allQuery(){
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
		               '<td><button data-id="'+ res[i].id + '" class="button remove-buttons">Add to watchlist</button></td>' +
		            '</tr>'
				);
			};
		}
	});
}

function devProjects(){
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
			               '<td><button data-id="'+ res[i].id + '" class="button remove-buttons">Add to watchlist</button></td>' +
			            '</tr>'
					);	
				};
				
			};
		}
	})
}

function designProjects(){
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
			               '<td><button data-id="'+ res[i].id + '" class="button remove-buttons">Add to watchlist</button></td>' +
			            '</tr>'
					);	
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