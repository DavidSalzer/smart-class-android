smartClassApp.controller('questionsBankQuestionAns',[  '$scope',  function ($scope) {
    $scope.colorArray = ["blue","green","orange","pink","turquoise","red"];
    $scope.data={
        InstrucText:"Instruction text comes here",
        phrase:[
        "It is a long established fact that a reader",
        "will be distracted by the readable content of a page when looking",
        "is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        "he point of using Lorem Ipsum is that it has a more-or-less norma",
        "istribution of letters, as opposed to using 'Content here",
        "ontent here', making it look like readable Englis","Many desktop publishing"],
        input:["variations","Lorem Ipsum","believable","chunks","handful","words","Lorem Ipsum"]
    }
}]);