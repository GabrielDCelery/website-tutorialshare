console.log("app is running...");

var myApp = angular.module('myApp', [
	'ngRoute',
	'ngStorage', 
	'DisplayFactory', 
	'DatabaseFactory', 
	'FormValidationFactory', 
	'TokenFactory', 
	'AuthController', 
	'LoginController',
	'RegisterController',
	'ResetController',
	'ResetMailController',
	'ListController',
	'AddLogController'
	]);

myApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/_main.html',
			controller: 'MainCtrl'
		})
		.when('/login', {
			templateUrl: 'views/auth/_login.html',
			controller: 'LoginCtrl'
		})
		.when('/register', {
			templateUrl: 'views/auth/_register.html',
			controller: 'RegisterCtrl'
		})
		.when('/reset', {
			templateUrl: 'views/auth/_resetmail.html',
			controller: 'ResetMailCtrl'
		})
		.when('/reset/:encrypteduserdata', {
			templateUrl: 'views/auth/_reset.html',
			controller: 'ResetCtrl'	
		})
		.when('/list', {
			templateUrl: 'views/log/_list.html',
			controller: 'ListCtrl'
		})
		.when('/add', {
			templateUrl: 'views/log/_add.html',
			controller: 'AddLogCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})

	$locationProvider.html5Mode(true);

	$httpProvider.interceptors.push('TokenInterceptor');

}])

myApp.controller('MainCtrl', ['$scope', function ($scope){

}])