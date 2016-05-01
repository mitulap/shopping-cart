 shoppingCart.controller('register', ['$scope', '$http', '$location' ,'$cookieStore', function($scope, $http, $location, $cookieStore) {

    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.SuccessRegister = false;
    $scope.register = function() {
        $scope.SuccessRegister = true;
        console.log("successful");

    };

    $scope.login = function(){
        $location.path("/" + "login");
    }



}]);
