smartClassApp.controller('textParagraph2Question', ['$scope','$timeout','$http', function ($scope,$timeout,$http) {
alert();
$scope.data = {
    user: "Pnina Lorman",
    title: "Tfila",
    text:"The importance of the Kaddish",
    html:'What is so special about the Kaddish?<br>In the Zohar, as in the Gemara and the Midrashim, the importance of the Kaddish and its influence in this world and  the upper worlds, is repeatedly emphasized. In fact, the Gemara says that the world exists due to the words “Amen, Yehe Shmei Raba”.<br>When you say the Kaddish, or answer “Yehe Shmei Raba Mevorach”,  you fulfill "Kiddush Hashem Ba’Rabim" (publicly sanctifying Hashem’s name), which, in fact, is the primary Mitzvah for Am Yisrael.<br>From the story of the meraglim (spies), we learn that the “Eda” (congregation) is comprised of  at least ten Jews, as it is written: “Till when will be this bad Eda”?, regarding the ten spies that slander about Eretz Israel. These ten spies are named "Eda" - congregation.<br>Because of the importance of this Mitzva, Chaza”l wrote the Kaddish in Aramaic, which was the spoken language when the Kaddish was composed. Therefore, everyone would be able to publicly sanctify Hashem\'s name with complete understanding.'
    }	

    $scope.tranShow=false;

    $http.get('http://filltext.com/?rows=5&title={randomString}&html={lorem}&pretty=true')
    .success(function(data, status, headers, config) {
      // this callback will be called asynchronously
     //console.log(data);
        $scope.data.title=data[0].title;
    	$scope.data.html=data[0].html;
     }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('error: '+status);
    });

    //start animation after 1 S- scrooling
    $timeout(function(){
    	angular.element(document.getElementsByClassName('mekorot_ver2_body')).addClass('animet');
    },1000);
    //show translet btn
	$timeout(function(){
	    	$scope.tranShow=true;
	    },1500);
    
    
}])


