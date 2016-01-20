'use strict';

var AllProjectModule = function(settings){
	var options = {
		parse: {
		},
		currentUser: {
		},
		selectors: {
			searchLink: '/#/search?index=all',
			watchlistBadge: '#watchlist-badge',
			projectsBadge: '#projects-badge',
			bodyProjects: '#append-body-projects',
			pagination: '#pagination-demo',
			checkWinner: '.check-project-winner',
			cardHolder: '#card-holder',
			IBAN: '#IBAN',
			cardHolderForm: '#payment-cardholer-form',
			IBANForm: '#payment-IBAN-form',
			btnBrowseJob: '.browse-job',
			btnPaymentInfo: '#payment-info-btn',
			btnClose: '.close'
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

		jQuery(options.selectors.btnBrowseJob).on('click', function(){
			jQuery(location).attr('href', options.selectors.searchLink);
		});

		options.parse.currentUser = Parse.User.current();
		options.currentUser.watchlist = options.parse.currentUser.get('watchlist') || [];
		options.currentUser.username = options.parse.currentUser.get('username');

		jQuery(options.selectors.watchlistBadge).html(options.currentUser.watchlist.length);

		options.parse.submissionsQuery = new Parse.Query("Submissions");

		options.parse.submissionsQuery.equalTo('submissionOwner', options.currentUser.username);
		options.parse.submissionsQuery.find({
			success: function(res){
				jQuery(options.selectors.projectsBadge).html(res.length);

				if (res.length == 0) {
					jQuery(options.selectors.bodyProjects).append(
						'<h1>No submissions</h1>'
					);
				}
				else{
					var pages;
					if (res.length % 5 == 0) {
						pages = res.length / 5;
					}else{
						pages = ((res.length / 5) | 0) + 1;
					}

					jQuery(options.selectors.pagination).twbsPagination({
						totalPages: pages,
						visiblePages: 5,
						onPageClick: function (event, page) {
							jQuery(options.selectors.bodyProjects).empty();
							var index = page * 5;
							var grade;
							for (var i = index - 5; i < index; i++) {
								if (res.length <= i ) {
									break;
								}
								if (res[i].get('grade') == 'in progress') {
									grade = 'progress';
								}else if(res[i].get('grade') == 'winner'){
									grade = 'winner';
								}else{
									grade = 'notWinner';
								}
								$(options.selectors.bodyProjects).append(tableRow(res[i], grade));
							}
						}
					});
				}
			},
			error: function(){
				toastr.error('Sorry something happen, please to log out and log in again!');
			}
		});

		jQuery(options.selectors.bodyProjects).on('click', options.selectors.checkWinner, function(event){
			event.preventDefault();
			var id = jQuery(this).attr('data-id');

			winner(id);
		});
	},

	tableRow = function(project, grade){
		return '<tr>' +
			'<td>' + project.get('title') + '</td>' +
			'<td>' + project.get('projectOwner') + '</td>' +
			'<td>' + project.get('endDate') + '</td>' +
			'<td>' + project.get('price') + '</td>' +
			'<td><a href="' + project.get('files').url() + '">Download</a></td>' +
			'<td><button data-id="' + project.id + '" data-toggle="modal" data-target="#' + grade + '" class="check-project-winner">+</button></td>' +
		'</tr>'
	},

	winner = function(id){
		options.parse.submissionsQuery.equalTo('objectId', id);
		options.parse.submissionsQuery.first({
			success: function(res){
				if (res.get('grade') == 'winner') {
					jQuery(options.selectors.btnPaymentInfo).on('click',function(event){
						event.preventDefault();

						var paymentData = {};
						paymentData.cardHolder = jQuery(options.selectors.cardHolder).val();
						paymentData.IBAN = jQuery(options.selectors.IBAN).val();

						if(validateWinnerForm(paymentData)){
							res.set('payment', paymentData);
							res.save()
								.then(function(){
									jQuery().trigger('click');
								});
						}

					})
				}
			}
		})
	},

	validateWinnerForm = function(data){
		var cardHolderForm = jQuery(options.selectors.cardHolderForm);
		var IBANForm = jQuery(options.selectors.IBANForm);

		if(data.cardHolder.split(' ').length == 2) {
			if (cardHolderForm.hasClass('has-error')) {
				cardHolderForm.removeClass('has-error');
			}
			cardHolderForm.addClass('has-success');
		}else{
			if (cardHolderForm.hasClass('has-success')) {
				cardHolderForm.removeClass('has-success');
			}
			cardHolderForm.addClass('has-error');
			return false;
		}

		if (data.IBAN.length == 16) {
			if (IBANForm.hasClass('has-error')) {
				IBANForm.removeClass('has-error');
			}
			IBANForm.addClass('has-success');
		}else{
			if (IBANForm.hasClass('has-success')) {
				IBANForm.removeClass('has-success');
			}
			IBANForm.addClass('has-error');
			return false;
		}
		return true;
	};
	return{
		initialize: initialize
	};
};


jQuery(document).ready(function() {
	AllProjectModule().initialize();
});