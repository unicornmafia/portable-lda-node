function Lda($scope, $http) {
	$scope.snippet = '';
	$scope.simz = '';

	$scope.cell = {
		simmethod: "Cosine"
	};

	$scope.simmethod = [{
		name: "Cosine"
	}, {
		name: "Hellinger"
	}];

	$scope.get_sim_method = function () {
		return $scope.simmethod;
	};

	$scope.get_sims = function() {
		// Simple GET request example:
		$scope.snippet = '';
		var terms = $scope.simz.split(/[ ,]+/);

		$http({
			method: 'POST',
			url: 'http://127.0.0.1:1338/get-term-sim',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {"terms": terms, "simmethod": $scope.cell.simmethod}

		}).then(function successCallback(response) {
			$scope.snippet = response.data;

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			alert('Error querying LDA server')
			$scope.snippet = "ERROR"
		});

	};



}