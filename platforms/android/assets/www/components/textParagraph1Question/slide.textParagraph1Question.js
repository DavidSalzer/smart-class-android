smartClassApp.controller('textParagraph1Question',['$scope','$stateParams','slideData', function ($scope,$stateParams,slideData) {
//$scope.data = {
//    user: "Pnina Lorman",
//    title: "Tfila",
//    text:"The importance of the Kaddish",
//    html:'What is so special about the Kaddish?<br>In the Zohar, as in the Gemara and the Midrashim, the importance of the Kaddish and its influence in this world and  the upper worlds, is repeatedly emphasized. In fact, the Gemara says that the world exists due to the words “Amen, Yehe Shmei Raba”.<br>When you say the Kaddish, or answer “Yehe Shmei Raba Mevorach”,  you fulfill "Kiddush Hashem Ba’Rabim" (publicly sanctifying Hashem’s name), which, in fact, is the primary Mitzvah for Am Yisrael.<br>From the story of the meraglim (spies), we learn that the “Eda” (congregation) is comprised of  at least ten Jews, as it is written: “Till when will be this bad Eda”?, regarding the ten spies that slander about Eretz Israel. These ten spies are named "Eda" - congregation.<br>Because of the importance of this Mitzva, Chaza”l wrote the Kaddish in Aramaic, which was the spoken language when the Kaddish was composed. Therefore, everyone would be able to publicly sanctify Hashem\'s name with complete understanding.'
//    }	
//

$scope.data = slideData.getTask($scope.$parent.$index);

}])
