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
    })
    if (type == 'customer') {
    	$('#geek-add-submit').hide();
    	$('#geek-watchlist').hide();
    	$('#customer-submisions').show();
    	$('#customer-see-submissions').show();	

    };
    if (type == 'geek') {
    	$('#geek-add-submit').show();
    	$('#geek-watchlist').show();
    	$('#customer-submisions').hide();
    	$('#customer-see-submissions').hide();

    	var watchlistArray = currentUser.get('watchlist') || [];
    };
    $.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	}
		
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



			$('#project-name').html(project.title);
			$('#project-details').append('<p>' + project.details + '</p>');
			$('#project-category').html(project.category);
			$('#project-picture').attr('src', project.picture);
			$('#project-price').html(project.price);
			$('#project-date').html(project.date);
			$('#customer-email').html(project.email);
			$('#customer-name').html(project.owner);
			$('#customer-phone').html(project.phone);

		}
	})


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
					Submissions.set('price', project.price);
					Submissions.set('submissionOwner', user);
					Submissions.set('projectOwner', project.owner);
					Submissions.set('files', parseFile);
					Submissions.set('grade', 'in progress');
					Submissions.save();

					$('.close').trigger('click');
					$('#successful-submit').html(
						'You successfully added submission!' +
						'<a href="/#/geek/projects">Do you want to see all projects that you send submit</a>'
					);


			}, function(error) {
				console.log('error picture ' + error );
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
							'<td><input data-title="' + project.title + '" class="check-submission" type="radio" name="submissions" value="' + res[i].id + '"></td>' +
			              	'<td>' + res[i].get('title') + '</td>' +
			               	'<td>' + res[i].get('submissionOwner') + '</td>' +
			               	'<td>' + res[i].get('endDate') + '</td>' +
			               	'<td>' + res[i].get('price') + '</td>' +
			               	'<td><a href="' + res[i].get('files').url() + '">Download</a></td>' +
			            '</tr>'
					);
				}
				else if(res[i].get('title') == project.title && res[i].get('grade') == 'winner') {
					$('.choose-winner').hide();
					var paymentInfo = res[i].get('payment');
					$('#show-winner').html(
						'<h1>We have a winner</h1>' + 
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
					$('#submissions').append(
						'<tr>' +
			              	'<td>' + res[i].get('title') + '</td>' +
			               	'<td>' + res[i].get('submissionOwner') + '</td>' +
			               	'<td>' + res[i].get('endDate') + '</td>' +
			               	'<td>' + res[i].get('price') + '</td>' +
			               	'<td><a href="' + res[i].get('files').url() + '">Download</a></td>' +
			            '</tr>'
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