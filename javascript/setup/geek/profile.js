$(document).ready(function(){

    $(".navbarTemplate")
        .removeClass("navbarTemplateNone")
        .addClass("navbarTemplateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");

    var currentUser = Parse.User.current();
    $('#username').append(currentUser.get('username'));
    $('#emailToChange').append(currentUser.get('email'));
    $('#emailInput').val(currentUser.get('email'));


    $('#changePassword').click(function(){
        $('.change').fadeToggle(700);
    });

    $('#changeEmail').click(function(){
        $('#emailToChange').hide();
        $('#changeEmail').hide();
        $('#emailInput').show();
        $('#saveEmail').show();
    });

    $('#saveEmail').click(function(){
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

