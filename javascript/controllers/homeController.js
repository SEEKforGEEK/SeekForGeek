
// var Promise = require('es6-promise').Promise;

var homeController = function () {

    function all(context) {
        templates.get('home')
            .then(function (template) {
                context.$element().html(template());
            })
    }

    return {
        all: all
    };
}();