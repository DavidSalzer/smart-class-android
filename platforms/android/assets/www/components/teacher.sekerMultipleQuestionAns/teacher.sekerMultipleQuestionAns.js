smartClassApp.controller('sekerMultipleQuestionAns',[  '$scope',  function ($scope) {
    $scope.data = {
        text:"Click on the word or phrase that best defines your prayer experience...",
        seker:[
	        {text:'Mizva'},{text:'Connection to Hashem'},{text:'Mediction'},{text:'Spiritual Elevation'},
	        {text:'Obligation'},{text:'Encounter with Hashem'},{text:'Requirement'},{text:'Introspection'},
	        {text:'Conversation with Hashem'},
	        {text:'Expression of Faith'},{text:'Religious Act'},{text:'Mystical Experience'}
        ],
    }
	
}]);