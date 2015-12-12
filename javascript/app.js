Parse.initialize("WYlKRrdVfAxC5qEDv8XNnTvYNYTaU2uoQnr6VFKe", "QCK577sPYWNBXdk6wkWSa0YMoFkslkP2JkpmMt0m");
(function () {
    var sammyApp = Sammy('#content', function () {
        this.get('#/', function () {
            this.redirect('#/home');
        });
        this.get('#/home', homeController.all);
        this.get('#/search', searchController.search);
        this.get('#/project-details', projectController.project);
        this.get('#/about-us', basicController.aboutUs);
        this.get('#/contact-us', basicController.contactUs);
        this.get('#/how-it-works', basicController.howItWorks);

        this.get('#/geek/profile', geekController.profile);
        this.get('#/geek/watchlist', geekController.watchlist);
        this.get('#/geek/projects', geekController.allProjects);
        this.get('#/geek/projects/:id', geekController.project);

        this.get('#/customer/profile', customerController.profile);
        this.get('#/customer/projects', customerController.projects);
        this.get('#/customer/new-project', customerController.newProject);

    });

    $(function () {
        sammyApp.run('#/');
    })
}());