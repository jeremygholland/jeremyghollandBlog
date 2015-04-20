
	// super simple service
	// each function returns a promise object 
	app.factory('posts', ['$http', function($http) {
		return {
			get: function() {
				return $http.get('/api/posts');
			},
			create: function(postData) {
				return $http.post('/api/posts', postData);
			},
			delete: function(id) {
				return $http.delete('/api/posts/' + id);
			}
		}
	}]);