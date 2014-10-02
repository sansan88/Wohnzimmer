angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
	$http.get('http://sandroscalco.dyndns.org:3000').then(function(resp) {
    $scope.conditions = resp.data.temperatur;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })

});