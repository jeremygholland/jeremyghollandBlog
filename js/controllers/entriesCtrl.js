app.controller('entriesCtrl', function($scope, $routeParams, $firebase){

		$scope.params = $routeParams;
	var ref = new Firebase('https://jhollaapp.firebaseio.com/')
	var sync = $firebase(ref.child("posts"));
	
	$scope.onlinePostes = sync.$asArray();
	$scope.numLimit = 500;
});