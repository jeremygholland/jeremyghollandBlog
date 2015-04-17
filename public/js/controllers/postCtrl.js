
	myApp.controller('postCrtl', ['$scope', '$http', function($scope, $routeParams, $http){
		
		$scope.params = $routeParams;
	
		var Posts ={
			get : function(http) {
				return $http.get('/api/posts');
			},
			create : function(http, postData) {
				return $http.post('/api/posts', postData);
			}
		}


	$scope.addPost = function(){
		if ($scope.title != undefined) {
				Posts.create($scope.title)
				.success(function(data) {
			alert("the shit made it");
		})
		.error(function(data){
			console.log('error: your shit did not work');
			})
		};
	}

}]);