var ProjectsModule = function(settings){
	var options = {
		parse: {
		},
		currentUser: {
		},
		selectors: {
			projectsBadge: '#customer-projects-badge',
			mainProfile: '.mainProfile',
			pagingDemo: '#pagination-demo',
			body: '#append-body',
			slider: '#slider2',
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
		options.currentUser.username = options.parse.currentUser.get('username');
		options.parse.queryProjects.equalTo('owner', options.currentUser.username);
		options.parse.queryProjects.find({
			success: function(projects){
				var pages;

				jQuery(options.selectors.projectsBadge).html(projects.length);
				if (projects.length === 0) {
					jQuery(options.selectors.mainProfile).append(
						'<h3>No projects</h3>'
					);
				}else{
					if (projects.length % 5 == 0) {
						pages = projects.length / 5;
					}else{
						pages = ((projects.length / 5) | 0) + 1;
					}


					jQuery(options.selectors.pagingDemo).twbsPagination({
						totalPages: pages,
						visiblePages: 5,
						onPageClick: function (event, page) {
							jQuery(options.selectors.body).empty();
							var index = page * 5;

							for (var i = index - 5; i < index; i++) {
								if (projects.length <= i ) {
									break;
								}
								jQuery(options.selectors.body).append(tableRow(projects[i]));
							}
						}
					});
				}

			},
			error: function(){
				toastr.error('Sorry something happen, please to log out and log in again!');
			}
		});
	},

	tableRow = function(project){
		return '<tr>' +
			'<td class="project-title">'+ project.get('title') + '</td>' +
			'<td class="project-category">' + project.get('type') + '</td>' +
			'<td class="project-date">' + project.get('endDate') + '</td>' +
			'<td class="project-price">' + project.get('price') + '</td>' +
			'<td class="project-details">'+
			'<a href="/#/project-details?id=' + project.id + '">+</a>' +
			'</td>' +
		'</tr>'
	};

	return{
		initialize: initialize
	}
};


jQuery(document).ready(function(){
	ProjectsModule().initialize();
	//$(".navbarTemplate")
     //   .removeClass("templateNone")
     //   .addClass("templateOn");
    //$("#footerTemplate")
     //   .removeClass("templateNone")
     //   .addClass("templateOn");
	//$('.new-project').on('click',function(event){
     //   event.preventDefault();
     //   $(location).attr('href','/#/customer/new-project');
    //});
    //
	//var currentUser = Parse.User.current();
    //
	//var query = new Parse.Query("Projects");
    //
	//query.equalTo('owner', currentUser.get('username'));
	//query.find({
	//	success: function(projects){
	//		$('#customer-projects-badge').html(projects.length);
	//		if (projects.length === 0) {
	//			$('.mainProfile').append(
	//				'<h3>No projects</h3>'
	//			);
	//		};
	//		var pages;
	//		if (projects.length % 5 == 0) {
	//			pages = projects.length / 5;
	//		}else{
	//			pages = ((projects.length / 5) | 0) + 1;
	//		}
    //
	//		$('#pagination-demo').twbsPagination({
	//			totalPages: pages,
	//			visiblePages: 5,
	//			onPageClick: function (event, page) {
	//				$('#append-body').empty();
	//				var index = page * 5;
    //
	//				for (var i = index - 5; i < index; i++) {
	//					if (projects.length <= i ) {
	//						break;
	//					};
	//					$('#append-body').append(
	//						'<tr>' +
	//	                       '<td class="project-title">'+ projects[i].get('title') + '</td>' +
	//	                       '<td class="project-category">' + projects[i].get('type') + '</td>' +
	//	                       '<td class="project-date">' + projects[i].get('endDate') + '</td>' +
	//	                       '<td class="project-price">' + projects[i].get('price') + '</td>' +
	//	                       '<td class="project-details">'+
	//	                       '<a href="/#/project-details?id=' + projects[i].id + '">+</a>' +
	//	                       '</td>' +
	//	                    '</tr>'
	//					);
	//				}
	//			}
	//		});
	//
	//	},
	//	error: function(err){
	//		toastr.error('Sorry something happen, please to log out and log in again!');
	//	}
	//})
});