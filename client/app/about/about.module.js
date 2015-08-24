(function(){
    angular
        .module('app.About', [])
        .config(config);
        
    config.$injector = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('about', {
               url: '/about',
               templateUrl: 'app/about/about.view.html',
               controller: AboutController,
               controllerAs: 'about'
            });
    }
    
    AboutController.$injector = [];
    function AboutController(){
        var vm = this;
    }
})();