$(document).ready(function(){

	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");


	var query = new Parse.Query("Projects");

	query.exists('title');
	query.find({
		success: function(projects){
			if (projects.length === 0) {
				$('#mainProfile').append(
					'<h3>No projects</h3>'
				);
			};
			for (var i = 0; i < projects.length; i++) {
				console.log(projects[i].id);
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
		},
		error: function(err){
			console.log(err);
		}
	})
});