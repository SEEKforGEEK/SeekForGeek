(function(){
    var currentUser = Parse.User.current();

    $('#username').append(currentUser.get('username'));
    $('#emailToChange').append(currentUser.get('email'));
    $('#emailInput').val(currentUser.get('email'));
}());

$(document).ready(function(){



    $('#changePassword').click(function(){
        $('.change').fadeToggle(700);
    });

    $('#changeEmail').click(function(){
        $('#emailToChange').hide();
        $('#changeEmail').hide();
        $('#emailInput').show();
        $('#saveEmail').show();
    });




});