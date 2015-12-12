$(document).ready(function(){
    $('#login-button').click(loginForm);
});


function loginForm(){
    var loginData = {
        username: $('#login-username').val(),
        password: $('#login-pass').val()
    };

    if(validateLoginForm(loginData)){
        var Geek = Parse.Object.extend('Geek');
        var Customer = Parse.Object.extend('Customer');
        var queryGeek = new Parse.Query('Geek');


    }



}



function validateLoginForm(loginData){
    var usernameForm = $('#lg-username-form');
    var passwordForm = $('#lg-password-form');

    if(loginData.username.length < 6){
        if(usernameForm.hasClass('has-success')){
            usernameForm.removeClass('has-success');
        }
        usernameForm.addClass('has-error');
        return false
    }else{
        if(usernameForm.hasClass('has-error')){
            usernameForm.removeClass('has-error');
        }
        usernameForm.addClass('has-success');
    }
    if(loginData.password.length < 6){
        if(passwordForm.hasClass('has-success')){
            passwordForm.removeClass('has-success');
        }
        passwordForm.addClass('has-error');
        return false;
    }else{
        if(passwordForm.hasClass('has-error')){
            passwordForm.removeClass('has-error');
        }
        passwordForm.addClass('has-success');
    }
    return true;
}
