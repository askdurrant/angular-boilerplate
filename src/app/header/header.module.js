(function() {
    angular
        .module('app.Header', [])
        .directive('header', Header);

    function Header() {
        var directive = {
            link: Link,
            templateUrl: 'app/header/header.view.html',
            restrict: 'EA',
            controller: HeaderController,
            controllerAs: 'header'
        };
        return directive;

        function Link(scope, element, attrs) {

        }

        HeaderController.$inject = [];

        function HeaderController() {
            var vm = this;
        }
    }
})();