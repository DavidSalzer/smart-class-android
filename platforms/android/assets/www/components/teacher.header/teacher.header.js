smartClassApp.controller('header', ['$scope', '$stateParams', 'classAjax', function ($scope, $stateParams, classAjax) {

    $scope.data = {
        subject: 'Tefillah'
        //schoolName: 'Democracy Prep Charter High School',
        //className: ''//'9A'
    }

    $scope.schoolData = classAjax.getdata({ type: "getSchool", req: { sid: $stateParams.schoolId} });
    $scope.schoolData.then(
	    	function (data) {
	    	    //console.log("school");
	    	    //console.log(data);
	    	    $scope.data.schoolName = data.res.name;
	    	});

    if ($stateParams.classId) {
        $scope.schoolData = classAjax.getdata({ type: "getClass", req: { cid: $stateParams.classId} });
        $scope.schoolData.then(
	    	function (data) {
	    	    //console.log("class");
	    	    //console.log(data);
	    	    $scope.data.className = "- " + data.res.name;
	    	});
    }
	
	$scope.logOut = function () {
        
		//console.log('logOut'); 
		$scope.logoutWhacher = classAjax.getdata({ type: 'logout', req: {} });
		$scope.logoutWhacher.then(
		function (data) {
		  
		    if(data.res.uid==0){
			
				location.replace("/teacher/login/#/login");
		   }
		});
    }
	

} ]);
