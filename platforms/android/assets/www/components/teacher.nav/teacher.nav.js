smartClassApp.controller('nav', ['$scope', '$state','$stateParams', function ($scope,$state,$stateParams) {

	$scope.goLessons = function(){
	
		$state.go("lessons",{schoolId:$stateParams.schoolId,classId:$stateParams.classId});
	
	}
	
	$scope.goSettings = function(){
	
		$state.go("settings",{schoolId:$stateParams.schoolId,classId:$stateParams.classId});
	
	}
	
	$scope.goChangeClass = function(){
	
		console.log($stateParams.schoolId,$stateParams.classId)
		$state.go("selectClass",{schoolId:$stateParams.schoolId,classId:$stateParams.classId});
	
	}

}]);
