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
    var currentEmail = currentUser.get('email');

    $('#geek-username').append(currentUser.get('username'));
    $('#geek-emailToChange').append(currentEmail);
    $('#geek-emailInput').val(currentEmail);
    $('#hello-geek').html('Hello, ' + currentUser.get('username') + '!');

    $('#geek-changePassword').on('click', function(){
        Parse.User.requestPasswordReset(currentEmail, {
            success: function() {
                $('#geek-alert-password').html('Successfully send email');
            },
            error: function(error) {
                $('#geek-alert-password').html("Error: " + error.code + " " + error.message);
            }
        });
    });

    $('#geek-changeEmail').on('click', function(){
        $('#geek-emailToChange').hide();
        $('#geek-changeEmail').hide();
        $('#geek-emailInput').show();
        $('#geek-saveEmail').show();
    });

    $('#geek-saveEmail').on('click', function(){
        var email = $('#geek-emailInput').val();

        currentUser.set('email', email);
        currentUser.save(null, {
            success: function(user){
                currentUser.fetch({
                    success: function(currentUser){
                         $('#geek-emailToChange').show()
                            .empty()
                            .append(currentUser.get('email'));
                        $('#geek-changeEmail').show();
                        $('#geek-emailInput').hide();
                        $('#geek-saveEmail').hide();
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

