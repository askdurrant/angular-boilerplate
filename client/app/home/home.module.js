(function(){
    angular
        .module('app.Home', [])
        .config(config);
        
    config.$injector = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
               url: '/',
               templateUrl: 'app/home/home.view.html',
               controller: HomeController,
               controllerAs: 'home',
               resolve: {
                    GetData: function(DataService){
                        return DataService.GetData();
                    }
               }
            });
    }
    
    HomeController.$injector = ['GetData'];
    function HomeController(GetData){
        var vm = this;
        
        vm.data = GetData.data;
    }
})();