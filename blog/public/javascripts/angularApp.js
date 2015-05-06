var app = angular.module('app', [ 'textAngular', 'ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				controller: 'mainCtrl',
				url: '/home',
				templateUrl: '/home.html',
				resolve: {
   		 postPromise: ['posts', function(posts){
      return posts.getAll();
        }]
				}
			})
			.state('post', {
				controller: 'PostsCtrl',
				url: '/posts/{id}', 
				templateUrl: '/post.html',
				resolve: {
				post: ['$stateParams', 'posts', function($stateParams, posts) {
      return posts.get($stateParams.id);
   				 }]
   				}
 				 })

			.state('addPost', {
				controller: 'mainCtrl',
				url:'/addPost',
				templateUrl: '/addPost.html',
			})
			.state('login', {
				url: '/login',
				templateUrl: '/login.html',
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if( auth.isLoggedIn()){
						$state.go('home');
					}
				}]
			})
			.state('register', {
				url: '/register',
				templateUrl: '/register.html',
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if(auth.isLoggedIn()){
						$state.go('home');
					}
				}]
			})
			$urlRouterProvider.otherwise('home');

	}]);


app.factory('posts', ['$http', 'auth', function($http, auth){
	var o = {
		posts: []
	};
	o.getAll = function() {
   	 return $http.get('/blogPosts').success(function(data){
    	  angular.copy(data, o.posts);
   		 });
  };
	o.create = function(post){
		return $http.post('/blogPosts', post, {
			headers: {Authorization: 'Bearer ' +auth.getToken()}
		}).success(function(data){
			o.posts.push(data);
		});
	};
		o.get = function(id) {
  			return $http.get('/blogPosts/' + id).then(function(res){
    		return res.data;
  			});
		};
		o.getComments = function(id){
			return $http.get('/blogPosts/' + id + '/comments').then(function(res){
				return res.data;
			});
		};
		  o.addComment = function(id, comment) {
  return $http.post('/blogPosts/' + id + '/comments', comment, {
  	headers: {Authorization: 'Bearer ' +auth.getToken()}
  });
}
	return o;

}])

app.factory('auth', ['$http', '$window', function($http, $window){
	var auth = {};

	auth.saveToken = function(token){
		$window.localStorage['blog-token'] = token;
	};

	auth.getToken = function(){
		return $window.localStorage['blog-token'];
	}

	auth.isLoggedIn = function(){
  var token = auth.getToken();

  if(token){
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

auth.currentUser = function(){
  if(auth.isLoggedIn()){
    var token = auth.getToken();
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.username;
  }
};

auth.register = function(user){
  return $http.post('/register', user).success(function(data){
    auth.saveToken(data.token);
  });
};

auth.logIn = function(user){
  return $http.post('/login', user).success(function(data){
    auth.saveToken(data.token);
  });
};

auth.logOut = function(){
  $window.localStorage.removeItem('blog-token');
};

	return auth;
}])


app.controller('mainCtrl', ['$scope', 'auth', 'posts', function($scope, auth, posts){
	$scope.test = "this works.";
	$scope.isLoggedIn = auth.isLoggedIn;

	$scope.posts = [];
	$scope.posts = $scope.posts.concat(posts.posts);
	$scope.addPost = function(){
		if(!($scope.title == '') && !($scope.body == '') && !($scope.author == '')){
		posts.create({
			title: $scope.title,
			body: $scope.body,
			author: $scope.author
		})
		$scope.title ='';
		$scope.body = '';
		$scope.author ='';
	}
	$scope.posts =posts.posts;
	console.log($scope.posts);
	}
}]);

app.controller('PostsCtrl', [
  '$scope',
  'auth',
  'posts',
  'post',
  function($scope, auth, posts, post){
  	$scope.isLoggedIn = auth.isLoggedIn;
   $scope.posts = post;

   $scope.addComment = function(){
  if($scope.body === '') { return; }
  posts.addComment( post._id, {
    body: $scope.body,
    author: $scope.author,
  }).success(function(comment) {
    $scope.posts.comments.push(comment);
  });
  $scope.body = '';
  $scope.author = '';
};
 
     }]);



app.controller('AuthCtrl', [
	'$scope',
	'$state',
	'auth',
	function($scope, $state, auth){
		$scope.user = {};

		$scope.register = function(){
			auth.register($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
			});
		};
		$scope.logIn = function(){
			auth.logIn($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
			});
		};
	}])

app.controller('NavCtrl', [
	'$scope',
	'auth',
	function($scope, auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logOut;
	}]);
