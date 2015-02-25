var app = angular.module('app', ['firebase','textAngular', 'ngRoute']);

app.config (function($routeProvider){
	$routeProvider.when('/blogEntries', {
		templateUrl: 'views/blogEntries.html',
		controller: 'entriesCtrl'
	});
	$routeProvider.when('/userInfo/:itemId', {
		templateUrl: 'views/userViews.html',
		controller: 'singleCtrl'
	});
	$routeProvider.when('/addPost', {
		templateUrl: 'views/addPost.html',
		controller: 'postCtrl'
	});
	$routeProvider.when('/', {
		templateUrl: 'views/login.html',
		controller: 'loginCtrl'
	});

});





