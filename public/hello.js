function Hello($scope, $http) {
    //$http.get('http://localhost:8001/test').
    //    success(function(data) {
    //        $scope.greeting = data;
    //    });

    // Simple GET request example:
	$http({
	  method: 'GET',
	  url: 'http://localhost:1337/test',
	  headers: {
	   	'Content-Type': 'application/json'
	  },
	}).then(function successCallback(response) {
	    $scope.greeting = response.data;
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    alert('damn')
	  }); 
}