smartClassApp.controller('selectClass', ['$scope', '$stateParams', '$state', 'classAjax', function ($scope, $stateParams, $state, classAjax) {

	//$state.go("selectClass",{schoolId:'3'});
	
    $scope.gradesData = classAjax.getdata({ type: 'getClassOfSchool', req: { sid: $stateParams.schoolId} });
    $scope.gradesData.then(
    function (data) {
        console.log(data.res);
        $scope.data = {};
        $scope.data.grades = {};
        for (var i = 0; i < data.res.length; i++) {
            //if it's new grade
            if ($scope.data.grades[data.res[i].grade] == undefined) {
                $scope.data.grades[data.res[i].grade] = { name: data.res[i].grade, classes: [] };
            }
            $scope.data.grades[data.res[i].grade].classes.push(data.res[i]);
        }
        //To do: color of classes is just 9-12. if there more then 4 grades is not work good    
        console.log($scope.data);
    });
    //  $scope.data = {
    //      grades: [
    //{
    //    name: 'A',
    //    style1: 'grade_9',
    //    style2: 'g9',
    //    classes: [{ name: 'A1', cId: "" }, { name: 'A2' }, { name: 'A3'}]
    //}] }

    //select class
    $scope.selectClass = function (gradeIndex, classIndex) {
        open = !open;
        console.log("class selected " + gradeIndex + " " + classIndex);
        console.log($scope.data.grades[gradeIndex].classes[classIndex].cid);
        //go to leesons of class
        $state.go("lessons",{schoolId:$stateParams.schoolId,classId:$scope.data.grades[gradeIndex].classes[classIndex].cid});
    }


} ]);