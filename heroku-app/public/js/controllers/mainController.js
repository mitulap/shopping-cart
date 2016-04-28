shoppingCart.controller('MainController', [ '$scope', '$interval', '$http', '$location' ,'$cookieStore' ,function($scope, $interval, $http, $location, $cookieStore) {
    
    //$cookieStore.put("Name", "mitul");
    console.log($cookieStore);

    if($cookieStore.get('isAuth') == true){
        console.log("product");
        $location.path('/products');
    }else{
        console.log("login");
        $location.path( "/login");
    }


    $scope.logout = function(){
        $cookieStore.remove('isAuth');
        $cookieStore.put('userId', "");
        $location.path("/login");
    };

    console.log('Main controller');
}]);