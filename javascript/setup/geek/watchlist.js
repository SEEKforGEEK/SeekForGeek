'use strict';

var WatchlistModule = function(settings){
	var options = {
		parse: {
		},
		currentUser: {
		},
		selectors: {
			btnBrowseJob: '.browse-job',
			searchLink: '/#/search?index=all',
			watchlistBadge: '#watchlist-badge',
			projectsBadge: '#projects-badge',
			submissionsBody: '#append-body'
		},
		variables: {
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
		options.parse.submissionsQuery = new Parse.Query('Submissions');
		counterBadge(options.parse.submissionsQuery);
		showSubmissions();

		jQuery(document).on('click', '.remove-buttons', function(){
			removeFromWatchlist(this);
		});
	},

	removeFromWatchlist = function(element){

		var id = jQuery(element).data('id');

		var newArray = [],
			j = 0;
		for (var i = 0; i < options.currentUser.watchlist.length; i++) {
			if (options.currentUser.watchlist[i] != id){
				newArray[j++] = options.currentUser.watchlist[i];
			}
		}
		options.parse.currentUser.set('watchlist', newArray);
		options.parse.currentUser.save();
		jQuery(element).parent().parent().remove();
	},

	showSubmissions = function(){
		if (options.currentUser.watchlist.length == 0) {
			jQuery(options.selectors.submissionsBody).append(
				'<h1>No projects in watchlist</h1>'
			);
		}
		else{
			var pages;
			if (options.currentUser.watchlist.length % 5 == 0) {
				pages = options.currentUser.watchlist.length / 5;
			}else{
				pages = ((options.currentUser.watchlist.length / 5) | 0) + 1;
			}
			jQuery('#pagination-demo').twbsPagination({
				totalPages: pages,
				visiblePages: 5,
				onPageClick: function (event, page) {
					jQuery(options.selectors.submissionsBody).empty();
					var index = page * 5;

					for (var i = index - 5; i < index; i++) {
						if (options.currentUser.watchlist.length <= i ) {
							break;
						}
						var query = new Parse.Query("Projects");

						query.equalTo('objectId', options.currentUser.watchlist[i]);
						query.first({
							success: function(res){
								jQuery(options.selectors.submissionsBody).append(drawRow(res));
							},
							error: function(){
								toastr.error('Sorry something happen, please to log out and log in again!');
							}
						});
					}
				}
			});
		}
	},

	drawRow = function(res){
		return '<tr>' +
				'<td class="project-title"><a href="/#/project-details?id=' +
				res.id + '">' + res.get('title') + '</a></td>' +
				'<td class="project-category">' + res.get('type') + '</td>' +
				'<td class="project-date">' + res.get('endDate') + '</td>' +
				'<td class="project-price">' + res.get('price') + '</td>' +
				'<td><button data-id="'+ res.id + '" class="button remove-buttons">Remove</button></td>' +
			'</tr>';
	},

	counterBadge = function(query){
		query.equalTo('submissionOwner', options.currentUser.username);
		query.count({
			success: function(count){
				jQuery(options.selectors.projectsBadge).html(count);
			},
			error: function(err){
			}
		});
	};

	return{
		initialize: initialize
	}
};


jQuery(document).ready(function(){
	WatchlistModule().initialize();
});