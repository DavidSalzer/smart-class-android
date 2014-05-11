smartClassApp.controller('studentOpenQuestion',['$scope','$stateParams','slideData', function ($scope,$stateParams,slideData) {
	  //$scope.data = {
   //     text:"Based on what we learned about Tefila, suggest ways we can improve our concentration Before Tefila and during Tefila:)"
   // }

    $scope.data = slideData.getTask($scope.$parent.$index);

    $scope.send=function(){
    		console.log($scope.oral);
    		if($scope.oral){
    			//do nathing
    		}else{
    			$scope.oral=false;
    		}
    	$scope.studentOpenQuestionAns.data={
		    text:$scope.oral,
		    oral:$scope.oral
		}
    }
}])


