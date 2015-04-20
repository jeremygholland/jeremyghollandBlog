var app = angular.module('myApp', ['firebase','textAngular', 'ngRoute']);



app.config (function($routeProvider){
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
		controller: 'postCtrl'
	});
	$routeProvider.otherwise({
		redirectTo: '/'
	});

});





