smartClassApp.controller('listParagraphQuestion', ['$scope', function ($scope) {
$scope.data = {
    user: "Pnina Lorman",
    title: "Tfila",
    text:'As we saw, sometimes feel the need to Tefillah, as an internal impulse that causes us to "pour" our hearts against Hashem.Below some short tefilot for different situations. Think of a relative or friend who needs your Tefillah. Pick a theme, take a few minutes and make your personal Tefillah either using the proposed text or with your own words.',
    prayers:[
    	{
    	 title:'Tefillah for success',
    	 text:'To be your will Ado-nai, Di Di-s-s mine and my parents, who this time is goodwill before You and hear my Tefillah and my order. In your holy words is written, "Whoever trusts in Hashem is surrounded by kindness."Ado-nai God s truth, bestow blessings and success in all the work of my hands, because I trusted you send me Ti blessing as Ado-nai Your bless you blessed and forever.That in all his endeavors to succeed and be fulfilled in me what is written, "Cast your burden on the Lord, and He will sustain you"'
    	},
    	{
    	 title:'Tefillah to stay healthy',
    	  text:'To be your will Ado-nai, Di Di-s-s mine and my parents, who this time is goodwill before You and hear my Tefillah and my order. In your holy words is written, "Whoever trusts in Hashem is surrounded by kindness."Ado-nai God s truth, bestow blessings and success in all the work of my hands'
    	},
    	{
    	 title:'Tefillah for healing a sick',
    	  text:'To be your will Ado-nai, Di Di-s-s mine and my parents'
    	},
    	{
    	 title:'Tefillah to find a lost object',
    	  text:'To be your will Ado-nai, Di Di-s-s mine and my parents, who this time is goodwill before You and hear my Tefillah and my order. In your holy words is written, "Whoever trusts in Hashem is surrounded by kindness."Ado-nai God s truth"'
    	},	
    ]

    }

    $scope.cPopUp=-1;
    $scope.prayerPopup='';
    $scope.popUpTitle='';

    //show popup
    $scope.openPopUp=function(i){
    	$scope.popUpMask=true;
    	$scope.popUpTitle=$scope.data.prayers[i].title;
    	$scope.prayerPopup=$scope.data.prayers[i].text;
    }
    //hide popup
    $scope.hidePopUp=function(){
    	$scope.popUpMask=false;
    	$scope.popUpTitle='';
    	$scope.prayerPopup='';	
    }	
}])
