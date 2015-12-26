
var geekController = function () {

    function profile(context) {
        templates.get('geek/profile')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    function watchlist(context) {
        templates.get('geek/watchlist')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    function allProjects(context) {
        templates.get('geek/all-projects')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    function project(context) {
        templates.get('geek/project')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    return {
        profile: profile,
        watchlist: watchlist,
        allProjects: allProjects,
        project: project
    };
}();