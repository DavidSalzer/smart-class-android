smartClassApp.controller('studentLikeDislike', ['$scope', '$stateParams', 'slideData', function ($scope, $stateParams, slideData) {
    //$scope.data = {

    //    text: "How do you feel?"

    //}
    //alert($scope.$parent.$index);
    $scope.data = slideData.getTask($scope.$parent.$index);

    //like || dislike and add a Press attr for css
    $scope.likePress = function (t) {
        if ($scope.data.press != '') {
            $scope.data.press = '';
        }
        if (t == 'like') {
            $scope.data.press = 'like';
        } else {
            $scope.data.press = 'dislike';
        }
        console.log($scope.data);
    }

    //send the answer
    $scope.send = function () {
        //console.log($scope.data.likes[i].press);
        $scope.studentLikeDislikeAns = {};
        $scope.studentLikeDislikeAns.data = {
            answer: $scope.data.press
        }
    }
} ])

