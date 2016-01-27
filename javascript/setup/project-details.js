'use strict';

var ProjectDetailsModule = function(settings){
	var options = {
		parse: {
		},
		currentUser: {
		},
		selectors: {
			btnBack: '#back-button',
			geekAddSubmit: '#geek-add-submit',
			geekAddWatchlist: '#add-watchlist',
			customerSubmisions: '#customer-submisions',
			customerSeeSubmissions: '#customer-see-submissions',
			projectName: '#project-name',
			projectDetails: '#project-details',
			projectCategory: '#project-category',
			projectPicture: '#project-picture',
			projectPrice: '#project-price',
			projectDate: '#project-date',
			customerName: '#customer-name',
			customerEmail: '#customer-email',
			customerPhone: '#customer-phone',
			btnDownload: '#download-button',
			btnUploadSubmision: '#upload-submission',
			btnClose: '.close',
			submissions: '#submissions',
			chooseWinner: '.choose-winner',
			showWinner: '#show-winner',
			submissionForm: '#submission-form'
		},
		variables: {
			project: {}
		}
	},

	customerType = function(){
		jQuery(options.selectors.geekAddSubmit).hide();
		jQuery(options.selectors.geekAddWatchlist).hide();
		jQuery(options.selectors.customerSubmisions).show();
		jQuery(options.selectors.customerSeeSubmissions).show();
	},

	geekType = function(){
		jQuery(options.selectors.geekAddSubmit).show();
		jQuery(options.selectors.geekAddWatchlist).show();
		jQuery(options.selectors.customerSubmisions).hide();
		jQuery(options.selectors.customerSeeSubmissions).hide();

		options.currentUser.watchlist = options.parse.currentUser.get('watchlist') || [];



	},

	urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null){
			return null;
		}
		else{
			return results[1] || 0;
		}
	},

	showProject = function(query, id){

		query.equalTo('objectId', id);
		query.first({
			success: function(res){
				options.variables.project.title = res.get('title');
				options.variables.project.details = res.get('task');
				options.variables.project.category = res.get('type');
				options.variables.project.picture = res.get('picture').url();
				options.variables.project.price = res.get('price');
				options.variables.project.date = res.get('endDate');
				options.variables.project.email = res.get('ownerEmail');
				options.variables.project.owner = res.get('owner');
				options.variables.project.phone = res.get('phone');
				options.variables.project.files = res.get('files').url();


				jQuery(options.selectors.projectName).html(options.variables.project.title);
				jQuery(options.selectors.projectDetails).append('<p id="detail-text">' + options.variables.project.details + '</p>');
				jQuery(options.selectors.projectCategory).html(options.variables.project.category);
				jQuery(options.selectors.projectPicture).attr('src', options.variables.project.picture);
				jQuery(options.selectors.projectPrice).html(options.variables.project.price);
				jQuery(options.selectors.projectDate).html(options.variables.project.date);
				jQuery(options.selectors.customerEmail).html(options.variables.project.email);
				jQuery(options.selectors.customerName).html(options.variables.project.owner);
				jQuery(options.selectors.customerPhone).html(options.variables.project.phone);
				jQuery(options.selectors.btnDownload).attr('href', options.variables.project.files);
			},
			error: function(){
				toastr.error('Sorry something happen, please try later!');

			}
		}).then(function(){
			if (options.currentUser.type == 'geek') {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDay();
				var projectDay = options.variables.project.date.substring(options.variables.project.date.indexOf("/")+1, options.variables.project.date.lastIndexOf("/"));
				var projectYear = options.variables.project.date.substr(options.variables.project.date.length - 4);
				var projectMonth = options.variables.project.date.substr(0, 2);

				options.parse.querySubmissions = new Parse.Query('Submissions');
				options.parse.querySubmissions.equalTo('title', options.variables.project.title);
				options.parse.querySubmissions.find({
					success: function(res){
						for(var i = 0; i < res.length; i++){
							if(res[i].get('grade') != 'in progress'){
								jQuery(options.selectors.geekAddSubmit).hide();
								break;
							}
						}
					}
				});

				if (projectYear < year) {
					jQuery(options.selectors.geekAddSubmit).hide();
				}
				else if(projectYear == year){
					if (projectMonth <  month) {
						jQuery(options.selectors.geekAddSubmit).hide();
					}else if (projectMonth == month) {
						if (projectDay < day) {
							jQuery(options.selectors.geekAddSubmit).hide();
						}
					}
				}
			}
		});
	},

	addToWatchlist = function(id){
		options.currentUser.watchlist.push(id);
		options.parse.currentUser.set('watchlist', options.currentUser.watchlist);
		options.parse.currentUser.save()
			.then(function(){
				jQuery(options.selectors.geekAddWatchlist).hide();
			});
	},

	uploadSubmision = function(){
		var fileUploadControl = jQuery("#submission")[0];
		if (fileUploadControl.files.length > 0) {
			var file = fileUploadControl.files[0];
			var name = 'submission.zip';


			var parseFile = new Parse.File(name, file);
			parseFile.save()
				.then(function() {
					var Submissions = new Parse.Object("Submissions");
					Submissions.set("title", options.variables.project.title);
					Submissions.set('endDate', options.variables.project.date);
					Submissions.set('price', parseInt(options.variables.project.price));
					Submissions.set('submissionOwner', options.currentUser.username);
					Submissions.set('projectOwner', options.variables.project.owner);
					Submissions.set('files', parseFile);
					Submissions.set('grade', 'in progress');
					Submissions.save();

					jQuery(options.selectors.btnClose).trigger('click');
					toastr.success('You successfully added submission!<a href="/#/geek/projects">Do you want to see all projects that you send submit</a>');
				}, function() {
					toastr.error('Sorry something happen, please try later!');
				});
		}
	},

	paintRow = function(res){
		return '<tr>' +
			'<td><input data-title="' + options.variables.project.title + '" class="check-submission" type="radio" id="' + res.id +'" name="submissions" value="' + res.id + '"></td>' +
			'<td><label for="' + res.id + '">' + res.get('title') + '</label></td>' +
			'<td>' + res.get('submissionOwner') + '</td>' +
			'<td><a href="' + res.get('files').url() + '">Download</a></td>' +
		'</tr>';
	},

	winnerTable = function(paymentInfo){
		return '<h3 id="winner-heading">We have a winner!</h3>' +
			'<table class="table table-striped table-hover ">' +
				'<thead><tr><th>Card Holder</th>' +
					'<th>IBAN</th></tr>' +
				'</thead>' +
				'<tbody>' +
					'<tr>' +
						'<td>' + paymentInfo.cardHolder + '</td>' +
						'<td>' + paymentInfo.IBAN + '</td>' +
					'</tr>' +
				'</tbody>' +
			'</table> '	;
	},

	showSubmissions = function(query){
		var isHasSubmissions = false;
		query.equalTo('projectOwner', options.currentUser.username);
		query.find({
			success: function(res){

				for (var i = 0; i < res.length; i++) {
					if (res[i].get('title') == options.variables.project.title && res[i].get('grade') == 'in progress') {
						isHasSubmissions = true;
						jQuery(options.selectors.submissions).append(paintRow(res[i]));
					}
					else if(res[i].get('title') == options.variables.project.title && res[i].get('grade') == 'winner') {
						jQuery(options.selectors.geekAddSubmit).hide();
						jQuery(options.selectors.chooseWinner).hide();
						jQuery(options.selectors.customerSeeSubmissions).hide();

						var paymentInfo = res[i].get('payment') || {};

						paymentInfo.cardHolder = paymentInfo.cardHolder || 'Waiting...';
						paymentInfo.IBAN = paymentInfo.IBAN || 'Waiting...';
						jQuery(options.selectors.showWinner).html(winnerTable(paymentInfo));
					}
				}
				if (!isHasSubmissions){
					jQuery(options.selectors.chooseWinner).hide();
					jQuery(options.selectors.customerSeeSubmissions).hide();
				}
			}
		});
	},

	chooseWinner = function(){

		var projectId = jQuery('input[name=submissions]:checked', options.selectors.submissionForm).val();
		var projectTitle = jQuery('input').attr('data-title');

		options.parse.querySubmissions.equalTo('objectId', projectId);
		options.parse.querySubmissions.first({
			success: function(res){
				res.set('grade', 'winner');
				res.save();

				jQuery(options.selectors.submissions).empty();
				showSubmissions(options.parse.querySubmissions);

				options.parse.querySubmissions.equalTo('title', projectTitle);
				options.parse.querySubmissions.find({
					success: function(res){
						for (var i = 0; i < res.length; i++) {
							if (res[i].get('grade') == 'in progress') {
								res[i].set('grade', 'not winner');
								res[i].save();
							}
						}
					}
				})
			}
		});
	},

	initialize = function() {
		jQuery(".navbarTemplate")
			.removeClass("templateNone")
			.addClass("templateOn");
		jQuery("#footerTemplate")
			.removeClass("templateNone")
			.addClass("templateOn");

		options.parse.currentUser = Parse.User.current();
		options.parse.queryProjects = new Parse.Query("Projects");
		options.parse.querySubmissions = new Parse.Query('Submissions');

		options.currentUser.type = options.parse.currentUser.get('type');
		options.currentUser.username = options.parse.currentUser.get('username');

		jQuery(options.selectors.btnBack).on('click', function(){
			jQuery(location).attr('href', '/#/' + options.currentUser.type + '/projects');
		});

		var id = urlParam('id');
		showProject(options.parse.queryProjects, id);

		if (options.currentUser.type == 'customer') {
			customerType();
		}
		if (options.currentUser.type == 'geek') {
			geekType();
		}



		for(var i in options.currentUser.watchlist){
			if(options.currentUser.watchlist[i] == id){
				jQuery(options.selectors.geekAddWatchlist).hide();
			}
		}


		showSubmissions(options.parse.querySubmissions);

		jQuery(options.selectors.geekAddWatchlist).on('click', function(){
			addToWatchlist(id);
		});

		jQuery(options.selectors.btnUploadSubmision).on('click', uploadSubmision);



		jQuery(options.selectors.chooseWinner).on('click',function(event){
			event.preventDefault();
			chooseWinner();
		});
	};

	return {
		initialize: initialize
	}
};


jQuery(document).ready(function(){
	ProjectDetailsModule().initialize();
});