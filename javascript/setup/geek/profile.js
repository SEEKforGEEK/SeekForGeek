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
    var currentEmail = currentUser.get('email');

    $('#username').append(currentUser.get('username'));
    $('#emailToChange').append(currentEmail);
    $('#emailInput').val(currentEmail);
    $('#hello-geek').html('Hello, ' + currentUser.get('username') + '!');

    $('#changePassword').on('click', function(){
        Parse.User.requestPasswordReset(currentEmail, {
            success: function() {
                $('#alert-password').html('Successfully send email');
            },
            error: function(error) {
                $('#alert-password').html("Error: " + error.code + " " + error.message);
            }
        });
    });

    $('#changeEmail').on('click', function(){
        $('#emailToChange').hide();
        $('#changeEmail').hide();
        $('#emailInput').show();
        $('#saveEmail').show();
    });

    $('#saveEmail').on('click', function(){
        var email = $('#emailInput').val();

        currentUser.set('email', email);
        currentUser.save(null, {
            success: function(user){
                currentUser.fetch({
                    success: function(currentUser){
                         $('#emailToChange').show()
                            .empty()
                            .append(currentUser.get('email'));
                        $('#changeEmail').show();
                        $('#emailInput').hide();
                        $('#saveEmail').hide();
                    },
                    error: function(currentUser, error){
                        console.log("error");
                    }
                });
               
            },
            error: function(user, error){
                alert('Failed to update ' + user + " with error: " + error);
            }

        });
    });

    
});

