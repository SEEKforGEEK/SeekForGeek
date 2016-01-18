'use strict';

var LoginModule = function(settings){
    var options = {
        parse: {

        },
        currentUser: {

        },
        selectors: {
            btnLogin: '#loginButton',
            loginModal: '#modal-login',
            loginUsername: '#login-username',
            loginPassword: '#login-pass',
            forgotPassword: '#modal-forgot-pass',
            forgotPasswordEmail: '#forgot-pass-email',
            geeksCounter: '#geeksCounter',
            customersCounter: '#customersCounter',
            projectsCounter: '#projectsCounter',
            btnPassword: '#passButton',
            loginUsernameForm: '#lg-username-form',
            loginPasswordForm: '#lg-password-form',
            customerProfileLink: '/#/customer/profile',
            geekProfileLink: '/#/geek/profile'
        },
        variables: {

        }
    },

    validateLoginForm = function(loginData) {
        var usernameForm = jQuery(options.selectors.loginUsernameForm);
        if (loginData.username.length < 6) {
            if (usernameForm.hasClass('has-success')) {
                usernameForm.removeClass('has-success');
            }
            usernameForm.addClass('has-error');
            return false;
        } else {
            if (usernameForm.hasClass('has-error')) {
                usernameForm.removeClass('has-error');
            }
            usernameForm.addClass('has-success');
        }
        return true;
    },


    loginForm = function(event){
        var loginData = {
            username: jQuery(options.selectors.loginPassword).val(),
            password: jQuery(options.selectors.loginPassword).val()
        };
        var passwordForm = jQuery(options.selectors.loginPasswordForm);
        if (validateLoginForm(loginData)) {
            Parse.User.logIn(loginData.username, loginData.password, {
                success: function (user) {
                    if (passwordForm.hasClass('has-error')) {
                        passwordForm.removeClass('has-error');
                    }
                    passwordForm.addClass('has-success');

                    if (user.get('type') == 'customer') {
                        jQuery(location).attr('href', options.selectors.customerProfileLink);
                    }else{
                        jQuery(location).attr('href', options.selectors.geekProfileLink);
                    }
                    location.reload();
                    toastr.success("Successfully login!");
                },
                error: function (user, error) {
                    if (passwordForm.hasClass('has-success')) {
                        passwordForm.removeClass('has-success');
                    }
                    passwordForm.addClass('has-error');
                    toastr.error(error.message);
                }
            });
        }
    },

    initialize = function(){

        jQuery(options.selectors.btnLogin).on('click', function(event){
            event.preventDefault();
            loginForm();
        });
        jQuery(options.selectors.loginModal).on('shown.bs.modal', function () {
            jQuery(options.selectors.loginUsername).focus();
        });
        jQuery(options.selectors.forgotPassword).on('shown.bs.modal', function () {
            jQuery(options.selectors.forgotPasswordEmail).focus();
        });

        options.parse.queryProjects = new Parse.Query("Projects");
        options.parse.queryUsers = new Parse.Query(Parse.User);

        options.parse.queryUsers.equalTo('type', 'geek');
        options.parse.queryUsers.find({
            success: function(res){
                jQuery(options.selectors.geeksCounter).append(res.length + " registered geeks");
            }
        });


        options.parse.queryUsers.equalTo('type', 'customer');
        options.parse.queryUsers.find({
            success: function(res){
                jQuery(options.selectors.customersCounter).append(res.length + "  satisfied customers");
            }
        });

        options.parse.queryProjects.exists('title');
        options.parse.queryProjects.find({
            success: function(res){
                jQuery(options.selectors.projectsCounter).append(res.length + " active projects");
            }
        });

        jQuery(options.selectors.btnPassword).on('click', function(){
            Parse.User.requestPasswordReset(jQuery(options.selectors.forgotPasswordEmail).val(), {
                success: function() {
                    toastr.success('successfully send email');
                },
                error: function(error) {
                    toastr.error("Error: " + error.code + " " + error.message);
                }
            });
        })
    };

    return {
        initialize: initialize
    };
};


jQuery(document).ready(function () {
    LoginModule().initialize();
});