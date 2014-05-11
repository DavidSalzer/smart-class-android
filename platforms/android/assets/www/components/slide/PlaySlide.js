smartClassApp.controller('PlaySlide', ['$scope', '$stateParams', 'lessonData', 'classAjax', 'cambiumSyncSocket', function ($scope, $stateParams, lessonData, classAjax, cambiumSyncSocket) {

    // for slide binding
    $scope.slide = lessonData.getSlide;

    //only for first time wake up of the lessonData sercvice
    $scope.loadSlide = lessonData.getActiveSlide();
    $scope.loadSlide.then(function (data) {
        // nothing to do
        //console.log("slide: ");
        //console.log($scope.slide);
    });





    $scope.setSocket = cambiumSyncSocket.setSincSocket();

    $scope.mySocket = cambiumSyncSocket.getSocket();

    $scope.mySocket.on('switchSlide', function (data) {
        console.log(data);
        lessonData.publishSlide('3'); //stam
    });

} ]);
