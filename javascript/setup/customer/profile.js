$(document).ready(function(){
    $(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");

    $('.new-project').on('click',function(event){
        event.preventDefault();
        $(location).attr('href','/#/customer/new-project');
    })

	var currentUser = Parse.User.current();
    var customerEmail = currentUser.get('email');
    var customerName = currentUser.get('username');
    var query = new Parse.Query('Projects');
    query.equalTo('owner', customerName);
    query.count({
        success: function(count){
            $('#customer-projects-badge').html(count);
        },
        error: function(err){
        }
    });


    $('#customer-username').append(customerName);
    $('#customer-emailToChange').append(customerEmail);
    $('#customer-emailInput').val(customerEmail);
    $('#hello-customer').html('Hello, ' + customerName + '!');

    $('#customer-changePassword').on('click', function(){
        Parse.User.requestPasswordReset(customerEmail, {
            success: function() {
                $('#customer-alert-password').html('Successfully send email');
            },
            error: function(error) {
                $('#customer-alert-password').html("Sorry, try again later!");
            }
        });
    });

   

    $('#customer-changeEmail').on('click', function(){
        $('#customer-emailToChange').hide();
        $('#customer-changeEmail').hide();
        $('#customer-emailInput').show();
        $('#customer-saveEmail').show();
    });

    $('#customer-saveEmail').on('click', function(){
        var email = $('#customer-emailInput').val();

        currentUser.set('email', email);
        currentUser.save(null, {
            success: function(user){
                currentUser.fetch({
                    success: function(currentUser){
                         $('#customer-emailToChange').show()
                            .empty()
                            .append(currentUser.get('email'));
                        $('#customer-changeEmail').show();
                        $('#customer-emailInput').hide();
                        $('#customer-saveEmail').hide();
                    },
                    error: function(currentUser, error){
                        toastr.error('Sorry something happen, please try later!');
                    }
                });
               
            },
            error: function(user, error){
                toastr.error('Failed to update ' + user + " with error: " + error);
            }

        });
    });
});