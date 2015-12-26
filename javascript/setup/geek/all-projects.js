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
	
	var query = new Parse.Query("Submissions");

	query.equalTo('submissionOwner', currentUser.get('username'));
	query.find({
		success: function(res){
			if (res.length == 0) {
				$('#append-body-projects').append(
					'<h1>No submissions</h1>'
				);
			};
			var grade;
			for (var i = 0; i < res.length; i++) {
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
		               '<td><button data-title="' + res[i].get('title') + '" data-id="' + res[i].id + '" data-toggle="modal" data-target="#' + grade + '" class="button check-project-winner">+</button></td>' +	
		            '</tr>'
				);
			}
		},
		error: function(err){
			console.log(err);
		}
	});
	
	var title;
	var id;
	$('#append-body-projects').on('click', '.check-project-winner', function(event){
		event.preventDefault();
		title = $('.check-project-winner').attr('data-title');
		id = $('.check-project-winner').attr('data-id');

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
					paymentData.cardNumber = $('#card-number').val();
					paymentData.securityCode = $('#security-code').val();
					paymentData.expiryDate = $('#expiry-date').val();

					res.set('payment', paymentData);
					res.save()
						.then(function(){
							$('.close').trigger('click');
						})
				})
			};
		}
	})
}