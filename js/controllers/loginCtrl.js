app.controller('loginCtrl', function($scope, $routeParams, $firebase, $firebaseSimpleLogin){


	$scope.openPage = true;
	$scope.signUp = false;
	$scope.login = true;
	$scope.loginDiv = true;
	$scope.topDiv= false;

	

	$scope.Register = function(){
		$scope.login = false;
		$scope.signUp = true; 
	}
		$scope.signInInstead = function(){
		$scope.login = true;
		$scope.signUp = false;
	}

var ref = new Firebase('https://jhollaapp.firebaseio.com/'); // url for firebase database


	var loginObj = $firebaseSimpleLogin(ref, function(error,user){
		if(error){
			console.log(error);
			return;
		}
		else if (user){
			$scope.SignIn(user);
		}
		else{
			showLoginBox();
		}
	});

	$scope.RegisterAccount = function(){
		var email = $scope.user1.email;
		var password = $scope.user1.password;
		loginObj.$createUser(email,password).then(function(user){
			var userSync = $firebase(ref.child("user")); 
			var uid = user.uid; 
			var userInfo = {
				userId: uid,
				userRole: 1, 
				date: Firebase.ServerValue.TIMESTAMP,
				userEmail: $scope.user1.email,

			}
			userSync.$set(user.uid, userInfo);
			$scope.login= true;
			$scope.signUp= false;
			alert("Your account has been created using the email address " + userInfo.userEmail + "! Now sign in!");
		});
	}

	$scope.SignIn = function(event){
		var username = $scope.user.email;
		var password = $scope.user.password;
		loginObj.$login('password', {
			email: username,
			password: password
		})
		.then(function(user){
			$scope.login= false; 
			$scope.openPage = false;
			$scope.secondBtn = true;
			$scope.topDiv = true;
			$scope.loginDiv = false; 
			remember: "sessionOnly"
			console.log("Authentication of " + user.uid + " successful");
			var userId = user.uid;
			$scope.userId = userId;



			}, function(error){
			console.log('Authentication failure');
		})
	};


});

