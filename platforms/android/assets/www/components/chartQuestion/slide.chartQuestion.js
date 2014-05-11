smartClassApp.controller('chartQuestion', ['$scope', '$timeout','slideData', function ($scope, $timeout,slideData) {
    $scope.data = {
        user: "Pnina Lorman",
        title: "Tfila",
        chart: [
    	{ name: 'Option Name1', rank: '80%', color: '#3ba1bf' },
    	{ name: 'Option Name2', rank: '60%', color: '#e75955' },
    	{ name: 'Option Name3', rank: '40%', color: '#4dbb90' },
    	{ name: 'Option Name4', rank: '75%', color: '#556678' },
    	{ name: 'Option Name4', rank: '100%', color: 'pink' },
	]

    }

    //start animation after 1 S- for chart
    $timeout(function () {
        for (var i = 0; i < $scope.data.chart.length; i++) {
            angular.element(document.getElementById('chart' + i)).css("height", $scope.data.chart[i].rank);
        }
    }, 1000);

   // $scope.test = slideData.getSldieList();
   // $scope.test.then(
   //function (data) {
   //    console.log("&&&&&&&&&&");
   //    console.log(data);
   //});
} ])
