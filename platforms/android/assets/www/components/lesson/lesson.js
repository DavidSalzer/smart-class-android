
smartClassApp.controller('lesson', ['$scope', '$stateParams', '$location', '$state', 'classAjax', 'cambiumSyncSocket', function ($scope, $stateParams, $location, $state, classAjax, cambiumSyncSocket) {

    $scope.data = {
        user: "",
        title: "Tfila"
    }

    //send ajax whit $http u can use: $http.post || $http.get || $http.jsonp  the defult is use in get
    var dataSenf = {
        "type": "getUser",
        "req": {}
    }


    //get user data
    $scope.user = classAjax.getdata({ type: 'getUser', req: {} });
    $scope.user.then(
 		function (data) {
 		    //console.log(data.res);
 		    $scope.data.user = data.res.userName;
 		},
 		function (error) {

 		}
 	);


    //get lesson
    //console.log($stateParams.lessonId);
    $scope.getLesson = classAjax.getdata({ type: 'getLesson', req: { lid: $stateParams.lessonId} });
    $scope.getLesson.then(
 		function (data) {
 		    //	 console.log('lesson: '+data);
 		    //$scope.data.title=data.res.name;
 		    $scope.slides = data.res.slide;
 		    //$state.transitionTo('lesson.slide',{lessonId:'1',slideIndex:'1'});
 		    //$location.path( "/lesson/"+$stateParams.lessonId+"/slide/1" );
 		    $location.replace();
 		},
 		function (error) {

 		}
 	);

    $scope.activeSlide = 0;
    //navigation for silde
    $scope.navSlide = function (t) {
        //console.log($scope.slides);
        if (t == 'next') {
            if ($scope.activeSlide < $scope.slides.length - 1) $scope.activeSlide = $scope.activeSlide + 1;
        } else {
            if ($scope.activeSlide != 0) $scope.activeSlide = $scope.activeSlide - 1;
        }

        //	console.log('active:'+$scope.activeSlide);
        //check if is end back
        if ($scope.activeSlide != 0) {
            $scope.endBack = false;
        } else {
            $scope.endBack = true;
        }
        //check if is end next
        if ($scope.activeSlide < $scope.slides.length - 1) {
            $scope.endNext = false;
        } else {
            $scope.endNext = true;
        }

        var numSlide = parseInt($scope.activeSlide);
        //$location.path( "/lesson/"+$stateParams.lessonId+"/slide/"+$scope.slides[numSlide].slideId);
        //$location.replace();
        $state.transitionTo('lesson.slide', { lessonId: $stateParams.lessonId, slideIndex: $scope.slides[numSlide].index });

    }

    //	
    ////cambiumsync 
     $scope.setSocket = cambiumSyncSocket.setSincSocket();

     $scope.mySocket = cambiumSyncSocket.getSocket();

     $scope.mySocket.on('switchSlide', function (data) {
       //  alert("switchSlide");
         //console.log(data);
         $state.go("lesson.slide",{lessonId:data.lesson.lid,slideIndex:data.slide.index});
     });
    $scope.insertToLesson = classAjax.getdata({ type: 'pupilInsertToLesson', req: { lid: $stateParams.lessonId} });
    $scope.insertToLesson.then(
 		function (data) {
 		    console.log("insert to lesson:");
 		    console.log(data);
 		},
 		function (error) {

 		}
 	);


} ]);

