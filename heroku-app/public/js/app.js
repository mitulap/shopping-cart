//this is where we will enter routes for application

var shoppingCart = angular.module('shoppingCart', ['chart.js', 'ngRoute', 'ngAnimate', 'uiSwitch','ngCookies'])

    .config(function ($routeProvider) {
    $routeProvider/*.
    when('/activities', {
        templateUrl: 'activities.html',
        controller: 'ActivitiesController'
    }).
    when('/recommendations', {
        templateUrl: 'recommendations.html',
        controller: 'RecommendationsController'
    }).
    when('/search_results', {
        templateUrl: 'search_results.html',
        controller: 'SearchRestaurantController'
    }).
    when('/main', {
        templateUrl: 'main.html',
        controller: 'ActivitiesController'
    })*/.
    when('/login', {
        templateUrl: 'login.html',
        controller: 'SignInController'
    }).
    when('/products', {
        templateUrl: 'products.html',
        controller: 'ProductController'
    }).
    otherwise({redirectTo: '/'});
});
