function Lda($scope, $http) {
	$scope.simz = 'foo bar dog cat';
	$scope.simList = []; //[{id:1, name: 'Template1', sim: 0.1}, {id:2, name: 'Another Template', sim:0.2}]
	$scope.selectedSim = {};
	$scope.selectedState = "notSelected";
	$scope.doctext = "";

	$scope.cell = {
		simmethod: "Cosine"
	};

	$scope.simmethod = [{
		name: "Cosine"
	}, {
		name: "Hellinger"
	}];

    $scope.gooddocs = [];

    $scope.baddocs = [];

    $scope.onBlur = function(list) {
        $scope.lastSelected.selectedState = 'notSelected';
    };


    $scope.plusoneclick = function(list) {
        $scope.removeFrom(list.name, $scope.gooddocs);
        $scope.removeFrom(list.name, $scope.baddocs);
        $scope.gooddocs.push({name: list.name});
    };

    $scope.minusoneclick = function(list) {
        $scope.removeFrom(list.name, $scope.gooddocs);
        $scope.removeFrom(list.name, $scope.baddocs);
        $scope.baddocs.push({name: list.name});
    };

    $scope.zeroclick = function(list) {
        $scope.removeFrom(list.name, $scope.gooddocs);
        $scope.removeFrom(list.name, $scope.baddocs);
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
        $scope.doctext = '';

        $http({
            method: 'GET',
            url: 'http://127.0.0.1:1338/document/' + list.name,
            headers: {
                'Content-Type': 'text/plain'
            }

        }).then(function successCallback(response) {
            $scope.doctext = response.data;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert('Error retrieving document')
            $scope.doctext = "ERROR"
        });

	};

	$scope.get_sim_method = function () {
		return $scope.simmethod;
	};

	$scope.get_sims = function() {
		// Simple GET request example:
		$scope.doctext = '';
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
			$scope.doctext = "ERROR"
		});

	};

    $scope.removeFrom = function(item, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].name == item){
                list.splice(i,1);
                return;
            }
        }
    };

    $scope.get_sims();

}