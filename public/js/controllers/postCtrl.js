var app = angular.module('myApp');


	app.controller('postCtrl', ['$scope', '$http','$routeParams', 'posts', function($scope, $http, $routeParams, posts){
		
		$scope.params = $routeParams;


	$scope.addPost = function(){
		postData ={
			title: $scope.name1,
			body: $scope.postText,
			author: $scope.user}
			 posts.create(postData)
				.success(function(data) {
					postData = data;
					console.log(data.name1);
					console.log(data.id);
					console.log(data.postText);
					console.log(data.user);
			alert("the shit made it");
		})
		.error(function(data){
			console.log('error: your shit did not work');
			})
		};

}]);