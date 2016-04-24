shoppingCart.controller('RegistrationController', ['$scope', '$http', '$location' ,'$cookieStore', function($scope, $http, $location, $cookieStore) {
    
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.SuccessRegister = false;
    $scope.register = function() {


        console.log("Registration Has been Successfully called");

        var url = "http://127.0.0.1:5000/registerUser"
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: {name: $scope.params.username, password: $scope.params.password, email: $scope.params.email, address: $scope.params.address, phone: $scope.params.phone }
        }).success(function (data) {
            $scope.restaurants = data;
            console.log(data);
            $scope.SuccessRegister = true;
            if(data === 'success'){
                //$location.path("/" + "login");
            }else{
                $location.path("/" + "register");
            }
            
        }).error(function(err){
            console.log(err);
            $location.path("/" + "login");
        });

    };

    $scope.login = function(){
        $location.path("/" + "login");
    }

}]);