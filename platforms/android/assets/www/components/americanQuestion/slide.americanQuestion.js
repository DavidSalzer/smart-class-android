smartClassApp.controller('americanQuestion', ['$scope', function ($scope) {
    $scope.colorArray = ["blue","green","orange","pink","turquoise","red"];
    $scope.data = {
        title: "According to Judaism, ideally percebir Tefillah as:",
        answers: [
				{ text: "A religious obligation", selected: false },
				{ text: "An encounter with Hashemn", selected: false },
				{ text: "An encounter with Hashemn", selected: false }
			],
        correctAnswer:'',
    };  

    $scope.americamSelect=-1;
    
    //check if somthing is select and add class
    $scope.select = function (index) {
        if($scope.americamSelect>-1){
            $scope.data.answers[$scope.americamSelect].selected = false;    
        }
        $scope.data.answers[index].selected = true;
        $scope.data.correctAnswer=index;
        $scope.americamSelect=index;
    };
   //show loader icon
   $scope.sendingAmrican=false;
    $scope.sendAmrican=function(){
        //do something whit the answer
        console.log($scope.data.correctAnswer);
        americanQuestionAns.data={
            answer:$scope.data.correctAnswer,
        }

        $scope.sendingAmrican=true;
    }

} ])


