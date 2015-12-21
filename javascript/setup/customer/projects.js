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
			for (var i = 0; i < projects.length; i++) {
				$('#append-body').append(
					'<tr>' +
                       '<td class="project-title">'+ projects[i].get('title') + '</td>' +
                       '<td class="project-category">' + projects[i].get('type') + '</td>' +
                       '<td class="project-date">' + projects[i].get('endDate') + '</td>' +
                       '<td class="project-price">111</td>' +
                       '<td class="project-details">+</td>' +
                    '</tr>'
				);
			}
		},
		error: function(err){
			console.log(err);
		}
	})
});