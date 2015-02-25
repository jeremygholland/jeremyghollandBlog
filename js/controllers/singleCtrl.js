app.controller('singleCtrl', function($scope, $routeParams, $firebase, $firebaseSimpleLogin){
$scope.loginDiv = false;
	$scope.topDiv= true;
    $scope.whichItem = $routeParams.itemId; 
    var ref = new Firebase('https://jhollaapp.firebaseio.com/')
	var sync = $firebase(ref.child("posts"));
	$scope.onlinePostes = sync.$asArray();

	var sync1 = $firebase(ref.child("posts/comments").child($scope.whichItem));
	$scope.userReviews = sync1.$asArray();
	var saveComment = function(){
		$scope.userReviews.$save();
	}

	$scope.addComment = function(){
		if(($scope.commentTitle != null) && ($scope.commenterName != null) && ($scope.commentText != null)){
			$scope.userReviews.$add({title: $scope.commentTitle, text: $scope.commentText, user: $scope.commenterName});
			$scope.commenterName = null;
			$scope.commentTitle = null;
			$scope.commentText = null;
			saveComment();
			}
		else{
			alert("you suck, brah");
		}
	}
});
