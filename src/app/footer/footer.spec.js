describe('Footer Directive', function() {

    var controller, template;

    beforeEach(module('app.Header'));
    beforeEach(module('templates'));

    beforeEach(inject(function($rootScope, $compile, $templateCache) {

        template = $templateCache.get('src/app/footer/footer.view.html');
        $templateCache.put('app/footer/footer.view.html', template);
        var element = angular.element('<footer></footer>');
        var scope = $rootScope;

        $compile(element)(scope);
        scope.$digest();

        controller = element.controller;
    }));

    it('Controller should be defined', function() {
        expect(controller).toBeDefined();
    });

});