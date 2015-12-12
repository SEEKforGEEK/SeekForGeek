$(document).ready(function(){
    $('#loginButton').click(loginForm);
});


function loginForm(){
    var loginData = {
        username: $('#login-username').val(),
        password: $('#login-pass').val()
    };
    if(validateLoginForm(loginData)){
        Parse.User.logIn(loginData.username, loginData.password, {
            success: function(user){
                alert(user + " is log in ");
            },
            error: function(user, error){
                alert(user + " error : " + error);
                console.log(error);
            }
        })
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
