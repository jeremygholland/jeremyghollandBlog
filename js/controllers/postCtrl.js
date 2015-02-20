
	app.controller('postCtrl', function($scope, $routeParams, $firebase){
		$scope.params = $routeParams;
	var ref = new Firebase('https://jhollaapp.firebaseio.com/')
	var sync = $firebase(ref.child("posts"));
	
	$scope.onlinePostes = sync.$asArray();
	$scope.postText = "";

	var SavePosts = function(){
		$scope.onlinePostes.$save();
	};
	$scope.addPost = function(){
		var d = new Date();	
		if(($scope.user !=null) && ($scope.postText !=null) &&($scope.title !=null)){
		$scope.onlinePostes.$add({title : $scope.title, user: $scope.user, text: $scope.postText, date: d});
		$scope.user = null;
		$scope.postText = null;
		$scope.title = null;
		alert('your post was succesful! click View Posts if you want to see it!');
		SavePosts();
	}
	else{
		alert("no. stop it.");
		$scope.user = null;
		$scope.postText = null;
		$scope.user = null;
		$scope.title = null;
		$scope.postText = null;
	}
	};

});