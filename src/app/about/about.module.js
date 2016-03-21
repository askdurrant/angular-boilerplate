(function() {
    angular
        .module('app.About', [])
        .config(config)
        .controller('AboutController', AboutController);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'app/about/about.view.html',
                controller: 'AboutController',
                controllerAs: 'about'
            });
    }

    AboutController.$inject = [];

    function AboutController() {
        var vm = this;
    }
})();