var fomaautdapp = angular.module('fomaautdapp', ['ngResource', 'ngRoute']);

fomaautdapp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
		})
		.when('/login', {
			templateUrl: 'partials/login.html'		
		})
		.when('/signup', {
			templateUrl: 'partials/signup.html',
			controller: 'signupController'
		})
		.when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'registerController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

fomaautdapp.controller('headerController', ['$scope', '$resource', function($scope, $resource) {
	$scope.loggedin = false;            
    var User = $resource('/api/authentication');
    User.get({}, function(user) {            
        if(user.user != null && user.user.username != undefined && user.user.username != null && user.user.username != '') {
            $scope.username = user.user.username;
            $scope.loggedin = true;                                                       
        }
    });        
}]);

fomaautdapp.controller('signupController', ['$scope', '$resource', function($scope, $resource) {

}]);

fomaautdapp.controller('registerController', ['$scope', '$resource', function($scope, $resource) {

}]);