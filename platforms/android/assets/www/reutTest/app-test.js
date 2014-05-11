var smartClassApp = angular.module('smartClassStudentApp', ['ui.router']);
// For Component users, it should look like this:
// var smartClassApp = angular.module('smartClassApp', [require('angular-ui-router')]);
smartClassApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/lesson");

    $stateProvider
		.state('lesson', {
		    //url: "/lesson/:lessonId",
            url: "/lesson",
		    views: {
		        "main": {
		            templateUrl: "../components/lesson/lesson.html",
		            controller: "lesson"
		        }
		    }
		})

        .state('lesson.slide', {
            //url: "/slide/:slideIndex",
            url: "/slide",
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
                }
            }
        })

      
		

       

});


