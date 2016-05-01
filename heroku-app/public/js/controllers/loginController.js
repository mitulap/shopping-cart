shoppingCart.controller('SignInController', ['$scope', '$http', '$location' ,'$cookieStore', '__env', function($scope, $http, $location, $cookieStore, __env) {
    
    if($cookieStore.get('isAuth') == true){
        console.log("product");
        $location.path('/products');
    }

    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.errorLogin = false;
    $scope.signin = function() {
        $scope.user_email = $scope.email;
        $scope.user_type = $cookieStore.get("user_type");
        $scope.uName = $scope.username;
        /*console.log($scope.params);
        console.log($http);*/
        console.log($cookieStore);

        if($scope.params.username == $scope.params.password){
            $cookieStore.put('isAuth', true);
            $cookieStore.put('userId', 'tUid1');
            $location.path("/" + "products");
        }else{
            $scope.errorLogin = true;
        }


        /*var url = "__env.apiUrl"
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
            $location.path("/" + "login");
        });*/
    };


    $scope.register = function(){
        $location.path("/" + "register");
    }

}]);