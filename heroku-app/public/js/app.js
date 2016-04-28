//this is where we will enter routes for application

var shoppingCart = angular.module('shoppingCart', ['chart.js', 'ngRoute', 'ngAnimate', 'uiSwitch','ngCookies'])

    .config(function ($routeProvider) {
    $routeProvider.
    when('/login', {
        templateUrl: 'login.html',
        controller: 'SignInController'
    }).
    when('/products', {
        templateUrl: 'products.html',
        controller: 'ProductController'
    }).
    when('/register', {
        templateUrl: 'register.html',
        controller: 'RegistrationController'
    }).
    when('/', {
        templateUrl: 'index.html',
        controller: 'mainController'
    }).
    otherwise({redirectTo: '/'});
});
