describe('Test : ProductController', function () {

  beforeEach(module('mystore'));

  var $controller, $location, productService, deferred;

  beforeEach(inject(function(_$controller_, _$location_, $q){
    // Product Service Mocking
    productService = {
      AddProduct: function(product) {
          if(product!=undefined){
              if(product.Name != "") return true;
              else return false;
          } 
          else false;
      },
      GetProducts: function() {
          deferred = $q.defer();
          var Products = {"products":
                            [{"Id":"1", "Name":"Engine","Description":"BMW Engine","Price":"129.00"},
                            {"Id":"2", "Name":"Cover","Description":"Silver Cover","Price":"145.00"},
                            {"Id":"3", "Name":"Pipe","Description":"Fuel Pipe","Price":"132.00"}]};
          deferred.resolve(Products.products);
          return deferred.promise;
      }
    };
    spyOn(productService, 'AddProduct').and.returnValue(true); 
    
    $controller = _$controller_;
    $location = _$location_;
  }));
  
  describe('Test Method : Insert Product Unit Test', function () {
		it('Test Case : Add Product', function () {
			var $scope = {};
			var controller = $controller('productController', 
                                { $scope: $scope , $location: $location, productService: productService });
                                
            $scope.newProduct = {"Id":"1", "Name":"Engine","Description":"BMW Engine","Price":"129.00"};
            $scope.AddProduct();
            expect($scope.status).toEqual('Added');
		});	
    });
    
    describe('Test Method : Get Products Unit Test', function () {
		it('Test Case : Get Products', function () {
			var $scope = {};
            
			var controller = $controller('productController', { $scope: $scope , $location: $location, productService: productService });
            $scope.filterBy("Name", true);
            expect($scope.orderByProp).toEqual('Name');
            expect($scope.direction).toEqual(true);
		});	
    });
});