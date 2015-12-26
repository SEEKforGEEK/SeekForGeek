
//'use strict';

(function(){
    $(".navbarTemplate")
        .addClass("templateNone")
        .removeClass("templateOn");
    $("#footerTemplate")
        .addClass("templateNone")
        .removeClass("templateOn");
    $("li.dropdown").on('click', function() {
        $("nav.navbar").toggleClass("open");
    });
}());

var templates = (function () {
    var handlebars = window.handlebars || window.Handlebars;

    function get(name) {
        return new Promise(function (resolve, reject) {
            var url = 'templates/' + name + '.handlebars';

            $.get(url, function (html) {
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