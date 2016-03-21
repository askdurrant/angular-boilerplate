(function() {
    angular
        .module('app', [
            'ui.router',
            'app.Header',
            'app.Home',
            'app.About',
            'app.Footer',
            'app.DataService'
        ])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

    function run() { //Use to kickstart application 
        console.log('run');
    }
})();