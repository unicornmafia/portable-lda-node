var host = "lda.marshbot.com";
//var host = "localhost";

var unescape_data = function(simArray){

    for (var i = 0; i < simArray.length; i++) {
        originalName = simArray[i]["name"];
        newName = decodeURIComponent(originalName)
        console.log(originalName)
        console.log(newName)
        simArray[i]["name"] = newName;
        console.log()
    }

    return simArray
};

function Lda($scope, $http) {
	$scope.queryTerms = 'foo bar dog cat';
	$scope.simList = []; //[{id:1, fileid: "0012", name: 'Template1', sim: 0.1}, {id:2, fileid: "0013", name: 'Another Template', sim:0.2}]
	$scope.selectedSim = {};
	$scope.selectedState = "notSelected";
	$scope.docText = "";

	$scope.cell = {
		simMethod: "Euclidean"
	};

	$scope.simMethod = [{
		name: "Cosine"
	}, {
		name: "Hellinger"
	},{
        name: "Euclidean"
    }];

    $scope.goodDocs = [];
    $scope.badDocs = [];
    $scope.goodTerms = [];
    $scope.badTerms = [];

    $scope.plusoneclick = function(doc) {
        $scope.removeFrom(doc.name, $scope.badDocs);
        $scope.addToListIfNotAlreadyInList(doc, $scope.goodDocs);
    };

    $scope.minusoneclick = function(doc) {
        $scope.removeFrom(doc.name, $scope.goodDocs);
        $scope.addToListIfNotAlreadyInList(doc, $scope.badDocs);
    };

    $scope.zeroclick = function(doc) {
        $scope.removeFrom(doc, $scope.goodDocs);
        $scope.removeFrom(doc, $scope.badDocs);
    };

    $scope.removefromgooddocs = function(doc) {
        $scope.removeFrom(doc, $scope.goodDocs);
    };

    $scope.removefrombaddocs = function(doc) {
        $scope.removeFrom(doc, $scope.badDocs);
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
        $scope.docText = '';

        $http({
            method: 'GET',
            url: 'http://' + host + ':1338/document/' + list.fileid,
            headers: {
                'Content-Type': 'text/plain'
            }

        }).then(function successCallback(response) {
            $scope.docText = response.data;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert('Error retrieving document')
            $scope.docText = "ERROR"
        });

	};

	$scope.get_sim_method = function () {
		return $scope.simMethod;
	};

	$scope.get_sims = function() {
		// Simple GET request example:
		$scope.docText = '';
		var terms = $scope.queryTerms.split(/[ ,]+/);
        var json_data = {"query_terms": terms,
                "sim_method": $scope.cell.simMethod,
                "good_doc_ids": $scope.goodDocs,
                "bad_doc_ids": $scope.badDocs,
                "good_terms": $scope.goodTerms,
                "bad_terms": $scope.badTerms
            };
        console.log(json_data);
		$http({
			method: 'POST',
			url: 'http://' + host + ':1338/get-sims-from-concept',
			headers: {
				'Content-Type': 'application/json'
			},
			data: json_data
		}).then(function successCallback(response) {
            $scope.simList = unescape_data(response.data);

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			alert('Error querying LDA server')
			$scope.docText = "ERROR"
		});

	};

    $scope.addToListIfNotAlreadyInList = function(item, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].fileid == item.fileid){
                return;
            }
        }
        list.push(item);
    };

    $scope.removeFrom = function(item, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].fileid == item.fileid){
                list.splice(i,1);
                return;
            }
        }
    };

    $scope.get_sims();

}
