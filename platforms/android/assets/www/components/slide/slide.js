
smartClassApp.controller('slide', ['$scope', '$stateParams','$state', 'classAjax', 'slideData', 'cambiumSyncSocket', function ($scope, $stateParams,$state, classAjax, slideData, cambiumSyncSocket) {

    //$scope.slide = [{
    //    
    //        data: {
    //            type: 'studentLikeDislike'
    //        }
    //    },
    //    {
    //    
    //        data: {
    //            type: 'studentLikeDislike'
    //        }
    //    }

    //]

    // for slide binding
    $scope.slide = slideData.getSlide;

    ////only for first time wake up of the lessonData sercvice
    //$scope.loadSlide = slideData.getActiveSlide();
    //$scope.loadSlide.then(function (data) {
    //    // nothing to do
    //});
    console.log($scope.slide);
    //console.log(slideData.test());
    //console.log($stateParams.lessonId, $stateParams.slideIndex);

    $scope.test = slideData.loadSlide();
    $scope.test.then(
    function (data) {
    }

     );

    ////cambiumsync 
    //$scope.setSocket = cambiumSyncSocket.setSincSocket();

    //$scope.mySocket = cambiumSyncSocket.getSocket();

    //$scope.mySocket.on('switchSlide', function (data) {
    //  //  alert("switchSlide");
    //    //console.log(data);
    //    $state.go("lesson.slide",{lessonId:data.lesson.lid,slideIndex:data.slide.index});
    //});


} ]);

