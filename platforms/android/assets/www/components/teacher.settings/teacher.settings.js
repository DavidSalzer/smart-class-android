smartClassApp.controller('settings', ['$scope', '$stateParams', '$state', 'classAjax', function ($scope, $stateParams, $state, classAjax) {

    $scope.showAddStudentPopup = false;
	
	$scope.data = {
	}
	
	//get students list from server
	$scope.studentsListWhacher = classAjax.getdata({ type: 'getClass', req: { cid: $stateParams.classId} });
    $scope.studentsListWhacher.then(
    function (data) {
      
       //console.log(data.res.pupil); 
       $scope.data.students = data.res.pupil;
    });
	
	//get classes list from server (for menu)
	$scope.classesListWhacher = classAjax.getdata({ type: 'getClassOfSchool', req: { sid: $stateParams.schoolId} });
    $scope.classesListWhacher.then(
    function (data) {
       
        $scope.data.classes = data.res;
		/* var title = {name:"Select Class"};
		 $scope.data.classes.push(title); */
    });
   

    //change student password
    $scope.changePassword = function (id) {
        
		console.log("change Password ", id);
        //console.log($scope.data.students[id].uid);
        
		/*var=stdid = $scope.data.students[id].uid;
		$scope.saveStudentWhacher = classAjax.getdata({ type: 'updateOtherUserPass', req: { 
			
			uid:stdid
		} 
		});
		$scope.saveStudentWhacher.then(
		function (data) {
       
			console.log(data.res); 
			//to do : success checking
		}); */
    }

    //delete student
    $scope.deleteStudent = function (id) {
        
		console.log("delete ", id, $scope.data.students[id].uid);
		
		var stdid = $scope.data.students[id].uid
		
		$scope.saveStudentWhacher = classAjax.getdata({ type: 'deleteUser', req: { 
			
			uid:stdid	
		} 
		});
		$scope.saveStudentWhacher.then(
		function (data) {
			
			
			console.log(data); 
			if(data.res==true){
			 
				$scope.data.students.splice(id,1);
			} 	
		});
    }

    //set student learning Disabilities
    $scope.learningDisabilities = function (i) {
        console.log("learning Disabilities ", i);
    }

    //open add student popup
    $scope.openAddStudentPopup = function () {
        $scope.showAddStudentPopup = true;
		 
    }

    //close add student popup
    $scope.closeAddStudentPopup = function () {
        $scope.showAddStudentPopup = false;
		
	}
    //save student
    $scope.saveStudent = function () {
       
	    console.log($scope.userData);
        
		$scope.saveStudentWhacher = classAjax.getdata({ type: 'addPupilToClass', req: { 
		
			cid: $stateParams.classId, 
			userName:$scope.userData.userName,
			pass:$scope.userData.password
		} 
		});
		$scope.saveStudentWhacher.then(
		function (data) {
			 console.log(data);
			if(data.res.result=='success'){
				
				var student={uid:data.res.uid,userName:$scope.userData.userName};
				$scope.data.students.push(student);
			}
		});
		
    }

    //save student and close popup
    $scope.saveStudentAndClose = function () {
        
		$scope.saveStudent();
        $scope.showAddStudentPopup = false;
    }
	
	$scope.select = function (clsid) {
        
		console.log(clsid);
		$state.go("settings",{schoolId:$stateParams.schoolId,classId:clsid});
    }
	
	
} ]);