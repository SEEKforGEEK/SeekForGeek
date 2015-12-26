
var projectController = function () {

    function projectDetails(context) {
        templates.get('project-details')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    return {
        project: projectDetails
    }
}();