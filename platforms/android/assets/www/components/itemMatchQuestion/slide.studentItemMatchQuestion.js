smartClassApp.controller('studentItemMatchQuestion', ['$scope', function ($scope) {
	$scope.data={
		text:"Match the pesukim that are parallel:::",
        leftText:[
			{
				text:'קַדִּישׁ בִּשְׁמֵי מְרוֹמָא ... קַדִּישׁ עַל אַרְעָא ... קַדִּישׁ לְעָלַם וּלְעָלְמֵי עָלְמַיָּא'
			},
			{
				text:"ה' הוֹשִׁיעָה. הַמֶּלֶךְ יַעֲנֵנוּ בְיוֹם קָרְאֵנו אֵלֶּה בָרֶכֶב וְאֵלֶּה בַסּוּסִים"
			},
			{
				text: "בָּרוּךְ אֱלקֵינוּ שֶׁבְּרָאָנוּ לִכְבוֹדוֹ ו... וְנָתַן לָנוּ תּוֹרַת אֱמֶת"
			},
			{
				text:"גָּדוֹל ה' וּמְהֻלָּל מְאֹד וְלִגְדֻלָּתוֹ אֵין חֵקֶר"
			}
		],
		rightText:[
			{
				text:"וַיּוֹשַׁע ה' בַּיּום הַהוּא אֶת יִשְׂרָאֵל סוּס וְרֹכְבוֹ רָמָה בַיָּם"
			},
			{
				text:"קָדוֹשׁ קָדוֹשׁ קָדוֹשׁ ה' צְבָאוֹת מְלא כָל הָאָרֶץ כְּבוֹדו"
			},
			{
				text:"גָּדוֹל אֲדוֹנֵינוּ וְרַב כֹּחַ לִתְבוּנָתוֹ אֵין מִסְפָּר"
			},
			{
				text:"וְתֵן בְּלִבֵּנוּ בִינָה לְהָבִין, לְהַשְׂכִּיל, לִשְׁמוֹעַ, לִלְמוֹד וּלְלַמֵּד, לִשְׁמוֹר וְלַעֲשׂוֹת וּלְקַיֵּם אֶת כָּל דִּבְרֵי תַלְמוּד תּוֹרָתְךָ בְּאַהֲבָה"
			}
		]
	}

	$scope.match={
		left:[],
		right:[]
	};
	$scope.couples=[];

	$scope.macthSelect=function(t,i){
		//check if ther is alredy item in left or right and insert only one in eche
		if(t=='left'){
			if($scope.match.left.length>0){
				$scope.match.left[0].type=false; //to remove hover class
				$scope.match.left.length=[];
			}
			
			$scope.match.left.push($scope.data.leftText[i]);
			$scope.match.left.push({position:i});
			$scope.data.leftText[i].type=true; //to add hover class
		}else{
			
			if($scope.match.right.length>0){
				$scope.match.right[0].type=false;
				$scope.match.right.length=[];
			}

			$scope.match.right.push($scope.data.rightText[i]);
			$scope.match.right.push({position:i});
			$scope.data.rightText[i].type=true;
		}

		if($scope.match.left.length>0 && $scope.match.right.length>0){
			console.log($scope.match.left[1].position);
			console.log($scope.match.right[1].position);
			$scope.data.leftText[$scope.match.left[1].position].hide=true;//hide the element
			$scope.data.rightText[$scope.match.right[1].position].hide=true;//hide the element
			//save the binding...
			var couple={
				left:$scope.match.left[1].position,
				right:$scope.match.right[1].position
			}
			$scope.couples.push(couple);
			//console.log($scope.couples);

			$scope.match.left=[];
			$scope.match.right=[];
		}

	}



	///removeCouple function when x or ling img is clicked
	$scope.removeCouple=function(i){
		left=$scope.couples[i].left;
		right=$scope.couples[i].right;

		$scope.couples.splice(i, 1);
		$scope.data.leftText[left].hide=false;//show the element
		$scope.data.rightText[right].hide=false;//show the element
		$scope.data.leftText[left].type=false; //to remove hover class
		$scope.data.rightText[right].type=false; //to remove hover class

	}

	$scope.send=function(){
		//send data
		console.log($scope.couples);
		$scope.studentItemMatchQuestionAns=$scope.couples;
	}
}])
