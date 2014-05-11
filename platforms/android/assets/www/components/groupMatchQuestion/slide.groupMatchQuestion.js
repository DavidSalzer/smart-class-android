smartClassApp.controller('groupMatchQuestion', ['$scope', function ($scope) {

    $scope.data = {
        text:"Below there is a list of places. Which places do you think are appropriate for Tefila and which not???",
        listSelect: [
		{
		    text: 'home',
		    id: 'group_item_1',
		    colorIndex: '1',
		    activeClass: '',
		    drop: false
		},
		{
		    text: 'stadium',
		    id: 'group_item_2',
		    colorIndex: '2',
		    activeClass: '',
		    drop: false
		},
		{
		    text: 'kotel',
		    id: 'group_item_3',
		    colorIndex: '3',
		    activeClass: '',
		    drop: false
		},
		{
		    text: 'street',
		    id: 'group_item_4',
		    colorIndex: '4',
		    activeClass: '',
		    drop: false
		},
		{
		    text: 'car or bus',
		    id: 'group_item_5',
		    colorIndex: '5',
		    activeClass: '',
		    drop: false
		},
		{
		    text: 'classroom',
		    id: 'group_item_6',
		    colorIndex: '6',
		    activeClass: '',
		    drop: false
		},
		{
		    text: 'field',
		    id: 'group_item_7',
		    colorIndex: '7',
		    activeClass: '',
		    drop: false
		},
		{
		    text: 'office',
		    id: 'group_item_8',
		    colorIndex: '8',
		    activeClass: '',
		    drop: false
		}
	]
    }



	//index for the selected item
    $scope.activeDiv = -1;
    $scope.app = [];
    $scope.noneApp = [];

    $scope.selectItem = function (i) {
        //reset the selected item
		if ($scope.activeDiv > -1) {
            $scope.data.listSelect[$scope.activeDiv].activeClass = '';
        }

       //if the selected item not droped to the side
        if ($scope.data.listSelect[i].drop === false) { 
         $scope.activeDiv = i;
          $scope.data.listSelect[i].activeClass = 'active' 
          }
    }

	//when the side id clicked
    $scope.drop = function (type) {
		//check if the item is not alredy dropded
        if ($scope.activeDiv > -1 && $scope.data.listSelect[$scope.activeDiv].drop === false) {
		//new item for push in the correct list			
			item = {
                id: $scope.data.listSelect[$scope.activeDiv].id,
                text: $scope.data.listSelect[$scope.activeDiv].text,
                colorIndex: $scope.data.listSelect[$scope.activeDiv].colorIndex,
                position: $scope.activeDiv //old position in the left side
            }

            $scope.data.listSelect[$scope.activeDiv].activeClass = 'active';
            $scope.data.listSelect[$scope.activeDiv].drop = true;
            $scope.activeDiv = -1;

            if (type == 'app') {
                $scope.app.push(item);
            } else {
                $scope.noneApp.push(item);
            }
        }
    }

	//when the X is clicekd -remove from the selected list 
    $scope.removeDrop = function (t, i) {
        if (t == 'app') {
            $scope.data.listSelect[$scope.app[i].position].activeClass = '';
            $scope.data.listSelect[$scope.app[i].position].drop = false;
            $scope.app.splice(i, 1);
        } else {
            $scope.data.listSelect[$scope.noneApp[i].position].activeClass = '';
            $scope.data.listSelect[$scope.noneApp[i].position].drop = false;
            $scope.noneApp.splice(i, 1);
        }
    }

    $scope.sendData=function(){
    	//send data
    	$scope.groupMatchQuestionAns.data={
	    	noapp:$scope.noneApp,
	    	app:$scope.app
    	}
    	console.log($scope.groupMatchQuestionAns);
    }

} ])

