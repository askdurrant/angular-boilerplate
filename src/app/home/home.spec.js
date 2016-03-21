describe('Controller: HomeController', function() {

    beforeEach(module('ui.router'));
    beforeEach(module('app.Home'));
    
    var HomeController, GetData;
    
  beforeEach(inject(function($controller) {
    GetData = {
      data: true  
    };

    HomeController = $controller('HomeController', {GetData: GetData});

  }));
    
    it('should be defined', function() {
        expect(HomeController).toBeDefined();
    });
    
    it('vm.data should have a value and be true (set to GetData resolve)', function(){
      expect(HomeController.data).toBe(true);
    });
});