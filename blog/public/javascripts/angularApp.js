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
			});
			$urlRouterProvider.otherwise('home');

	}]);


app.factory('posts', ['$http', function($http){
	var o = {
		posts: []
	};
	o.getAll = function() {
   	 return $http.get('/blogPosts').success(function(data){
    	  angular.copy(data, o.posts);
   		 });
  };
	o.create = function(post){
		return $http.post('/blogPosts', post).success(function(data){
			o.posts.push(data);
		});
	};
		o.get = function(id) {
  			return $http.get('/blogPosts/' + id).then(function(res){
    		return res.data;
  			});
		};

	return o;

}])


app.controller('mainCtrl', ['$scope', 'posts', function($scope, posts){
	$scope.test = "this works.";

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
  'posts',
  'post',
  function($scope, posts, post){
   $scope.posts = post;
   console.log($scope.posts.title);
 
     }]);