$(document).ready(function(){

    $(".navbarTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
    $("#footerTemplate")
        .removeClass("templateNone")
        .addClass("templateOn");
        
    $('.browse-job').on('click',function(){
        $(location).attr('href', '/#/search?index=all');
    });


    var currentUser = Parse.User.current();
    var currentEmail = currentUser.get('email');
    var currentName = currentUser.get('username');
    var watchlist = currentUser.get('watchlist') || [];
    $('#watchlist-badge').html(watchlist.length);
    var query = new Parse.Query('Submissions');
    query.equalTo('submissionOwner', currentName);
    query.count({
        success: function(count){
            $('#projects-badge').html(count);
        },
        error: function(err){
        }
    });

    $('#geek-username').append(currentName);
    $('#geek-emailToChange').append(currentEmail);
    $('#geek-emailInput').val(currentEmail);
    $('#hello-geek').html('Hello, ' + currentName + '!');

    $('#geek-changePassword').on('click', function(){
        Parse.User.requestPasswordReset(currentEmail, {
            success: function() {
                $('#geek-alert-password').html('Successfully send email');
            },
            error: function(error) {
                $('#geek-alert-password').html("Sorry, try again later!");
            }
        });
    });

    $('#geek-changeEmail').on('click', function(){
        $('#geek-emailToChange').hide();
        $('#geek-changeEmail').hide();
        $('#geek-emailInput').show();
        $('#geek-saveEmail').show();
    });

    $('#geek-saveEmail').on('click', function(){
        var email = $('#geek-emailInput').val();

        currentUser.set('email', email);
        currentUser.save(null, {
            success: function(user){
                currentUser.fetch({
                    success: function(currentUser){
                         $('#geek-emailToChange').show()
                            .empty()
                            .append(currentUser.get('email'));
                        $('#geek-changeEmail').show();
                        $('#geek-emailInput').hide();
                        $('#geek-saveEmail').hide();
                    },
                    error: function(currentUser, error){
                        toastr.error('Sorry something happen, please try later!');
                    }
                });
               
            },
            error: function(user, error){
                toastr.error('Failed to update ' + user + " with error: " + error);
            }

        });
    });

    
});

