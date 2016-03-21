(function(){
    angular
        .module('app.DataService', [])
        .factory('DataService', DataService);
        
    DataService.$injector = ['$http'];
    
    function DataService($http){
        return{
            GetData: GetData
        };
        
        function GetData(){
            return $http.get('http://jsonplaceholder.typicode.com/posts').then(handleSuccess, handleError('Error getting data'));
        }
        
        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function() {
                return {
                    error: error
                };
            };
        }           
    }
})();