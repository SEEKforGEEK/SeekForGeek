
var searchController = function () {

    function search(context) {
        templates.get('search')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    return {
        search: search
    };
}();