app.controller('entriesCtrl', function($scope, $routeParams, $firebase, $firebaseSimpleLogin){
$scope.loginDiv = false;
	$scope.topDiv= true;
		$scope.params = $routeParams;
	var ref = new Firebase('https://jhollaapp.firebaseio.com/')
	var sync = $firebase(ref.child("posts"));
	
	$scope.onlinePostes = sync.$asArray();
	$scope.numLimit = 500;
	$scope.hover= function(onlinePoste){
		$scope.hoverTrue = true;
	}
	$scope.hoverNo = function(onlinePoste){
		$scope.hoverTrue = false;
	}
	$scope.hoverTrue= false;
});