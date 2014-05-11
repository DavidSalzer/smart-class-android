smartClassApp.controller('studentSekerQuestion', ['$scope', function ($scope) {
    
    $scope.colorArray = ["blue","green","orange","pink","turquoise","red"];
    
    $scope.data = {
        user: "Pnina Lorman",
        title: "Tfila",
        answers:[
    		{ text: "Always", selected: false },
			{ text: "Almost alwaysn", selected: false },
			{ text: "Generally", selected: false },
			{ text: "Sometimes", selected: false },
			{ text: "Almost never", selected: false },
			{ text: "Never", selected: false }
        ]
    }

     $scope.americamSelect=-1;

    $scope.select = function (index) {
        if($scope.americamSelect>-1){
            $scope.data.answers[$scope.americamSelect].selected = false;    
        }
        $scope.data.answers[index].selected = true;
        //$scope.data.question.answers[index].text = "aa";
        $scope.americamSelect=index;
    };

    $scope.sendingAmrican=false;
    $scope.sendAmrican=function(){
        studentQuestionsBankAns.data={
            answer:$scope.americamSelect,
        }
        
        $scope.sendingAmrican=true;
    }

}])

