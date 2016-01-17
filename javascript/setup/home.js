var HomeModule = function(settings){
    var options = {
        parse: {

        },
        currentUser: {

        },
        selectors: {
            loginInRegister: '#loginInRegister',
            registerInLogin: '#registerInLogin',
            btnForgotPass: '#btnForgotPass',
            closeRegister: '#closeRegister',
            closeLogin: "#closeLogIn",
            registerHire: '#register-hire',
            registerWork: '#register-work',
            registerEmail: '#register-email',
            registerUserName: '#register-username',
            registerPassword: '#register-pass',
            customerProfile: '/#/customer/profile',
            geekProfile: '/#/geek/profile',
            btnRegister: '#registerButton',
            registerCustomer: '#register-customer',
            registerGeek: '#register-geek',
            registerConfigPassword: '#register-conf-pass',
            registerModal: '#modal-register',
            emailForm: '#email-form',
            usernameForm: '#username-form',
            passwordForm: '#password-form',
            configPasswordForm: '#conf-pass-form'
        },
        variables: {
            patternForEmail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        }
    },

    initialize = function(){

        $('#content').css('padding-bottom', '0%').css('padding-left', '0%')
            .css('padding-right', '0%').css('height','100%');
        $('body').css('margin-bottom' ,'-20px');

        jQuery(options.selectors.loginInRegister).on('click', loginInRegister);
        jQuery(options.selectors.registerInLogin).on('click', registerInLogin);
        jQuery(options.selectors.btnForgotPass).on('click', registerInLogin);


        jQuery(options.selectors.btnRegister).on('click', function(event){
            event.preventDefault();
            registerForm()
        });
        jQuery(options.selectors.registerCustomer).on('click', registerFormCustomer);
        jQuery(options.selectors.registerGeek).on('click', registerFormGeek);

        jQuery(options.selectors.registerConfigPassword).keyup(validateRegisterPasswords);

        jQuery(options.selectors.registerModal).on('shown.bs.modal',function(){
            jQuery(options.selectors.registerEmail).focus();
        });

    },

    loginInRegister = function() {
        jQuery(options.selectors.closeRegister).trigger("click");
    },

    registerInLogin = function() {
        jQuery(options.selectors.closeLogin).trigger("click");
    },

    registerForm = function() {
        var type;
        if (jQuery(options.selectors.registerHire).is(':checked')) {
            type = 'customer';
        }
        if (jQuery(options.selectors.registerWork).is(':checked')) {
            type = 'geek';
        }

        var registerData = {
            email: jQuery(options.selectors.registerEmail).val(),
            username: jQuery(options.selectors.registerUserName).val(),
            password: jQuery(options.selectors.registerPassword).val(),
            type: type
        };

        if (validateRegisterForm(registerData) && validateRegisterPasswords()) {
            var User = new Parse.User();

            User.set("username", registerData.username);
            User.set("email", registerData.email);
            User.set("password", registerData.password);
            User.set("type", registerData.type);


            User.signUp(null, {
                success: function (user) {
                    if (registerData.type == 'customer') {
                        jQuery(location).attr('href', options.selectors.customerProfile);
                    }else{
                        jQuery(location).attr('href', options.selectors.geekProfile);
                    }

                    location.reload();
                    toastr.success('Hello ' + user + '! Have a nice day!');

                },
                error: function () {
                    toastr.error('Wrong data! Please try again!');
                }
            });
        }
    },

    validateRegisterForm = function(registerData) {
        var patternForEmail = options.variables.patternForEmail;
        var emailForm = jQuery(options.selectors.emailForm);
        var usernameForm = jQuery(options.selectors.usernameForm);
        var passwordForm = jQuery(options.selectors.passwordForm);
        var typeForm = jQuery('#type-form');
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
    },

    registerFormCustomer = function() {
        jQuery("#register-button").trigger("click");
        jQuery("#register-hire").prop("checked", true);
    },

    registerFormGeek = function(){
        jQuery("#register-button").trigger("click");
        jQuery("#register-work").prop("checked", true);
    },

    validateRegisterPasswords = function() {
        var password = jQuery(options.selectors.registerPassword).val();
        var confirmPassword = jQuery(options.selectors.registerConfigPassword).val();
        var confPassForm = jQuery(options.selectors.configPasswordForm);
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
    };

    return {
        initialize: initialize
    };
};


jQuery(document).ready(function () {

    HomeModule().initialize();

});
