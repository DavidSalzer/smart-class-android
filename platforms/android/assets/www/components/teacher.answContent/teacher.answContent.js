smartClassApp.controller('answContent',[  '$scope', '$stateParams','$http', function ($scope,$stateParams,$http) {

	 $scope.data = {
		id:$stateParams.studentID,
		student:"Yuval",
		
		answers:[
                	
                    {
                    
                        answerType: "groupMatchQuestionAns"
						
                    },
					{
                       
                        answerType: "sekerMultipleQuestionAns"
						
                    },
					{
                       
                        answerType: "likeDislikeQuestionAns"
						
                    }
                 ]   
		
    };
	
   //send ajax whit $http u can use: $http.post || $http.get || $http.jsonp  the defult is use in get
     var dataSenf={
    	  "type":"getUser",
    	  "req":$scope.data.id
     }
     //get user answer
     $http({
    	 url:'http://localhost/Smart-Class/dataManagement/json.api.php',
    	 method:'POST',
		 data:dataSenf,
	 }).
     success(function(data, status, headers, config) {
     	 console.log(data.res);
         $scope.data.answerType=data.res.answer.type;
         $scope.data.answer=data.res.answer;
    	 //$scope.data.title=data[0].title;
      }).
     error(function(data, status, headers, config) {
       console.log('error: '+status);
     });

}]);