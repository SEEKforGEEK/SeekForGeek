$(document).ready(function () {
    $('#loginButton').click(loginForm);
    $('#modal-login').on('shown.bs.modal', function () {
        $('#login-username').focus();
    });
    $('#modal-forgot-pass').on('shown.bs.modal', function () {
        $('#forgot-pass-email').focus();
    });
    //var projects,
    //    geeks,
    //    customers;
    //
    //var Projects = Parse.Object.extend('Projects');
    //var User = Parse.Object.extend('User');
    //
    //var queryProjects = new Parse.Query(Projects);
    //var queryUsers = new Parse.Query(User);
    //var queryCustomers = new Parse.Query(User);
    //
    //queryProjects.find({
    //    success: function(allProjects){
    //        projects = allProjects.length;
    //    }
    //});
    //
    //queryUsers.equalTo('type', 'geek');
    //queryUsers.find({
    //    success: function(res){
    //        geeks = res.length;
    //    },
    //    error: function(error){
    //        console.log(error);
    //    }
    //});
    //
    //queryCustomers.equalTo('type', 'customer');
    //queryCustomers.find({
    //    success:function(res){
    //        customers = res.length;
    //    },
    //    error: function(err){
    //        console.log(err);
    //    }
    //});

    $('#customersCounter').append(0 + "  satisfied customers");
    $('#projectsCounter').append(0 + " completed projects");
    $('#geeksCounter').append(0 + " registered geeks");


});


function loginForm() {
    var loginData = {
        username: $('#login-username').val(),
        password: $('#login-pass').val()
    };
    if (validateLoginForm(loginData)) {
        Parse.User.logIn(loginData.username, loginData.password, {
            success: function (user) {
                //alert(user + " is log in ");
                $(location).attr('href','/#/geek/profile');
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
