smartClassApp.controller('studentSekerMultiple', ['$scope', function ($scope) {
    $scope.data = {
        text:"Click on the word or phrase that best defines your prayer experience...",
        seker:[
	        {text:'Mizva'},{text:'Connection to Hashem'},{text:'Mediction'},{text:'Spiritual Elevation'},
	        {text:'Obligation'},{text:'Encounter with Hashem'},{text:'Requirement'},{text:'Introspection'},
	        {text:'Conversation with Hashem'},
	        {text:'Expression of Faith'},{text:'Religious Act'},{text:'Mystical Experience'}
        ],
    }
	
    $scope.activeSeker=-1;

   
	$scope.sekerSelect= function(i){
		if($scope.activeSeker>-1){
			$scope.data.seker[$scope.activeSeker].activeSeker=false;
		}
		$scope.activeSeker=i;
		$scope.data.seker[$scope.activeSeker].activeSeker=true;
	}
}])
