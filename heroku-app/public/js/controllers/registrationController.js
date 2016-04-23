shoppingCart.controller('RegistrationController', ['$scope', '$http', '$location' ,'$cookieStore', function($scope, $http, $location, $cookieStore) {
    
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.SuccessRegister = false;
    $scope.register = function() {
        /*$scope.user_email = $scope.email;
        $scope.user_type = $cookieStore.get("user_type");

        if($scope.params.username == $scope.params.password){
            $cookieStore.put('isAuth', true);
            $cookieStore.put('userId', 'tUid1');
            $location.path("/" + "main");
        }
        $location.path("/" + "login");*/
        $scope.SuccessRegister = true;
        console.log("Registration Has been Successfully called");

    };

    $scope.login = function(){
        $location.path("/" + "login");
    }



}]);