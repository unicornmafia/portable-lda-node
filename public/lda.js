function Lda($scope, $http) {
	$scope.snippet = '';
	$scope.simz = '';
	$scope.simList = []; //[{id:1, name: 'Template1', sim: 0.1}, {id:2, name: 'Another Template', sim:0.2}]
	$scope.selectedSim = {};
	$scope.selectedState = "notSelected";

	$scope.cell = {
		simmethod: "Cosine"
	};

	$scope.simmethod = [{
		name: "Cosine"
	}, {
		name: "Hellinger"
	}];

    $scope.onBlur = function(list) {
        $scope.lastSelected.selectedState = 'notSelected';
		console.log("FOOOOO")
    };

	$scope.setValue = function(list) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = '';
        }
        this.selectedState = 'selected';
        if ($scope.lastSelected != null){
            $scope.lastSelected.selectedState = 'notSelected';
        }
        $scope.lastSelected = this;


		$scope.selectedSim.id = list.id;
		$scope.selectedSim.name = list.name;
        $scope.selectedSim.sim = list.sim;
        //alert($scope.selectedSim.name)

        // Simple GET request example:
        $scope.snippet = '';

        $http({
            method: 'GET',
            url: 'http://127.0.0.1:1338/document/' + list.name,
            headers: {
                'Content-Type': 'text/plain'
            }

        }).then(function successCallback(response) {
            $scope.snippet = response.data;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert('Error retrieving document')
            $scope.snippet = "ERROR"
        });

	};

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
            $scope.simList = response.data;

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			alert('Error querying LDA server')
			$scope.snippet = "ERROR"
		});

	};



}