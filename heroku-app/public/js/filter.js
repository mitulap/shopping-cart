shoppingCart.filter('shortenProductName', function() {
  return function(Title) {

    pName = substr(pName,0,50);
    console.log(pName);
    if(pName.length > 50){
    	console.log("...");
    	console.log(pName);
        return pName + "...";
    }else{
    	console.log(pName);
        return pName;
    }
  };
});