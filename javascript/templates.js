'use strict';

(function(){
    jQuery(".navbarTemplate")
        .addClass("templateNone")
        .removeClass("templateOn");
    jQuery("#footerTemplate")
        .addClass("templateNone")
        .removeClass("templateOn");
    jQuery("li.dropdown").on('click', function() {
        jQuery("nav.navbar").toggleClass("open");
    });
}());

var templates = (function () {
    var handlebars = window.handlebars || window.Handlebars;

    function get(name) {
        return new Promise(function (resolve, reject) {
            var url = 'templates/' + name + '.handlebars';

            jQuery.get(url, function (html) {
                var template = handlebars.compile(html);
                resolve(template);
            }).error(function (err) {
                reject(err);
            });
        });

    }

    return {
        get: get
    };
}());