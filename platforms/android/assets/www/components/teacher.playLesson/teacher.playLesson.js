smartClassApp.controller('playLesson', ['$scope','$stateParams','classAjax', function ($scope,$stateParams,classAjax) {

	$scope.activeLessonWhacher = classAjax.getdata({ type: 'activeLesson', req: { lid: $stateParams.lessonId} });
    $scope.activeLessonWhacher.then(
    function (data) {
      
       console.log(data);
    });
}]);