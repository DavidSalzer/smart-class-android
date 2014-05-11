smartClassApp.controller('studentQuestionsBank', ['$scope', function ($scope) {
    $scope.data = {
        text: "Pnina Lorman",
        wordArray: [{text:"variations"}, {text:"believable"}, {text:"chunks"}, {text:"handful"}, {text:"words"},
         {text:"Lorem Ipsum"}, {text:"publishing"}],
        textbank:"It is a long established fact that a reader ###1 will be distracted by the readable content of a page when looking ###2 is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ###3 he point of using Lorem Ipsum is that it has a more-or-less norma ###4 istribution of letters, as opposed to using 'Content here ###5 ontent here', making it look like readable Englis ###6 Many desktop publishing ###7 ",

    }

    
    f=$scope.data.textbank.split(/###\d/);
	$scope.textBankFix=[];
	//stringify the string
	for(var i=0;i<f.length;i++){
		item={
			html:'',
			type:''
		};
		if(f[i]!='') item.html=f[i];
		if(i!=f.length-1){item.type='block'}
		
		$scope.textBankFix.push(item);
	}
	console.log($scope.textBankFix);

	$scope.word=-1;
	$scope.blanckMatch=[];

	$scope.fillMe=function(i){
		//bilud assosyativ array and index for block and word
		if($scope.word > -1){
			$scope.blanckMatch[i+1]={wordIndex:$scope.word+1,wordText:$scope.data.wordArray[$scope.word].text};
			$scope.data.wordArray[$scope.word].opacity=false;
			console.log($scope.blanckMatch);
			$scope.word = -1;
		}else{
			$scope.blanckMatch[i+1]={wordIndex:'',wordText:''};
		}
	}

	//click on word and opacity
	$scope.wordMe=function(i){
		if($scope.word > -1){
			$scope.data.wordArray[$scope.word].opacity=false;
		}
		$scope.data.wordArray[i].opacity=true;
		$scope.word=i;
	}

	//send the ansewr
	$scope.send=function(){
		console.log($scope.blanckMatch);
		$scope.studentQuestionsBankAns.data=$scope.blanckMatch;
	}

} ])