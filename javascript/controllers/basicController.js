
var basicController = function () {
    function aboutUs(context) {
        templates.get('about-us')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    function contactUs(context) {
        templates.get('contact-us')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    function howItWorks(context) {
        templates.get('how-it-works')
            .then(function (template) {
                context.$element().html(template());
            });
    }


    return {
        aboutUs: aboutUs,
        contactUs: contactUs,
        howItWorks: howItWorks
    };
}();