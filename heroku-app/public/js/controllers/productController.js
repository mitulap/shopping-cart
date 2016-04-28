shoppingCart.controller('ProductController', [ '$scope', '$interval', '$http', '$location' ,'$cookieStore' ,function($scope, $interval, $http, $location, $cookieStore) {

	if($cookieStore.get('isAuth') != true){
        $location.path( "/login" );
    }

    $scope.searchProduct = function(){

    	var urlPrefix = "http://open.api.ebay.com/shopping?callbackname=JSON_CALLBACK&callname=FindPopularItems&responseencoding=JSON&appid=HemilPar-Shopping-PRD-a2f839365-478878d5&siteid=0&QueryKeywords=";
        
    	var urlVer = "&version=713";

    	var url = urlPrefix + "" + $scope.params.searchStr + "" + urlVer;

    	$http({
            method: 'JSONP',
            url: url,
            jsonCallback: "myfun"
            //params : {callback : 'JSON_CALLBACK'}
        }).success(function (data) {
            //$scope.restaurants = data;
            $scope.products = data.ItemArray.Item;

            console.log(data);
            
        }).error(function(err){
            console.log(err);
            /*$location.path("/" + "login");*/
        });


        $scope.shortenProductName = function(pName){

            pName = substr(pName,0,50);
            if(pName.length > 50){
                return pName + "...";
            }else{
                return pName;
            }
        };


        /*$.ajax({
            type: 'GET',
            dataType: "json",
            crossDomain: true,
            url: url,
            success: function (responseData, textStatus, jqXHR) {
               console.log("Yay!!!");
            },
            error: function (responseData, textStatus, errorThrown) {
                console.log(responseData);
                console.log("something went wrong!! Error: "+textStatus);
            }
        });*/

    }
}]);