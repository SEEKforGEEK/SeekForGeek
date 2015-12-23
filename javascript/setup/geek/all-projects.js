$(document).ready(function(){
	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");

	$('.browse-job').on('click',function(){
		$(location).attr('href', '/#/search');
	});

	var currentUser = Parse.User.current();
	
	var query = new Parse.Query("Submissions");

	query.equalTo('submissionOwner', currentUser.get('username'));
	query.find({
		success: function(res){
			if (res.length == 0) {
				$('#append-body-projects').append(
					'<h1>No submissions</h1>'
				);
			};
			for (var i = 0; i < res.length; i++) {

				$('#append-body-projects').append(
					'<tr>' +
		               '<td>' + res[i].get('title') + '</td>' +
		               '<td>' + res[i].get('projectOwner') + '</td>' +
		               '<td>' + res[i].get('endDate') + '</td>' +
		               '<td>' + res[i].get('price') + '</td>' +
		               '<td><a href="' + res[i].get('files').url() + '">Download</a></td>' +
		            '</tr>'
				);
			}
		},
		error: function(err){
			console.log(err);
		}
	});
	

});