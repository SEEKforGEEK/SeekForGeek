$(document).ready(function(){

    $('#changePassword').click(function(){
        $('.change').fadeToggle(700);
    });

    $('#changeEmail').click(function(){
        $('#emailToChange').hide();
        $('#changeEmail').hide();
        $('#emailInput').show();
        $('#saveEmail').show();
    })
});