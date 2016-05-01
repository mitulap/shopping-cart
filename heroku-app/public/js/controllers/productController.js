shoppingCart.controller('ProductController', [ '$scope', '$interval', '$http', '$location' ,'$cookieStore' ,function($scope, $interval, $http, $location, $cookieStore) {
    $scope.errorProduct = false;
	if($cookieStore.get('isAuth') != true){
        $location.path( "/login" );
    }


    counter = 0;
    $scope.productList = true;
    $scope.searchProduct = function(){

    	var urlPrefix = "http://open.api.ebay.com/shopping?" +
                        "callbackname=JSON_CALLBACK&callname=FindPopularItems&" + 
                        "responseencoding=JSON&" + 
                        "appid=HemilPar-Shopping-PRD-a2f839365-478878d5&siteid=0&" + 
                        "QueryKeywords=";
        
    	var urlVer = "&version=713";

    	var url = urlPrefix + "" + $scope.params.searchStr + "" + urlVer;

    	$http({
            method: 'JSONP',
            url: url
        }).success(function (data) {
            //$scope.restaurants = data;
            console.log(data);
            $scope.errorProduct = false;
            if(data.Ack == "Failure"){
                $scope.products = null;
                $scope.productList = false;
                $scope.errorProduct = true;
            }else{
                $scope.productList = true;
                $scope.errorProduct = false;
                $scope.products = data.ItemArray.Item;
            }
            
        }).error(function(err){
            console.log(err);
            /*$location.path("/" + "login");*/
        });

    };

    $scope.shortenProductName = function(pName){

        pName = substr(pName,0,50);
        if(pName.length > 50){
            return pName + "...";
        }else{
            return pName;
        }
    };


    $scope.addProduct = function() {

        $scope.totalProductsInCart = ++counter;

    };
}]);