describe('Controller: AboutController', function() {

  beforeEach(module('ui.router'));
  beforeEach(module('app.About'));

  var AboutController;

  beforeEach(inject(function($controller) {
    AboutController = $controller('AboutController');
  }));

  it('should be defined', function() {
    expect(AboutController).toBeDefined();
  });
});