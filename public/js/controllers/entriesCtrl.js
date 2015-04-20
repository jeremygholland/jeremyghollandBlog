app.controller('entriesCtrl', ['$scope', '$http','$routeParams', 'posts', function($scope, $http, $routeParams, posts){


$scope.loginDiv = false;
	$scope.topDiv= true;
		$scope.params = $routeParams;

	
		posts.get()
		.success(function(data) {
				$scope.onlinePostes = data;
				alert("yeah this is working");
			});


	$scope.hover= function(onlinePoste){
		$scope.hoverTrue = true;
	}
	$scope.hoverNo = function(onlinePoste){
		$scope.hoverTrue = false;
	}
	$scope.hoverTrue= false;
}]);