smartClassApp.controller('login', ['$scope','classAjax','$state', function ($scope,classAjax,$state) {

//get all lesson list
$scope.lesson=classAjax.getdata({type:'getAlltemplateLesson',req:{}});
$scope.lesson.then(
	function(data){
		//lesson list
		//console.log(data);
	},
	function(error){
		console.log(error);
	}
);

window.onresize = function(){alert("resize");};
//login function t- is type for viwe or play lesson 
$scope.login=function(t){
	 var dataSenf={
         "type":"login",
         "req":{"userName":$scope.username,"pass":$scope.pass}     
        }
   ;

   var dataOut={
         "type":"logout",
         "req":{}     
        }
   ;
   if(t=='play'){
	    //play lesson
	    $scope.loginData=classAjax.getdata(dataSenf);
	    $scope.loginData.then(
	    	function(data){
				if(data.res.uid != 0){
					console.log(data.res);
					
					if(data.res.type=='student'){
						alert('you need a permission to access to this section');		
					}else{
						//location.replace("../../teacher/#/2/selectClass");
					}
						
	    		}
	    	},
	    	function(error){
	    		 console.log('error: '+status);	
	    	}
	    );

	}else{ // t = is view lesson
	
	}



}


}]);