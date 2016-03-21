describe('Header Directive', function() {

    var controller, template;

    beforeEach(module('app.Header'));
    beforeEach(module('templates'));

    beforeEach(inject(function($rootScope, $compile, $templateCache) {

        template = $templateCache.get('src/app/header/header.view.html');
        $templateCache.put('app/header/header.view.html', template);
        var element = angular.element('<header></header>');
        var scope = $rootScope;

        $compile(element)(scope);
        scope.$digest();

        controller = element.controller;
    }));

    it('Controller should be defined', function() {
        expect(controller).toBeDefined();
    });

});