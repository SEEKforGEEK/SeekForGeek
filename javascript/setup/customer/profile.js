'use strict';

var CustomerProfile = function(settings){
    var options = {
        parse: {
        },
        currentUser: {
        },
        selectors: {
            btnNewProject: '.new-project',
            newProjectLink: '/#/customer/new-project',
            projectCount: '#customer-projects-badge',
            username: '#customer-username',
            emailChange: '#customer-emailToChange',
            emailInput: '#customer-emailInput',
            cheerCustomer: '#hello-customer',
            changePassword: '#customer-changePassword',
            alertForPassword: '#customer-alert-password',
            btnChangeEmail: '#customer-changeEmail',
            btnSaveEmail: '#customer-saveEmail'
        },
        variables: {
        }
    },

    initialize = function(){
        jQuery(".navbarTemplate")
            .removeClass("templateNone")
            .addClass("templateOn");
        jQuery("#footerTemplate")
            .removeClass("templateNone")
            .addClass("templateOn");

        options.parse.currentUser = Parse.User.current();
        options.currentUser.email = options.parse.currentUser.get('email');
        options.currentUser.username = options.parse.currentUser.get('username');
        options.currentUser.query = new Parse.Query('Projects');
        counterBadge(options.currentUser.query);

        jQuery(options.selectors.btnNewProject).on('click', function(event){
            event.preventDefault();
            $(location).attr('href', options.selectors.newProjectLink);
        });

        jQuery(options.selectors.username).append(options.currentUser.username);
        jQuery(options.selectors.emailChange).append(options.currentUser.email);
        jQuery(options.selectors.emailInput).val(options.currentUser.email);
        jQuery(options.selectors.cheerCustomer).html('Hello, ' + options.currentUser.username + '!');

        jQuery(options.selectors.changePassword).on('click', resetPassword);

        jQuery(options.selectors.btnChangeEmail).on('click', triggerBtnChangeEmail);
        jQuery(options.selectors.btnSaveEmail).on('click', saveEmail);

    },

    saveEmail = function(){
        var email = jQuery(options.selectors.emailInput).val();

        options.parse.currentUser.set('email', email);
        options.parse.currentUser.save(null, {
            success: function(user){
                options.parse.currentUser.fetch({
                    success: function(currentUser){
                        jQuery(options.selectors.emailChange).show()
                            .empty()
                            .append(currentUser.get('email'));
                        jQuery(options.selectors.btnChangeEmail).show();
                        jQuery(options.selectors.emailInput).hide();
                        jQuery(options.selectors.btnSaveEmail).hide();
                    },
                    error: function(){
                        toastr.error('Sorry something happen, please try later!');
                    }
                });

            },
            error: function(user, error){
                toastr.error('Failed to update ' + user + " with error: " + error);
            }

        });
    },

    triggerBtnChangeEmail = function(){
        jQuery(options.selectors.emailChange).hide();
        jQuery(options.selectors.btnChangeEmail).hide();
        jQuery(options.selectors.emailInput).show();
        jQuery(options.selectors.btnSaveEmail).show();
    },

    resetPassword = function(){
        Parse.User.requestPasswordReset(options.currentUser.email, {
            success: function() {
                jQuery(options.selectors.alertForPassword).html('Successfully send email');
            },
            error: function() {
                jQuery(options.selectors.alertForPassword).html("Sorry, try again later!");
            }
        });
    },

    counterBadge = function(query){
        query.equalTo('owner', options.currentUser.username);
        query.count({
            success: function(count){
                jQuery(options.selectors.projectCount).html(count);
            },
            error: function(err){
            }
        });
    };

    return{
        initialize: initialize
    };
};



jQuery(document).ready(function(){
    CustomerProfile().initialize();
});