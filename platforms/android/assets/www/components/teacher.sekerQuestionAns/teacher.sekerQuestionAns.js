smartClassApp.controller('sekerQuestionAns',[  '$scope',  function ($scope) {

$scope.colorArray = ["blue","green","orange","pink","turquoise","red"];
    
    $scope.data = {
        user: "Pnina Lorman",
        title: "Tfila",
        answers:[
    		{ text: "Always", selected: false, sectionClass:"'selection_item_blue':true 'resaults_selected_item_blue':selected", divClass:"item_circ_blue", number:"1"},
			{ text: "Almost always", selected: false, sectionClass:"'selection_item_green':true 'resaults_selected_item_green':selected", divClass:"item_circ_green", number:"2"},
			{ text: "Generally", selected: false, sectionClass:"'selection_item_orange':true 'resaults_selected_item_orange':selected", divClass:"item_circ_orange", number:"3"},
			{ text: "Sometimes", selected: false, sectionClass:"'selection_item_pink':true 'resaults_selected_item_pink':selected", divClass:"item_circ_pink", number:"4"},
			{ text: "Almost never", selected: false, sectionClass:"'selection_item_turquoise':true 'resaults_selected_item_turquoise':selected", divClass:"item_circ_turquoise", number:"5"},
			{ text: "Never", selected: false, sectionClass:"'selection_item_red':true 'resaults_selected_item_red':selected", divClass:"item_circ_red", number:"6"}
        ]
    }
	
}]);