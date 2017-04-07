var bookApp = angular.module('bookApp', ['ngRoute']);

bookApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : '../catalog.html',
        controller : 'bookController'
    })
    .when('/about', {
        templateUrl : '../about.html'
    })
});

bookApp.controller('menuBarController', function ($scope) {
	$scope.homeClass = 'active';
	$scope.aboutClass = '';

	$scope.refreshPage = function () {
		location.reload();
	}

	$scope.toHome = function() {
		$scope.homeClass = 'active';
		$scope.aboutClass = '';
	}

	$scope.toAbout = function() {
		$scope.homeClass = '';
		$scope.aboutClass = 'active';
	}
});

bookApp.controller('bookController' ,function ($scope, $http) {
	function initBooklist () {
		$http.get('/booklist').then(function (res) {
			console.log('received data from server');
			$scope.booklist = res.data;
		});
	}

	initBooklist();

	$scope.showBook = function(bookID) {
		$http.get('/'+bookID).then(function (res) {	
			$scope.aBook = res.data[0];
		});
	}

	$scope.add = function(aBook) {
		$http.post('/add', {data: aBook}).then(function (res) {		
			initBooklist();
		});
	}

	$scope.update = function(aBook) {
		$http.put('/id', {data: aBook}).then(function (res) {		
			initBooklist();
		});
	}

	$scope.delete = function(bookID) {
		if (confirm('do you want to delete?')==true) {
			$http.delete('/'+bookID).then(function (res) {		
			initBooklist();
			});
		}
	}

	$scope.search = function() {
		if ((typeof($scope.find)!='undefined') && ($scope.find!='')) {
			$http.get('/findbook/'+$scope.find).then(function (res) {	
				$scope.booklist = res.data;
			});
		}
		else {
			initBooklist();
		}
	}

	$scope.showAddModal = function() {
		$scope.aBook = {
			'title': '',
			'author': '',
			'cover': ''
		};
	}
});