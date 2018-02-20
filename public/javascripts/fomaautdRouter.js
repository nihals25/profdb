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
    User.get({}, function(response) {            
        if(response != null && response.result != undefined && response.result != null && 
        	response.username != undefined && response.username != null && response.username != '') {
            $scope.username = response.username;
            $scope.loggedin = true;   
            $scope.liArray =  response.result;                                                   
        }
    });
    $scope.toggleItem = function(event) {    	
    	$(event.target.parentElement).toggleClass('open');    	   
    };        
}]);

fomaautdapp.controller('signupController', ['$scope', '$resource', function($scope, $resource) {

}]);

fomaautdapp.controller('registerController', ['$scope', '$resource', '$window', function($scope, $resource, $window) {	
	$scope.userDetails = {
		firstname: '',
		lastname: '',
		sex: '',
		dob: '',
		dateofjoining: '',
		jobtype: '',
		visastatus: '',
		streetaddress: '',
		apthousenumber: '',
		city: '',
		state: '',
		zipcode: '',
		mobile: '',	
		email: '',		
		degree: '',
		major: '',
		gpa: '',
		graddate: '',	
		position: '',
		company: '',
		years: '',						
		disability: '',
		veteran: '',
		linkedin: '',
		portfolio: ''	
	}
	$scope.register = function() {
		var users = $resource('/api/register/adduser');
		users.save($scope.userDetails, function(response) {
			if(response.success) {
				alert(response.message);
				$window.location.href = '/#/home';
			}
			else {
				alert(response.message);
			}
		});
	}
}]);