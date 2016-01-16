$(document).ready(function(){
	$(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");

	$('.browse-job').on('click',function(){
		$(location).attr('href', '/#/search?index=all');
	});

	var currentUser = Parse.User.current();
	var watchlistArray = currentUser.get('watchlist') || [];
	var currentName = currentUser.get('username');
    $('#watchlist-badge').html(watchlistArray.length);
   
    
	
	var query = new Parse.Query("Submissions");

	query.equalTo('submissionOwner', currentName);
	query.find({
		success: function(res){
            $('#projects-badge').html(res.length);

			if (res.length == 0) {
				$('#append-body-projects').append(
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

				$('#pagination-demo').twbsPagination({
					totalPages: pages,
					visiblePages: 5,
					onPageClick: function (event, page) {
						$('#append-body-projects').empty();
						var index = page * 5;
						var grade;
						for (var i = index - 5; i < index; i++) {
							if (res.length <= i ) {
								break;
							};
							if (res[i].get('grade') == 'in progress') {
								grade = 'progress';
							}else if(res[i].get('grade') == 'winner'){
								grade = 'winner';
							}else{
								grade = 'notWinner';
							}
							$('#append-body-projects').append(
								'<tr>' +
					               '<td>' + res[i].get('title') + '</td>' +
					               '<td>' + res[i].get('projectOwner') + '</td>' +
					               '<td>' + res[i].get('endDate') + '</td>' +
					               '<td>' + res[i].get('price') + '</td>' +
					               '<td><a href="' + res[i].get('files').url() + '">Download</a></td>' +
					               '<td><button data-id="' + res[i].id + '" data-toggle="modal" data-target="#' + grade + '" class="button check-project-winner">+</button></td>' +	
					            '</tr>'
							);
						}
					}
				});
			}
			
		},
		error: function(err){
			toastr.error('Sorry something happen, please to log out and log in again!');
		}
	});
	

	$('#append-body-projects').on('click', '.check-project-winner', function(event){
		event.preventDefault();
		var id = $(this).attr('data-id');

		winner(id);
	});
	



});


function winner(id){
	var query = new Parse.Query("Submissions");
	query.equalTo('objectId', id);
	query.first({
		success: function(res){
			if (res.get('grade') == 'winner') {
				$('#payment-info-btn').on('click',function(event){

					event.preventDefault();
					var paymentData = {};
					paymentData.cardHolder = $('#card-holder').val();
					paymentData.IBAN = $('#IBAN').val();
					if(validateWinnerForm(paymentData)){
						res.set('payment', paymentData);
						res.save()
							.then(function(){
								console.log('sadad');

								$('.close').trigger('click');
							})	
					}
					
				})
			}
		}
	})
}

function validateWinnerForm(data){
	var cardHolder = $('#payment-cardholer-form');
	var IBAN = $('#payment-IBAN-form');

	if(data.cardHolder.split(' ').length == 2) {
		if (cardHolder.hasClass('has-error')) {
            cardHolder.removeClass('has-error');
        }
        cardHolder.addClass('has-success');
	}else{
		if (cardHolder.hasClass('has-success')) {
            cardHolder.removeClass('has-success');
        }
        cardHolder.addClass('has-error');
        return false;
	}

	if (data.IBAN.length == 16) {
		if (IBAN.hasClass('has-error')) {
            IBAN.removeClass('has-error');
        }
        IBAN.addClass('has-success');
	}else{
		if (IBAN.hasClass('has-success')) {
            IBAN.removeClass('has-success');
        }
        IBAN.addClass('has-error');
        return false;
	}
	return true;
}