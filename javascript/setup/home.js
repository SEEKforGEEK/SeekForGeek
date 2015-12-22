$(document).ready(function () {
    $('#content').css('padding-bottom', '0%').css('padding-left', '0%')
        .css('padding-right', '0%');
        
    $('#loginInRegister').click(loginInRegister);
    $('#registerInLogin').click(registerInLogin);
    $('#btnForgotPass').click(registerInLogin);

    $('#registerButton').click(registerForm);
    $('#register-customer').click(registerFormCustomer);
    $('#register-geek').click(registerFormGeek);

    $("#register-conf-pass").keyup(validateRegisterPasswords);

    $('#modal-register').on('shown.bs.modal',function(){
        $('#register-email').focus();
    });

});

function loginInRegister() {
    $("#closeRegister").trigger("click");
}
function registerInLogin() {
    $("#closeLogIn").trigger("click");
}
function registerForm() {

    var type;
    if ($('#register-hire').is(':checked')) {
        type = 'customer';
    }
    if ($('#register-work').is(':checked')) {
        type = 'geek';
    }

    var registerData = {
        email: $('#register-email').val(),
        username: $('#register-username').val(),
        password: $('#register-pass').val(),
        type: type
    };

    if (validateRegisterForm(registerData)) {
        var User = new Parse.User();

        User.set("username", registerData.username);
        User.set("email", registerData.email);
        User.set("password", registerData.password);
        User.set("type", registerData.type);

        User.signUp(null, {
            success: function (user) {
                alert(user + " is registered successfully");
                if (registerData.type == 'customer') {
                    $(location).attr('href','/#/customer/profile');
                }else{
                    $(location).attr('href','/#/geek/profile');
                }
                location.reload();
            },
            error: function (user, error) {

                //TODO div with error
                alert(user + " ERROR: " + error);
                console.log(error);
            }
        })

    }
}

function validateRegisterForm(registerData) {
    var patternForEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var confirmPassword = $("#register-conf-pass");
    var emailForm = $('#email-form');
    var usernameForm = $('#username-form');
    var passwordForm = $('#password-form');
    var typeForm = $('#type-form');
    if (!registerData.email.match(patternForEmail)) {
        if (emailForm.hasClass('has-success')) {
            emailForm.removeClass('has-success');
        }
        emailForm.addClass('has-error');
        return false;
    } else {
        if (emailForm.hasClass('has-error')) {
            emailForm.removeClass('has-error');
        }
        emailForm.addClass('has-success');
    }
    if (registerData.username.length < 6) {
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
    if (registerData.password.length < 6) {
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
    if (registerData.type != 'customer' && registerData.type != 'geek') {
        if (typeForm.hasClass('has-success')) {
            typeForm.removeClass('has-success');
        }
        typeForm.addClass('has-error');
        return false;
    } else {
        if (typeForm.hasClass('has-error')) {
            typeForm.removeClass('has-error');
        }
        typeForm.addClass('has-success');
    }
    return true;
}

function registerFormCustomer() {
    $("#register-button").trigger("click");
    $("#register-hire").prop("checked", true);
}
function registerFormGeek() {
    $("#register-button").trigger("click");
    $("#register-work").prop("checked", true);
}

function validateRegisterPasswords() {
    var password = $("#register-pass").val();
    var confirmPassword = $("#register-conf-pass").val();
    var confPassForm = $("#conf-pass-form");
    if (password === confirmPassword) {
        if (confPassForm.hasClass('has-error')) {
            confPassForm.removeClass('has-error');
        }
        confPassForm.addClass('has-success');
        return true;
    } else {
        if (confPassForm.hasClass('has-success')) {
            confPassForm.removeClass('has-success');
        }
        confPassForm.addClass('has-error');
        return false;
    }

}