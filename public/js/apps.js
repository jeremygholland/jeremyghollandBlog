var myApp = angular.module('myApp', ['firebase','textAngular', 'ngRoute']);



myApp.config (function($routeProvider){
	$routeProvider.when('/blogEntries', {
		templateUrl: 'views/blogEntries.html',
		controller: 'entriesCtrl'
	});
	$routeProvider.when('/', {
		templateUrl:'views/login.html',
		controller:'loginCtrl'
	});
	$routeProvider.when('/userInfo/:itemId', {
		templateUrl: 'views/userViews.html',
		controller: 'singleCtrl'
	});
	$routeProvider.when('/addPost', {
		templateUrl: 'views/addPost.html',
		controller: 'postCrtl'
	});
	$routeProvider.otherwise({
		redirectTo: '/'
	});

});





