(function() {
    angular
        .module('app.Footer', [])
        .directive('footer', Footer);

    function Footer() {
        var directive = {
            link: Link,
            templateUrl: 'app/footer/footer.view.html',
            restrict: 'EA',
            controller: FooterController,
            controllerAs: 'footer'
        };
        return directive;

        function Link(scope, element, attrs) {

        }

        FooterController.$inject = [];

        function FooterController() {
            var vm = this;
        }
    }
})();