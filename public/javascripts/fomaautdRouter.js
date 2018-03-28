var fomaautdapp = angular.module('fomaautdapp', ['ngResource', 'ngRoute']);

fomaautdapp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
		})
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginController'		
		})
		.when('/signup', {
			templateUrl: 'partials/signup.html',
			controller: 'signupController'
		}).
		when('/logout', {
			templateUrl: 'partials/login.html',
			controller: 'logoutController'
		})
		.when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'registerController'
		})
		.when('/userdetails', {
			templateUrl: 'partials/userdetails.html',
			controller: 'userDetailsController'
		})
		.when('/update/', {
			templateUrl: 'partials/register.html',
			controller: 'updateController'	
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

fomaautdapp.factory('commonService', ['$window', function($window) {
	var _getUserDetails = function() {
	  	var token = $window.localStorage['mean-token'];
	  	var payload;
	  	if (token) {
	    	payload = token.split('.')[1];
	    	payload = window.atob(payload);
	    	return JSON.parse(payload);
	  	} 
	  	else {
	    	return null;
	  	}
	}
  	return {
	    set: function(key, value) {
	      $window.localStorage[key] = value;
	    },
	    get: function(key, defaultValue) {
	      return $window.localStorage[key] || defaultValue || false;
	    },
	    setObject: function(key, value) {
	      $window.localStorage[key] = JSON.stringify(value);
	    },
	    getUserDetails: _getUserDetails,
		isLoggedIn: function() {
		  	var user = _getUserDetails();
		  	console.log(user);		  	
		  	if (user) {
		    	return user.exp > Date.now() / 1000;
		  	} 
		  	else {
		    	return false;
		  	}
		},
	    remove: function(key){
	      $window.localStorage.removeItem(key);
	    },
	    clear: function(){
	      $window.localStorage.clear();
	    }
  	}
}]);

fomaautdapp.controller('headerController', ['$scope', '$resource', 'commonService', function($scope, $resource, commonService) {
	$scope.loggedin = false;            	
	if(commonService.isLoggedIn()) {
		var token = commonService.getUserDetails();
		var User = $resource('/api/authentication/');    
    	User.get({}, function(response) {            
        if(response != null && response.result != undefined && response.result != null) {
            $scope.username = token.username;
            $scope.loggedin = true;   
            $scope.liArray =  response.result;                                                   
        }
    });
    $scope.toggleItem = function(event) {    	
    	$(event.target.parentElement).toggleClass('open');    	   
    };       
	}
	else {
		$scope.loggedin = false;
	}    
}]);

fomaautdapp.controller('loginController', ['$scope', '$resource', '$window', 'commonService',function($scope, $resource, 
	$window, commonService) {
	$scope.credential = {
		username: '',
		password: ''
	};
	$scope.submitform = function () {		
		var Login = $resource('/api/authentication/login');
    	Login.save($scope.credential, function(response) {    		
    		if(response.success) {
    			commonService.set('mean-token', response.token);
    			$window.location.reload();
    			$window.location.href = response.redirecturl;    			
    		}
    		else {
    			alert(response.message);
    		};
    	});
	};
}]);

fomaautdapp.controller('signupController', ['$scope', '$resource', '$window', 'commonService', function($scope, $resource, 
	$window, commonService) {
	$scope.credential = {
		username: '',
		email: '',
		password: ''
	};
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
    $scope.submitform = function() {
    	var Signup = $resource('/api/authentication/signup');
    	Signup.save($scope.credential, function(response) {
    		if(response.success) {
    			commonService.set('mean-token', response.token);
    			$window.location.reload();
    			$window.location.href = '/#/register';
    		}
    		else {

    		};
    	});
    };
}]);

fomaautdapp.controller('logoutController', ['$scope', '$resource', '$window', 'commonService', function($scope, $resource, 
	$window, commonService) {
	var Logout = $resource('/api/authentication/logout');
	Logout.get({}, function(response) {
		if(response.success) {
			commonService.remove('mean-token');			
		}		
		$window.location.reload();
		$window.location.href="/#/login";
	});
}]);

fomaautdapp.controller('registerController', ['$scope', '$resource', '$window', 'commonService', 
	function($scope, $resource, $window, commonService) {
	if(commonService.isLoggedIn()) {
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
			user: commonService.getUserDetails(),
			firstname: '',
			lastname: '',
			sex: '',
			dob: '',
			dateofjoining: '',
			jobtype: '',
			domain: '',
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
			race: '',		
			veteran: '',					
			disability: '',		
			linkedin: '',
			portfolio: ''	
		}
		loadIntakes = function() {
			var intakes = $resource('/api/register/intakes');
			intakes.query(function(response){
				$scope.intakes = response;
			});
		}
		loadStates = function() {		
			var states = $resource('/api/register/states');
			states.query(function(response){
				$scope.states = response;
			});
		}
		loadDegrees = function() {		
			var degrees = $resource('/api/register/degrees');
			degrees.query(function(response){
				$scope.degrees = response;
			});
		}
		loadMajors = function() {		
			var majors = $resource('/api/register/majors');
			majors.query(function(response){
				$scope.majors = response;
			});
		}	
		loadIntakes();
		loadStates();
		loadDegrees();
		loadMajors();
		$scope.disabilityValues = ['Yes, I have a disability (or previously had a disability)', 
			'No, I Don’t have a disability', 'I Don’t wish to answer'];
		$scope.veteranValues = ['I am not a veteran', 'Disabled veteran', 'Recently separated veteran', 
			'Active wartime or campaign badge veteran', 'Armed forces service medal veteran', 'I am NOT a protected veteran', 
			'I choose not to identify my veteran status'];
		$scope.raceValues = ['Hispanic or Latino', 'American Indian or Alaska Native', 'Asian', 'Black or African American', 
		'Native Hawaiian or Other Pacific Islander', 'White'];		
		$scope.register = function() {
			var users = $resource('/api/register/adduser');
			users.save($scope.userDetails, function(response) {
				if(response.success) {
					var userRegister = $resource('/api/authentication/update');
					userRegister.save({}, function(response1) {
						if(response1.success) {
							alert(response1.message);
							$window.location.href = '/#/userdetails';
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
	}
	else {
		alert('Please signup/login to add Student details');
	}	
}]);

fomaautdapp.controller('userDetailsController', ['$scope', '$resource', 'commonService', 
	function($scope, $resource, commonService) {
	if(commonService.isLoggedIn()) {
		var token = commonService.getUserDetails();
		var user = $resource('/api/userdetails/:id');
		user.get({id: token._id}, function(resp) {
			if(resp.success) {
				$scope.studentDetail = resp.user;
			}				
		});
	}
	else {
		alert('Please login to view the details');
	}		
}]);

fomaautdapp.controller('updateController', ['$scope', '$resource', '$window', 'commonService', 
	function($scope, $resource, $window, commonService) {
	if(commonService.isLoggedIn()) {
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
		loadIntakes = function() {
			var intakes = $resource('/api/register/intakes');
			intakes.query(function(response){
				$scope.intakes = response;
			});
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
		loadIntakes();
		loadStates();
		loadDegrees();
		loadMajors();
		var token = commonService.getUserDetails();
		var user = $resource('/api/userdetails/:id');
		user.get({id: token._id}, function(resp) {
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
			$window.location.href = '/#/userdetails';
		}	
	}
	else {
		alert('Please signup/login to add Student details');
	}	
}]);