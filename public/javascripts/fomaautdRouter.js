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
		.when('/userdetails/:id', {
			templateUrl: 'partials/userdetails.html',
			controller: 'userDetailsController'
		})
		.when('/update/:id', {
			templateUrl: 'partials/register.html',
			controller: 'updateController'	
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

fomaautdapp.controller('headerController', ['$scope', '$resource', function($scope, $resource) {
	debugger;
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
	$scope.validateUserName = function(){
        $scope.userexistsmessage = false;
        var reg = /^\w+$/;
        if(!reg.test($('[name="username"]').val())) {            
            $scope.usernamemessagetxt = 'Username can only contain letters, numbers and underscores';
            $scope.userexistsmessage = true;              
            signupForm.username.focus();
        }
        else {
            var User = $resource('/api/authentication/userexists');
            User.save({username:$('[name="username"]').val()}, function(response) {
                if(response.result) {                    
                    $scope.usernamemessagetxt = 'Username already exists';
                    $scope.userexistsmessage = true;                    
                    signupForm.username.focus();
                }
                else {
                    $scope.userexistsmessage = false;
                }                                    
            });
        }                        
    };
}]);

fomaautdapp.controller('registerController', ['$scope', '$resource', '$window', function($scope, $resource, $window) {
	var wExpCounter = 0;
	$scope.updateForm = false;	
	$scope.workExperience = [];
	$scope.addWorkExperience = function () {
		wExpCounter+=1;
		var wrkEx = {
			number: wExpCounter,
			position: '',
			company: '',
			from: '',
			to: ''
		}
		$scope.workExperience.push(wrkEx);
	};
	$scope.removeWorkExperience = function () {
		wExpCounter-=1;
		$scope.workExperience.pop(); 
	}
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
		newdegree: '',
		major: '',
		newmajor: '',
		gpa: '',
		graddate: '',
		workexperience: $scope.workExperience,								
		disability: '',
		veteran: '',
		linkedin: '',
		portfolio: ''	
	}
	loadStates = function() {		
		var states = $resource('/api/register/states');
		states.query(function(response){
			$scope.states = response;
		});
	}
	loadDegrees = function() {		
		var states = $resource('/api/register/degrees');
		states.query(function(response){
			$scope.degrees = response;
		});
	}
	loadMajors = function() {		
		var states = $resource('/api/register/majors');
		states.query(function(response){
			$scope.majors = response;
		});
	}
	loadStates();
	loadDegrees();
	loadMajors();
	$scope.disabilityValues = ['Yes, I have a disability (or previously had a disability)', 
		'No, I Don’t have a disability', 'I Don’t wish to answer'];
	$scope.veteranValues = ['I am not a veteran', 'Disabled veteran', 'Recently separated veteran', 
		'Active wartime or campaign badge veteran', 'Armed forces service medal veteran', 'I am NOT a protected veteran', 
		'I choose not to identify my veteran status'];
	$scope.register = function() {
		var users = $resource('/api/register/adduser');
		users.save($scope.userDetails, function(response) {
			if(response.success) {
				var userRegister = $resource('/api/authentication/update');
				userRegister.save({}, function(response1) {
					if(response1.success) {
						alert(response1.message);
						$window.location.href = '/#/userdetails/' + response.id;
					}
					else {
						alert(response1.message);
					}
				});				
			}
			else {
				alert(response.message);
			}
		});
	}
}]);

fomaautdapp.controller('userDetailsController', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams) {	
	var user = $resource('/api/userdetails/:id');
	user.get({id: $routeParams.id}, function(resp) {
		if(resp.success) {
			$scope.studentDetail = resp.user;
		}
		else {
			alert(resp.message);
		}		
	});
}]);

fomaautdapp.controller('updateController', ['$scope', '$resource', '$routeParams', '$window', function($scope, $resource, $routeParams, $window) {
	$scope.updateForm = true;
	$scope.workExperience = [];
	$scope.addWorkExperience = function () {
		wExpCounter+=1;
		var wrkEx = {
			number: wExpCounter,
			position: '',
			company: '',
			from: '',
			to: ''
		}
		$scope.workExperience.push(wrkEx);
	};
	$scope.removeWorkExperience = function () {
		wExpCounter-=1;
		$scope.workExperience.pop(); 
	}	
	loadStates = function() {		
		var states = $resource('/api/register/states');
		states.query(function(response){
			$scope.states = response;
		});
	}
	loadDegrees = function() {		
		var states = $resource('/api/register/degrees');
		states.query(function(response){
			$scope.degrees = response;
		});
	}
	loadMajors = function() {		
		var states = $resource('/api/register/majors');
		states.query(function(response){
			$scope.majors = response;
		});
	}
	loadStates();
	loadDegrees();
	loadMajors();
	var user = $resource('/api/userdetails/:id');
	user.get({id: $routeParams.id}, function(resp) {
		if(resp.success) {
			$scope.userDetails = resp.user;
			angular.forEach(resp.user.workexperience, function(value, key) {			
				value.from = new Date(value.from);
				value.to = new Date(value.to);
			});
			$scope.workExperience = resp.user.workexperience;
			$scope.userDetails.dob = new Date($scope.userDetails.dob);
			$scope.userDetails.dateofjoining = new Date($scope.userDetails.dateofjoining);
			$scope.userDetails.graddate = new Date($scope.userDetails.graddate);
		}
		else {
			alert(resp.message);
		}			
	});
	$scope.back = function() {
		$window.location.href = '/#/userdetails/' + $routeParams.id;
	}	
}]);