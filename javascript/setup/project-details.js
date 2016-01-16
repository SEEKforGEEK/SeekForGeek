$(document).ready(function(){
	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    
    var currentUser = Parse.User.current();

    var type = currentUser.get('type');

 	$('#back-button').on('click', function(){
        $(location).attr('href', '/#/' + type + '/projects');
    });
    if (type == 'customer') {
    	$('#geek-add-submit').hide();
    	$('#add-watchlist').hide();
    	$('#customer-submisions').show();
    	$('#customer-see-submissions').show();	

    }
    if (type == 'geek') {
    	$('#geek-add-submit').show();
    	$('#add-watchlist').show();
    	$('#customer-submisions').hide();
    	$('#customer-see-submissions').hide();

    	var watchlistArray = currentUser.get('watchlist') || [];
    }
    $.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	};
		
	var id = $.urlParam('id');

	for(var i in watchlistArray){
		if(watchlistArray[i] == id){
			$('#add-watchlist').hide();
		}
	}


	var project = {};

	var query = new Parse.Query("Projects");

	query.equalTo('objectId', id);
	query.first({
		success: function(res){
			project.title = res.get('title');
			project.details = res.get('task');
			project.category = res.get('type');
			project.picture = res.get('picture').url();
			project.price = res.get('price');
			project.date = res.get('endDate');
			project.email = res.get('ownerEmail');
			project.owner = res.get('owner');
			project.phone = res.get('phone');
			project.files = res.get('files').url();


			$('#project-name').html(project.title);
			$('#project-details').append('<p id="detail-text">' + project.details + '</p>');
			$('#project-category').html(project.category);
			$('#project-picture').attr('src', project.picture);
			$('#project-price').html(project.price);
			$('#project-date').html(project.date);
			$('#customer-email').html(project.email);
			$('#customer-name').html(project.owner);
			$('#customer-phone').html(project.phone);
			$('#download-button').attr('href', project.files);

		},
		error: function(err){
            toastr.error('Sorry something happen, please try later!');

		}
	}).then(function(){
		if (type == 'geek') {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDay();
			var projectDay = project.date.substring(project.date.indexOf("/")+1, project.date.lastIndexOf("/"));
			var projectYear = project.date.substr(project.date.length - 4);
			var projectMonth = project.date.substr(0, 2);
			
			if (projectYear < year) {
				$('#geek-add-submit').hide();
			}
			else if(projectYear == year){
				if (projectMonth <  month) {
					$('#geek-add-submit').hide();	
				}else if (projectMonth == month) {
					if (projectDay < day) {
						$('#geek-add-submit').hide();
					};
				};
			}
		}
	});


	$('#add-watchlist').on('click', function(){
		watchlistArray.push(id);
		currentUser.set('watchlist', watchlistArray);
		currentUser.save()
			.then(function(){
				$('#add-watchlist').hide();
			})
	});

	var user = currentUser.get('username');
	$('#upload-submission').on('click', function(){
		var fileUploadControl = $("#submission")[0];
		if (fileUploadControl.files.length > 0) {
		  	var file = fileUploadControl.files[0];
		 	var name = 'submission.zip';
		 	

		 	var parseFile = new Parse.File(name, file);
		 	parseFile.save()
		 		.then(function() {
					var Submissions = new Parse.Object("Submissions");
					Submissions.set("title", project.title);
					Submissions.set('endDate', project.date);
					Submissions.set('price', parseInt(project.price));
					Submissions.set('submissionOwner', user);
					Submissions.set('projectOwner', project.owner);
					Submissions.set('files', parseFile);
					Submissions.set('grade', 'in progress');
					Submissions.save();

					$('.close').trigger('click');
					toastr.success('You successfully added submission!<a href="/#/geek/projects">Do you want to see all projects that you send submit</a>');


			}, function(error) {
                toastr.error('Sorry something happen, please try later!');
			});
		}	
	});

	var submissions = new Parse.Query('Submissions');

	submissions.equalTo('projectOwner',user);
	submissions.find({
		success: function(res){
			for (var i = 0; i < res.length; i++) {
				if (res[i].get('title') == project.title && res[i].get('grade') == 'in progress') {

					$('#submissions').append(

							'<tr>' +

								'<td><input data-title="' + project.title + '" class="check-submission" type="radio" id="' + res[i].id +'" name="submissions" value="' + res[i].id + '"></td>' +
								'<td><label for="' + res[i].id + '">' + res[i].get('title') + '</label></td>' +
                                '<td>' + res[i].get('submissionOwner') + '</td>' +
								'<td><a href="' + res[i].get('files').url() + '">Download</a></td>' +

							'</tr>'
					);
				}
				else if(res[i].get('title') == project.title && res[i].get('grade') == 'winner') {
					$('.choose-winner').hide();
					$('#customer-see-submissions').hide();
					var paymentInfo = res[i].get('payment') || {};
                    paymentInfo.cardHolder = paymentInfo.cardHolder || 'Waiting...';
                    paymentInfo.IBAN = paymentInfo.IBAN || 'Waiting...';
					$('#show-winner').html(
						'<h3 id="winner-heading">We have a winner!</h3>' + 
						'<table class="table table-striped table-hover ">' +
							'<thead><tr><th>Card Holder</th>' +
								'<th>IBAN</th>' +
								'</thead>' +
		                    '<tbody>' +
		                        '<tr>' +
					              	'<td>' + paymentInfo.cardHolder + '</td>' +
					               	'<td>' + paymentInfo.IBAN + '</td>' +
					            '</tr>' +
		                    '</tbody>' + 
		                '</table> '
					);
				};
			};
		}
	});

	$('.choose-winner').on('click',function(event){
		event.preventDefault();
		var projectId = $('input[name=submissions]:checked', '#submission-form').val(); 
		var projectTitle = $('input').attr('data-title');
	

		var query = new Parse.Query("Submissions");
		query.equalTo('objectId', projectId);
		query.first({
			success: function(res){
				res.set('grade', 'winner');
				res.save();
		        //TODO when factor js in this file and put all code in functions
                //yield here a function that load winner data
				var queryNotWinner = new Parse.Query('Submissions');
				queryNotWinner.equalTo('title', projectTitle);
				queryNotWinner.find({
					success: function(res){
						for (var i = 0; i < res.length; i++) {
							if (res[i].get('grade') == 'in progress') {
								res[i].set('grade', 'not winner');
								res[i].save();
							};
						};
					}
				})
			}
		});
	})
});