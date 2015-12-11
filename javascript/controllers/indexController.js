var indexController = function(){

    function geekProfile(context){
        templates.get('geek/myprofile')
            .then(function(template){
                context.$element().html(template());
            })
    }
    function customerProfile(context){
        templates.get('customer/myprofile')
            .then(function(template){
                context.$element().html(template());
            })
    }

    return{
        geekProfile: geekProfile,
        customerProfile: customerProfile
    };
}();