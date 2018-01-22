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