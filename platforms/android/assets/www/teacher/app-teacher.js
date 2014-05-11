var smartClassApp = angular.module('smartClassTeacherApp', ['ui.router']);
// For Component users, it should look like this:
// var smartClassApp = angular.module('smartClassApp', [require('angular-ui-router')]);
//fileter to show HTML as HTML exe: <p ng-bind-html="data.html | htmlTrue">
angular.module('smartClassTeacherApp').filter('htmlTrue',['$sce',function($sce){
     return function(text) {
            return $sce.trustAsHtml(text);
        };
}]);


//http AND Q SEVICE FOR AJAX
/*  
*need to includ classAjax like $scope in controller and use it lik
*   $scope.user=classAjax.getdata({type:'getUser',req:{}});
*   $scope.user.then(
*       function(data){
*           console.log(data.res);
*        $scope.data.user=data.res.userName;
*       // $scope.data.title=data[0].title;
*       },
*       function(error){
*
*       }
*   );
*/
smartClassApp.factory('classAjax', ['$http','$q',function ($http,$q) {
        return{    
           getdata:function(dataTransform){
            var deferred = $q.defer();
            
           $http({
                url:'/dataManagement/json.api.php',
                method:'POST',
                data:dataTransform,
            }).
            success(function (data,status,header,config) {
            //  console.log('dfa'+data);
              deferred.resolve(data);
              //return data;
            }).
            error(function(data,status,header,config){
                 deferred.reject(data);
            })
            
            return deferred.promise;
           },
        }    
        }])



smartClassApp.config(function ($stateProvider, $urlRouterProvider) {
    
	
	$urlRouterProvider.otherwise("selectClass");

    $stateProvider
		.state('lessons', {
            url: '/:schoolId/class/:classId/lessons',
            views: {
                'main': { templateUrl: '../components/teacher.lessons/teacher.lessons.html' },
                'header@lessons': { 
					templateUrl: "../components/teacher.header/teacher.header.html",
					controller: "header"
				},
                "nav@lessons": {
		            templateUrl: "../components/teacher.nav/teacher.nav2.html",
		            controller: "nav"
		        },
				'lessonsTable@lessons':{
					templateUrl: "../components/teacher.lessonsTable/teacher.lessonsTable.html",
		            controller: "lessonsTable"
				}
            }
            
        })
		
		.state('playLesson', {
            url: '/:schoolId/class/:classId/playLesson/:lessonId',
            views: {
                'main': { 
					templateUrl: '../components/teacher.playLesson/teacher.playLesson.html',
					controller: "playLesson"
				},
                'header@playLesson': { 
					templateUrl: "../components/teacher.header/teacher.header.html",
					controller: "header"
				},
                "nav@playLesson": {
		            templateUrl: "../components/teacher.nav/teacher.nav5.html",
		            controller: "nav"
		        },
				"slidesList@playLesson": {
		            templateUrl: "../components/teacher.slidesList/teacher.slidesList.html",
		            controller: "slidesList"
		        },
				"slide@playLesson": {
		            templateUrl: "../components/slide/slide.html",
		            controller: "PlaySlide"
		        },
				 "americanQuestion@playLesson": {
                    templateUrl: "../components/americanQuestion/americanQuestion.html",
                    controller: "americanQuestion"
                },
                "groupMatchQuestion@playLesson": {
                    templateUrl: "../components/groupMatchQuestion/groupMatchQuestion.html",
                    controller: "groupMatchQuestion"
                },
                "studentItemMatchQuestion@playLesson": {
                    templateUrl: "../components/itemMatchQuestion/studentItemMatchQuestion.html",
		            controller: "studentItemMatchQuestion"
                },
                 "studentLikeDislike@playLesson": {
                    templateUrl: "../components/likeDislikeQuestion/studentLikeDislike.html",
		            controller: "studentLikeDislike"
                },
                "studentOpenQuestion@playLesson": {
                    templateUrl: "../components/openQuestion/studentOpenQuestion.html",
		            controller: "studentOpenQuestion"
                },
                "studentQuestionsBank@playLesson": {
                    templateUrl: "../components/questionsBankQuestion/studentQuestionsBank.html",
		            controller: "studentQuestionsBank"
                },
                "studentSekerMultiple@playLesson": {
                    templateUrl: "../components/sekerMultipleQuestion/studentSekerMultiple.html",
		            controller: "studentSekerMultiple"
                },
                "studentSekerQuestion@playLesson": {
                    templateUrl: "../components/sekerQuestion/studentSekerQuestion.html",
		            controller: "studentSekerQuestion"
                },
                "studentSekerSlider@playLesson": {
                    templateUrl: "../components/sekerSliderQuestion/studentSekerSlider.html",
		            controller: "studentSekerSlider"
                },
                "chartQuestion@playLesson": {
                    templateUrl: "../components/chartQuestion/chartQuestion.html",
		            controller: "chartQuestion"
                },
                "listParagraphQuestion@playLesson": {
                    templateUrl: "../components/listParagraphQuestion/listParagraphQuestion.html",
		            controller: "listParagraphQuestion"
                },
                "textParagraph1Question@playLesson": {
                    templateUrl: "../components/textParagraph1Question/textParagraph1Question.html",
		            controller: "textParagraph1Question"
                },
                "textParagraph2Question@playLesson": {
                    templateUrl: "../components/textParagraph2Question/textParagraph2Question.html",
		            controller: "textParagraph2Question"
                },
                "textParagraph3Question@playLesson": {
                    templateUrl: "../components/textParagraph3Question/textParagraph3Question.html",
		            controller: "textParagraph3Question"
                },
                 "textParagraph4Question@playLesson": {
                    templateUrl: "../components/textParagraph4Question/textParagraph4Question.html",
		            controller: "textParagraph4Question"
                },
                "urlLinkQuestion@playLesson": {
                    templateUrl: "../components/urlLinkQuestion/urlLinkQuestion.html",
		            controller: "urlLinkQuestion"
                },
                "videoQuestion@playLesson": {
                    templateUrl: "../components/videoQuestion/videoQuestion.html",
		            controller: "videoQuestion"
                },
				"footer@playLesson": {
		            templateUrl: "../components/teacher.footer/teacher.footer.html",
		            controller: "footer"
		        } 
            }
		})

        .state('playLesson.results', {
            url: '/results',
            views: {
                'mainResults': { 
					templateUrl: '../components/teacher.results/teacher.results.html'
					
				},
			   'studentsTable@playLesson.results': { 
					templateUrl: "../components/teacher.studentsTable/teacher.studentsTable.html",
					controller: "studentsTable"
				},
                "studentAnswer@playLesson.results": {
		            templateUrl: "../components/teacher.studentAnswer/teacher.studentAnswer.html",
		            controller: "studentAnswer"
		        }		
            }
		})
		
		.state('playLesson.results.id', {
            url: '/:studentID',
            views: {
               
                "studentAnswer": {
		            templateUrl: "../components/teacher.studentAnswer/teacher.studentAnswer.html",
		            controller: "studentAnswer"
		        }, 
				"answContent@playLesson.results.id": {
		            templateUrl: "../components/teacher.answContent/teacher.answContent.html",
		            controller: "answContent"
		        },
				"openQuestionAns@playLesson.results.id": {
		             templateUrl: "../components/teacher.openQuestionAns/teacher.openQuestionAns.html",
		             controller: "openQuestionAns"
		        },
				"sekerQuestionAns@playLesson.results.id": {
				 templateUrl: "../components/teacher.sekerQuestionAns/teacher.sekerQuestionAns.html",
				 controller: "sekerQuestionAns"
		        },
				"sekerMultipleQuestionAns@playLesson.results.id": {
				 templateUrl: "../components/teacher.sekerMultipleQuestionAns/teacher.sekerMultipleQuestionAns.html",
				 controller: "sekerMultipleQuestionAns"
		        },
				"likeDislikeQuestionAns@playLesson.results.id": {
				 templateUrl: "../components/teacher.likeDislikeQuestionAns/teacher.likeDislikeQuestionAns.html",
				 controller: "likeDislikeQuestionAns"
		        },
				"groupMatchQuestionAns@playLesson.results.id": {
				 templateUrl: "../components/teacher.groupMatchQuestionAns/teacher.groupMatchQuestionAns.html",
				 controller: "groupMatchQuestionAns"
		        }
            }
		})
	
		.state('playLesson.preview', {
            url: '/preview/:slideIndex',
            views: {
                'preview': { 
					templateUrl: '../components/teacher.slidePreview/teacher.slidePreview.html',
					//controller: "slidePreview"
				},
				"slide@playLesson.preview": {
		            templateUrl: "../components/slide/slide.html",
		            controller: "slide"
		        },
				 "americanQuestion@playLesson.preview": {
                    templateUrl: "../components/americanQuestion/americanQuestion.html",
                    controller: "americanQuestion"
                },
                "groupMatchQuestion@playLesson.preview": {
                    templateUrl: "../components/groupMatchQuestion/groupMatchQuestion.html",
                    controller: "groupMatchQuestion"
                },
                "studentItemMatchQuestion@playLesson.preview": {
                    templateUrl: "../components/itemMatchQuestion/studentItemMatchQuestion.html",
		            controller: "studentItemMatchQuestion"
                },
                 "studentLikeDislike@playLesson.preview": {
                    templateUrl: "../components/likeDislikeQuestion/studentLikeDislike.html",
		            controller: "studentLikeDislike"
                },
                "studentOpenQuestion@playLesson.preview": {
                    templateUrl: "../components/openQuestion/studentOpenQuestion.html",
		            controller: "studentOpenQuestion"
                },
                "studentQuestionsBank@playLesson.preview": {
                    templateUrl: "../components/questionsBankQuestion/studentQuestionsBank.html",
		            controller: "studentQuestionsBank"
                },
                "studentSekerMultiple@playLesson.preview": {
                    templateUrl: "../components/sekerMultipleQuestion/studentSekerMultiple.html",
		            controller: "studentSekerMultiple"
                },
                "studentSekerQuestion@playLesson.preview": {
                    templateUrl: "../components/sekerQuestion/studentSekerQuestion.html",
		            controller: "studentSekerQuestion"
                },
                "studentSekerSlider@playLesson.preview": {
                    templateUrl: "../components/sekerSliderQuestion/studentSekerSlider.html",
		            controller: "studentSekerSlider"
                },
                "chartQuestion@playLesson.preview": {
                    templateUrl: "../components/chartQuestion/chartQuestion.html",
		            controller: "chartQuestion"
                },
                "listParagraphQuestion@playLesson.preview": {
                    templateUrl: "../components/listParagraphQuestion/listParagraphQuestion.html",
		            controller: "listParagraphQuestion"
                },
                "textParagraph1Question@playLesson.preview": {
                    templateUrl: "../components/textParagraph1Question/textParagraph1Question.html",
		            controller: "textParagraph1Question"
                },
                "textParagraph2Question@playLesson.preview": {
                    templateUrl: "../components/textParagraph2Question/textParagraph2Question.html",
		            controller: "textParagraph2Question"
                },
                "textParagraph3Question@playLesson.preview": {
                    templateUrl: "../components/textParagraph3Question/textParagraph3Question.html",
		            controller: "textParagraph3Question"
                },
                 "textParagraph4Question@playLesson.preview": {
                    templateUrl: "../components/textParagraph4Question/textParagraph4Question.html",
		            controller: "textParagraph4Question"
                },
                "urlLinkQuestion@playLesson.preview": {
                    templateUrl: "../components/urlLinkQuestion/urlLinkQuestion.html",
		            controller: "urlLinkQuestion"
                },
                "videoQuestion@playLesson.preview": {
                    templateUrl: "../components/videoQuestion/videoQuestion.html",
		            controller: "videoQuestion"
                },
				"footer@playLesson.preview": {
		            templateUrl: "../components/teacher.footer/teacher.footer.html",
		            controller: "footer"
		        } 
                
            }
		})
		
		
		.state('selectClass', {
            url: '/:schoolId/selectClass',
            views: {
                'main': { 
					templateUrl: '../components/teacher.selectClass/teacher.selectClass.html', 
					controller: "selectClass"
				} ,
				'header@selectClass': { 
					templateUrl: "../components/teacher.header/teacher.header.html",
					controller: "header"
				},
                "nav@selectClass": {
		            templateUrl: "../components/teacher.nav/teacher.nav0.html",
		            controller: "nav"
		        } 
                
            }
		})
		
		.state('settings', {
            url: '/:schoolId/class/:classId/settings',
            views: {
                'main': { 
					templateUrl: '../components/teacher.settings/teacher.settings.html',
					controller: "settings"
				} ,
				'header@settings': { 
					templateUrl: "../components/teacher.header/teacher.header.html",
					controller: "header"
				},
                "nav@settings": {
		            templateUrl: "../components/teacher.nav/teacher.nav3.html",
		            controller: "nav"
		        } 
                
            }
		})
		
		.state('login',{
			url:'/login',
			views:{
				"main": {
                    templateUrl: "../../components/login/loginTeacher.html",
                    controller: "loginTeacher"
                },
                "header": {
                    templateUrl: "../../components/loginHeader/loginHeader.html",
                    controller: "loginHeader"
                }	
			}
		
		})
		
			
			
            
});
