$(document).ready(function () {
    $('#loginButton').click(loginForm);
    $('#modal-login').on('shown.bs.modal', function () {
        $('#login-username').focus();
    });
    $('#modal-forgot-pass').on('shown.bs.modal', function () {
        $('#forgot-pass-email').focus();
    });

    var queryProjects = new Parse.Query("Projects");
    var queryUsers = new Parse.Query("_User");
    queryUsers.equalTo('type', 'geek');
    queryUsers.find({
        success: function(res){
            $('#geeksCounter').append(res.length + " registered geeks");
        }
    });
    queryUsers.equalTo('type', 'customer');
    queryUsers.find({
        success: function(res){
            $('#customersCounter').append(res.length + "  satisfied customers");
        }
    })
    queryProjects.exists('title');
    queryProjects.find({
        success: function(res){
            $('#projectsCounter').append(res.length + " active projects");
        }
    });
});


function loginForm() {
    var loginData = {
        username: $('#login-username').val(),
        password: $('#login-pass').val()
    };
    if (validateLoginForm(loginData)) {
        Parse.User.logIn(loginData.username, loginData.password, {
            success: function (user) {
                if (user.get('type') == 'customer') {
                    $(location).attr('href','/#/customer/profile');
                }else{
                    $(location).attr('href','/#/geek/profile');
                }   
                location.reload();          
            },
            error: function (user, error) {
                alert(user + " error : " + error);
                console.log(error);
            }
        })
    }
}


function validateLoginForm(loginData) {
    var usernameForm = $('#lg-username-form');
    var passwordForm = $('#lg-password-form');
    if (loginData.username.length < 6) {
        if (usernameForm.hasClass('has-success')) {
            usernameForm.removeClass('has-success');
        }
        usernameForm.addClass('has-error');
        return false
    } else {
        if (usernameForm.hasClass('has-error')) {
            usernameForm.removeClass('has-error');
        }
        usernameForm.addClass('has-success');
    }
    if (loginData.password.length < 6) {
        if (passwordForm.hasClass('has-success')) {
            passwordForm.removeClass('has-success');
        }
        passwordForm.addClass('has-error');
        return false;
    } else {
        if (passwordForm.hasClass('has-error')) {
            passwordForm.removeClass('has-error');
        }
        passwordForm.addClass('has-success');
    }
    return true;
}
