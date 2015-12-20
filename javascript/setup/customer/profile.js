$(document).ready(function(){
    $(".navbarTemplate")
        .removeClass("navbarTemplateNone")
        .addClass("navbarTemplateOn");


	var currentUser = Parse.User.current();
    $('#customer-username').append(currentUser.get('username'));
    $('#customer-emailToChange').append(currentUser.get('email'));
    $('#customer-emailInput').val(currentUser.get('email'));


    $('#customer-changePassword').click(function(){
        $('.change').fadeToggle(700);
    });

    $('#customer-changeEmail').click(function(){
        $('#customer-emailToChange').hide();
        $('#customer-changeEmail').hide();
        $('#customer-emailInput').show();
        $('#customer-saveEmail').show();
    });

    $('#customer-saveEmail').click(function(){
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