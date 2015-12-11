Parse.initialize("2GC1FHhSOkCGggQX8qvsO4jCyrHg28BoPEz5XOq4", "bd9nZ2eez7cZDsjDu0wOMk4orFAVJPkAMRrYMVKz");
(function(){
    var sammyApp = Sammy('#content', function(){
        this.get('#/', function(){
            this.redirect('#/home');
        });
        this.get('#/home', homeController.all);

    });

    $(function(){
        sammyApp.run('#/');
    })
}());