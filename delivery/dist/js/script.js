var app = angular.module("deliveryApp", []);

app.controller("deliveryCtrl", [ '$scope', '$timeout', function($scope, $timeout) {
	var $today = new Date();
	$('#deliveryDate').pickadate({
		format: 'dddd, dd mmmm, yyyy',
		formatSubmit: 'dd-mm-yyyy',
		today: '',
		clear: '',
		min: new Date(),
		disable: [1],
		onClose: function() {
			console.log(this)
		}
	});
	////moment($today).add(1, 'day').format('DD MMM YYYY')
	///default values 
	$scope.contactService = "CSL Behring Customer Service";
	$scope.contactEmail = "wedeliver@cslbehring.com.au";
	$scope.phoneNumber = "1800 063 892";
	///$scope.contactService = "";
	
	$scope.auStates = {
		'act': 'Australian Capital Territory',
		'nt': 'Northern Territory',
		'qld': 'Queensland',
		'sa': 'South Australia',
		'tas': 'Tasmania',
		'vic': 'Victoria',
		'wa': 'Western Australia'
	}
	$scope.deliveryTimes = {
		'1': ['12pm – 4pm', '5pm – 9pm'],
		'2': ['8am – 12pm', '12pm – 4pm', '5pm – 9pm'],
		'3': ['8am – 12pm', '12pm – 4pm', '5pm – 9pm'],
		'4': ['8am – 12pm', '12pm – 4pm', '5pm – 9pm'],
		'5': ['8am – 12pm', '12pm – 4pm'],
		'6': ['8am – 12pm']
	}
	
	$timeout( function(){
		$(".chosen-select").chosen({ disable_search_threshold: 10 });
	}, 300);
	
	$scope.startDateChanged = function(d) {
		$scope.availableTimes = $scope.deliveryTimes[(new Date(d)).getDay()];
		console.log((new Date(d)).getDay());
	}
	
	///console.log(moment($today).add(1, 'day').format('DD MMM YYYY') );

	
}])