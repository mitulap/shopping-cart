shoppingCart.controller('SignInController', ['$scope', '$http', '$location' ,'$cookieStore', function($scope, $http, $location, $cookieStore) {
    
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.errorLogin = false;
    $scope.signin = function() { 

        var url = "http://127.0.0.1:5000/authenticateUser"
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: {name: $scope.params.username, password: $scope.params.password}
        }).success(function (data) {
            $scope.restaurants = data;
            console.log(data);

            if(data === 'true'){
                console.log(data);
                $cookieStore.put('isAuth', true);
                $cookieStore.put('userId', 'tUid1');
                $location.path("/" + "main");
            }else{
                $scope.errorLogin = true;
            }
            
        }).error(function(err){
            console.log(err);
            $scope.errorLogin = true;
        });

    };

    $scope.register = function(){
        $location.path("/" + "register");
    };

}]);