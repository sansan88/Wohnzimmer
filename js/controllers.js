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


	if ($scope.dash != true){
		$scope.doRefreshDash();
	}

})


.controller('SchweizCtrl', function($scope, $http, $ionicLoading, User, Stationen, Wetterdaten) {
	var user = User.getUser();
	var stationen = Stationen.getStationen();

		$scope.doRefreshMesswerte = function() {
		$ionicLoading.show({
			template: 'loading'
		})
		$http.jsonp('http://sandroscalco.dyndns.org:3000/wetterdaten/ch/?callback=JSON_CALLBACK&access_token=' + user.password)
		.success(function(data){
			$scope.wetterdaten_schweiz = JSON.parse(JSON.parse(data));
			Wetterdaten.setWetterdaten($scope.wetterdaten_schweiz);

			for (var i=0; i < $scope.wetterdaten_schweiz.length; i++){
				for (var j=0; j < stationen.length; j++){
					try{
						if ( $scope.wetterdaten_schweiz[i].stn === stationen[j].stn){
								$scope.wetterdaten_schweiz[i].station = stationen[j];
								break;
			  		}
					}catch(e){
						continue;
					};
				}

			}

			console.log("gelesene Daten von server: " + $scope.wetterdaten_schweiz.length);

			$scope.datum = $scope.wetterdaten_schweiz[0].time.slice(0,8);
			$scope.uhrzeit = $scope.wetterdaten_schweiz[0].time.slice(8,16);

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

	if (Wetterdaten.getWetterdaten != true){

		$scope.doRefreshMesswerte();

	}

})


.controller('StationenDetailCtrl', function($scope, $http, $ionicLoading, $stateParams, Stationen, Wetterdaten) {
	$scope.station = Stationen.getStation($stateParams.stn);
	var wetterdaten = Wetterdaten.getWetterdaten();
	try{

	for (var i=0; i < wetterdaten.length; i++){
			if ( wetterdaten[i].stn === $scope.station.stn){
				$scope.station.wetterdaten = wetterdaten[i];
				break;
			}
		}

	}catch(e){

	}

		var output = document.getElementById("map");

		var lat1 = "";
		var long1 = "";
		var long = "";
		var lat = "";
		if ($scope.station.laenge_breite.charAt(2) === "°"){ // 	"10°17'/46°48'"
			lat1  = $scope.station.laenge_breite.slice(7,9) + ".";
			lat = 100/60*$scope.station.laenge_breite.slice(10,12)*100; //46..
			long1 = $scope.station.laenge_breite.slice(0,2) + ".";
			long = 100/60*$scope.station.laenge_breite.slice(3,5)*100; //46..; //10
		}else{ // 	"8°17'/46°48'"
			lat1  = $scope.station.laenge_breite.slice(6,8) + ".";
			lat = 100/60*$scope.station.laenge_breite.slice(9,11)*100; //46.
			long1 = $scope.station.laenge_breite.slice(0,1) + ".";
			long = 100/60*$scope.station.laenge_breite.slice(2,4)*100; //8
		}

		lat = lat.toString();
		long = long.toString();

		var latitude = lat1 + lat.slice(0,4);
		var longitude = long1 + long.slice(0,4);

		if (latitude === undefined){
			output.innerHTML = 'Keine Positionsdaten erfasst.';
		}else{
			//output.innerHTML = '<p>Position ist ' + latitude + '° ' + longitude + '°</p>';
			var img = new Image();
			img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
			output.appendChild(img);
		}

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
			window.localStorage.setItem("image", null);
			window.localStorage.setItem("image", data.image);
		})
		.error(function(){
			console.log("error webcam");
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
