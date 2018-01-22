var fomaautdapp = angular.module('fomaautdapp', ['ngResource', 'ngRoute']);

fomaautdapp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
		})
		.when('/login', {
			templateUrl: 'partials/login.html'		
		})
		.when('/register', {
			templateUrl: 'partials/signup.html',
			controller: 'signupController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

fomaautdapp.controller('signupController', ['$scope', '$resource', function($scope, $resource) {
	var counter = 1;
	$scope.workExpCount = [1];	
	$scope.addworkexperience = function () {
		$scope.workExpCount.push(++counter);
	};
	$scope.workExp;
}]);