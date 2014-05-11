smartClassApp.controller('groupMatchQuestionAns',[  '$scope',  function ($scope) {

	$scope.data = {
        text:"Below there is a list of places. Which places do you think are appropriate for Tefila and which not???",
        groupTitle: "Appropriate",
        groupIndex: "1",
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
}]);