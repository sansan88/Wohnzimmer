angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $ionicLoading) {
	$scope.conditions = "..updating..";
  $scope.doRefreshDash = function() {
		$ionicLoading.show({
			template: 'loading'
		})
	 	$http.get('http://sandroscalco.dyndns.org:3000').then(function(resp) {
	    $scope.conditions = resp.data.temperatur;
		  }, function(err) {
				$scope.conditions = "-";
				$ionicLoading.hide();
		    //console.error('ERR', err);
		    // err.status will contain the status code
		  }); // end get
			$ionicLoading.hide();
 	};
	$scope.doRefreshDash();
})


.controller('SchweizCtrl', function($scope, $http, $ionicLoading) {
	//init
	$scope.wetterdaten = [];

	$scope.doRefreshMesswerte = function() {
		$ionicLoading.show({
			template: 'loading'
		})
		$http.jsonp('http://sandroscalco.dyndns.org:3000/wetterdaten/ch/?callback=JSON_CALLBACK')
		.success(function(data){
			$scope.wetterdaten_schweiz = JSON.parse(JSON.parse(data));
			console.log("gelesene Daten von server: " + $scope.wetterdaten_schweiz.length);

		})
		.finally(function() {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
			$ionicLoading.hide();
		});
	};
	$scope.doRefreshMesswerte();
})

.controller('WebcamCtrl', function($scope, $http, $ionicLoading) {


	$scope.doRefreshWebcam = function(){

		$ionicLoading.show({
			template: 'loading'
		})
		$http.jsonp('http://sandroscalco.dyndns.org:3000/camera/?callback=JSON_CALLBACK')
		.success(function(data){
			//var camobj = JSON.parse(data);
			$scope.webcam = "data:image/jpg;base64," + data.image;//camera;
			window.localStorage.setItem("image", data.image);
		})
		.finally(function() {
			$ionicLoading.hide();
			// Stop the ion-refresher from spinning
		//	$scope.$broadcast('scroll.refreshComplete');
		});
	};

	if ( $scope.webcam === undefined ){
		if (window.localStorage.getItem("image") === null){
			$scope.doRefreshWebcam();
		}else{
			$scope.webcam = "data:image/jpg;base64," + window.localStorage.getItem("image");
		}
	}

});
