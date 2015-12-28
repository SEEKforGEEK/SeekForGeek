$(document).ready(function(){

	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");


	var currentUser = Parse.User.current();

	var query = new Parse.Query("Projects");

	query.equalTo('owner', currentUser.get('username'));
	query.find({
		success: function(projects){
			if (projects.length === 0) {
				$('.mainProfile').append(
					'<h3>No projects</h3>'
				);
			};
			var pages;
			if (projects.length % 5 == 0) {
				pages = projects.length / 5;
			}else{
				pages = ((projects.length / 5) | 0) + 1;
			}

			$('#pagination-demo').twbsPagination({
				totalPages: pages,
				visiblePages: 5,
				onPageClick: function (event, page) {
					$('#append-body').empty();
					var index = page * 5;

					for (var i = index - 5; i < index; i++) {
						if (projects.length <= i ) {
							break;
						};
						$('#append-body').append(
							'<tr>' +
		                       '<td class="project-title">'+ projects[i].get('title') + '</td>' +
		                       '<td class="project-category">' + projects[i].get('type') + '</td>' +
		                       '<td class="project-date">' + projects[i].get('endDate') + '</td>' +
		                       '<td class="project-price">' + projects[i].get('price') + '</td>' +
		                       '<td class="project-details">'+
		                       '<a href="/#/project-details?id=' + projects[i].id + '">+</a>' +
		                       '</td>' +
		                    '</tr>'
						);
					}
				}
			});
			
		},
		error: function(err){
			console.log(err);
		}
	})
});