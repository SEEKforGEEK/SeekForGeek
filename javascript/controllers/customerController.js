var customerController = function(){

    function profile(context){
        templates.get('customer/profile')
            .then(function(template){
                context.$element().html(template());
            });
    }
    function projects(context){
        templates.get('customer/projects')
            .then(function(template){
                context.$element().html(template());
            });
    }
    function newProject(context){
        templates.get('customer/new-project')
            .then(function(template){
                context.$element().html(template());
            });
    }


    return{
        profile: profile,
        projects: projects,
        newProject: newProject
    };
}();