smartClassApp.controller('footer',[ '$scope','lessonData',  function ($scope,lessonData) {

	$scope.moveSlide=function(backOrNext){
			
			//backOrNext: var from footer buttons, value: 1 for next, -1 for back
			console.log(backOrNext);
			lessonData.publishSlide(backOrNext);
	}
	
}]);

 