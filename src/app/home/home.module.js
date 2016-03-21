(function() {
    angular
        .module('app.Home', [])
        .config(config)
        .controller('HomeController', HomeController);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'home',
                resolve: {
                    GetData: getData
                }
            });
    }

    getData.$inject = ['DataService'];

    function getData(DataService) {
        return DataService.GetData();
    }

    HomeController.$inject = ['GetData'];

    function HomeController(GetData) {
        var vm = this;
        vm.data = GetData.data;
    }
})();