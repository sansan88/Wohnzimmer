angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
	$scope.conditions = "..updating..";
  $scope.doRefreshDash = function() {
 	$http.get('http://sandroscalco.dyndns.org:3000').then(function(resp) {
    $scope.conditions = resp.data.temperatur;
	  }, function(err) {
			$scope.conditions = "-";
	    //console.error('ERR', err);
	    // err.status will contain the status code
	  }); // end get
 	};
	$scope.doRefreshDash();
})


.controller('SchweizCtrl', function($scope, $http) {
	//init
	$scope.wetterdaten = [];

	$scope.doRefreshMesswerte = function() {
		$http.jsonp('http://sandroscalco.dyndns.org:3000/wetterdaten/ch/?callback=JSON_CALLBACK')
		.success(function(data){
			$scope.wetterdaten_schweiz = JSON.parse(JSON.parse(data));
			console.log("gelesene Daten von server: " + $scope.wetterdaten_schweiz.length);

		})
		.finally(function() {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.doRefreshMesswerte();
})


.controller('WebcamCtrl', function($scope, $http) {

	$scope.doRefreshWebcam = function(){
		$http.get('http://sandroscalco.dyndns.org:3000/camera').then(function(resp) {
			$scope.webcam = resp.data;
			$scope.$broadcast('scroll.refreshComplete');
		}, function(err) {
			//console.error('ERR', err);
			// err.status will contain the status code
		});
	};
	$scope.doRefreshWebcam();
});
