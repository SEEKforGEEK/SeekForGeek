Parse.initialize("WYlKRrdVfAxC5qEDv8XNnTvYNYTaU2uoQnr6VFKe", "QCK577sPYWNBXdk6wkWSa0YMoFkslkP2JkpmMt0m");
(function () {
    var sammyApp = Sammy('#content', function () {
        this.get('#/', function () {
            this.redirect('#/home');
        });
        this.get('#/home', homeController.all);
        //this.get('#/geek/myprofile', indexController.geekProfile);
        //this.get('#/customer/myprofile', indexController.customerProfile);

    });

    $(function () {
        sammyApp.run('#/');
    })
}());