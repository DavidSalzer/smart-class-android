smartClassApp.controller('lessonsTable', ['$scope', '$stateParams', '$state', 'classAjax',function ($scope, $stateParams, $state, classAjax) {
	
	
	$scope.data = {
	  
	}
	
	
	$scope.lessonsWhacher = classAjax.getdata({ type: 'getLessonOfClass', req: { cid: $stateParams.classId} });
    $scope.lessonsWhacher.then(
    function (data) {
	
        $scope.data.lessons = data.res; 
     
    });
	
	$scope.playLesson = function(lid){
	
		$state.go("playLesson",{schoolId:$stateParams.schoolId,classId:$stateParams.classId,lessonId:lid});
	
	}
	





}]);