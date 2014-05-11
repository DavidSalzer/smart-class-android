var domain = "http://smart-class.cambium-team.com/dataManagement/";

var smartClassApp = angular.module('smartClassStudentApp', ['ui.router']);

//fileter to show HTML as HTML exe: <p ng-bind-html="data.html | htmlTrue">
angular.module('smartClassStudentApp').filter('htmlTrue', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
} ]);

//http AND Q SEVICE FOR AJAX
/*	
*need to includ classAjax like $scope in controller and use it lik
*	$scope.user=classAjax.getdata({type:'getUser',req:{}});
* 	$scope.user.then(
* 		function(data){
* 			console.log(data.res);
*        $scope.data.user=data.res.userName;
*    	// $scope.data.title=data[0].title;
* 		},
* 		function(error){
*
* 		}
*	);
*/
smartClassApp.factory('classAjax', ['$http', '$q', function ($http, $q) {
    return {
        getdata: function (dataTransform) {
            var deferred = $q.defer();

            $http({
                url: domain + 'json.api.php',
                method: 'POST',
                data: dataTransform
            }).
            success(function (data, status, header, config) {
                //  console.log('dfa'+data);
                deferred.resolve(data);
                //return data;
            }).
            error(function (data, status, header, config) {
                deferred.reject(data);
            })

            return deferred.promise;
        }
    }
} ])


// For Component users, it should look like this:
// var smartClassApp = angular.module('smartClassApp', [require('angular-ui-router')]);
smartClassApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/lesson/");

    $stateProvider
		.state('lesson', {
		    url: "/lesson/:lessonId",
		    //url: "/lesson",
		    views: {
		        "main": {
		            templateUrl: "../components/lesson/lesson.html",
		            controller: "lesson"
		        }
		    }
		})

        .state('lesson.slide', {
            url: "/slide/:slideIndex",
            //url: "/slide",
            views: {
                "main": {
                    templateUrl: "../components/slide/slide.html",
                    controller: "slide"
                },
                "americanQuestion@lesson.slide": {
                    templateUrl: "../components/americanQuestion/americanQuestion.html",
                    controller: "americanQuestion"
                },
                "groupMatchQuestion@lesson.slide": {
                    templateUrl: "../components/groupMatchQuestion/groupMatchQuestion.html",
                    controller: "groupMatchQuestion"
                },
                "studentItemMatchQuestion@lesson.slide": {
                    templateUrl: "../components/itemMatchQuestion/studentItemMatchQuestion.html",
                    controller: "studentItemMatchQuestion"
                },
                "studentLikeDislike@lesson.slide": {
                    templateUrl: "../components/likeDislikeQuestion/studentLikeDislike.html",
                    controller: "studentLikeDislike"
                },
                "studentOpenQuestion@lesson.slide": {
                    templateUrl: "../components/openQuestion/studentOpenQuestion.html",
                    controller: "studentOpenQuestion"
                },
                "studentQuestionsBank@lesson.slide": {
                    templateUrl: "../components/questionsBankQuestion/studentQuestionsBank.html",
                    controller: "studentQuestionsBank"
                },
                "studentSekerMultiple@lesson.slide": {
                    templateUrl: "../components/sekerMultipleQuestion/studentSekerMultiple.html",
                    controller: "studentSekerMultiple"
                },
                "studentSekerQuestion@lesson.slide": {
                    templateUrl: "../components/sekerQuestion/studentSekerQuestion.html",
                    controller: "studentSekerQuestion"
                },
                "studentSekerSlider@lesson.slide": {
                    templateUrl: "../components/sekerSliderQuestion/studentSekerSlider.html",
                    controller: "studentSekerSlider"
                },
                "chartQuestion@lesson.slide": {
                    templateUrl: "../components/chartQuestion/chartQuestion.html",
                    controller: "chartQuestion"
                },
                "listParagraphQuestion@lesson.slide": {
                    templateUrl: "../components/listParagraphQuestion/listParagraphQuestion.html",
                    controller: "listParagraphQuestion"
                },
                "textParagraph1Question@lesson.slide": {
                    templateUrl: "../components/textParagraph1Question/textParagraph1Question.html",
                    controller: "textParagraph1Question"
                },
                "textParagraph2Question@lesson.slide": {
                    templateUrl: "../components/textParagraph2Question/textParagraph2Question.html",
                    controller: "textParagraph2Question"
                },
                "textParagraph3Question@lesson.slide": {
                    templateUrl: "../components/textParagraph3Question/textParagraph3Question.html",
                    controller: "Paragraph3Question"
                },
                "textParagraph4Question@lesson.slide": {
                    templateUrl: "../components/textParagraph4Question/textParagraph4Question.html",
                    controller: "textParagraph4Question"
                },
                "urlLinkQuestion@lesson.slide": {
                    templateUrl: "../components/urlLinkQuestion/urlLinkQuestion.html",
                    controller: "urlLinkQuestion"
                },
                "videoQuestion@lesson.slide": {
                    templateUrl: "../components/videoQuestion/videoQuestion.html",
                    controller: "videoQuestion"
                }


            }
        })


        .state('login', {
            url: "/login",
            views: {
                "main": {
                    templateUrl: "../../components/login/login.html",
                    controller: "login"
                },
                "header": {
                    templateUrl: "../../components/loginHeader/loginHeader.html",
                    controller: "loginHeader"
                }
            }
        })

});


