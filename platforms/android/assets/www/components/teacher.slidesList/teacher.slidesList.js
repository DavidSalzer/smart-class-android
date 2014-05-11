smartClassApp.controller('slidesList', ['$scope', '$state', '$stateParams','lessonData','slideData', function ($scope,$state, $stateParams,lessonData,slideData) {
	
	$scope.data = {
	
		
       
	}
	$scope.slidesList = lessonData.getLesson;
	
	$scope.activeSlideId = lessonData.getactiveSlideId;
		
	$scope.displayPreview = function(slideIndex){
	
		slideData.cleanSlide();
		$state.go("playLesson.preview",{slideIndex:slideIndex+1});
	
	}
	
	/* //get lesson
 	console.log("slideList:"+$stateParams.lessonId);
 	
	$scope.getLesson=classAjax.getdata({type:'getLesson',req:{lid:$stateParams.lessonId }});
 	$scope.getLesson.then(
 		function(data){
		 
		 console.log(data.res.activeSid);
		 $stateParams.slideIndex=data.res.activeSid;
		 
		 console.log("the slides list return is:");
		 console.log(data);
    	 $scope.data.slides= [];
    	 $scope.data.slides= data.res.slide;
		
 		},
 		function(error){
		
			console.log("slideList:  data: "+data+"   error:  "+error);

 		}
 	); */

}]);