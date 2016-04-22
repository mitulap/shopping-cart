shoppingCart.controller('SignInController', ['$scope', '$http', '$location' ,'$cookieStore', function($scope, $http, $location, $cookieStore) {
    
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.signin = function() {
        $scope.user_email = $scope.email;
        $scope.user_type = $cookieStore.get("user_type");

        if($scope.params.username == $scope.params.password){
            $cookieStore.put('isAuth', true);
            $cookieStore.put('userId', 'tUid1');
            $location.path("/" + "main");
        }
        $location.path("/" + "login");
       

/*        var url = "";
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
                $location.path("/" + "login");
            }
            
        }).error(function(err){
            console.log(err);
            $location.path("/" + "login");
        });*/

}}]);