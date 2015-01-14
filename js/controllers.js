angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $ionicLoading, User) {
	var user = User.getUser();
	$scope.dash = "..updating..";
  $scope.doRefreshDash = function() {
		$ionicLoading.show({
			template: 'loading'
		})

		$http.jsonp('http://sandroscalco.dyndns.org:3000/wohnzimmer/temp/?callback=JSON_CALLBACK&access_token='  +user.password)
		.success(function(data){
			$scope.dash = data;
			console.log("gelesene Daten von server: " + JSON.stringify($scope.dash));

		})
		.error(function(){
			console.log("error");
		})
		.finally(function() {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
			$ionicLoading.hide();
		});
 	};
	$scope.doRefreshDash();
})


.controller('SchweizCtrl', function($scope, $http, $ionicLoading, User) {
	var user = User.getUser();
	$scope.wetterdaten = [];

	$scope.doRefreshMesswerte = function() {
		$ionicLoading.show({
			template: 'loading'
		})
		$http.jsonp('http://sandroscalco.dyndns.org:3000/wetterdaten/ch/?callback=JSON_CALLBACK&access_token=' + user.password)
		.success(function(data){
			$scope.wetterdaten_schweiz = JSON.parse(JSON.parse(data));
			console.log("gelesene Daten von server: " + $scope.wetterdaten_schweiz.length);

		})
		.error(function(){
			console.log("error");
		})
		.finally(function() {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
			$ionicLoading.hide();
		});
	};
	$scope.doRefreshMesswerte();
})

.controller('WebcamCtrl', function($scope, $http, $ionicLoading, User) {
	var user = User.getUser();

	$scope.doRefreshWebcam = function(){

		$ionicLoading.show({
			template: 'loading'
		})
		$http.jsonp('http://sandroscalco.dyndns.org:3000/camera/?callback=JSON_CALLBACK&access_token=' + user.password)
		.success(function(data){
			//var camobj = JSON.parse(data);
			$scope.webcam = "data:image/jpg;base64," + data.image;//camera;
			window.localStorage.setItem("image", data.image);
		})
		.error(function(){
			console.log("error");
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

})

.controller('SettingsCtrl', function($scope, $http, $ionicLoading, User) {

	$scope.user = User.getUser();
	$scope.saveUser = function(){
		if ($scope.user.username !== null){
			window.localStorage.setItem("username", $scope.user.username); //sollte auch in store..
		}

		if ($scope.user.password !== null){
			window.localStorage.setItem("password", $scope.user.password); //sollte auch in store..
		}
	}

	$scope.saveUser();

});
