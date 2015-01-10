angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
	$http.get('http://sandroscalco.dyndns.org:3000').then(function(resp) {
    $scope.conditions = resp.data.temperatur;
	  }, function(err) {
	    console.error('ERR', err);
	    // err.status will contain the status code
	  })

 $scope.refresh = function() {
 	$http.get('http://sandroscalco.dyndns.org:3000/').then(function(resp) {
    $scope.conditions = resp.data.temperatur;
	  }, function(err) {
	    console.error('ERR', err);
	    // err.status will contain the status code
	  })
 };
})


.controller('SchweizCtrl', function($scope, $http) {
	//init
	$scope.wetterdaten = [];

	$http.jsonp('http://sandroscalco.dyndns.org:3000/wetterdaten/ch/?callback=JSON_CALLBACK')
	.success(function(data){
		$scope.wetterdaten_schweiz = JSON.parse(JSON.parse(data));
		console.log("gelesene Daten von server" + $scope.wetterdaten_schweiz.length);
	})
	.finally(function(){
		//
	});


	$scope.doRefresh = function() {
		$http.jsonp('http://sandroscalco.dyndns.org:3000/wetterdaten/ch/?callback=JSON_CALLBACK')
		.success(function(data){
			$scope.wetterdaten_schweiz = JSON.parse(JSON.parse(data));
			console.log("gelesene Daten von server" + $scope.wetterdaten_schweiz.length);

		})
		.finally(function() {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
		});;
	};
});
