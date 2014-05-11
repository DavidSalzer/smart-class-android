//save slide data
smartClassApp.factory('slideData', ['$stateParams', '$q', 'classAjax', function ($stateParams, $q, classAjax) {

    var activeSlide = null;
    var slide = null;
    return {
        getSlide: function () {
            return activeSlide;

        },
        setSlide: function (slideObj) {
            activeSlide=slideObj;

        },
        //get slide from server
        getSlideFromServer: function () {
            var deferred = $q.defer();

            //call another service for ajax call
            slide = classAjax.getdata({ type: 'getSlideOfLessonByIndex', req: {
                lid: $stateParams.lessonId,
                index: $stateParams.slideIndex
            }
            });

            slide.then(
                function (data) {
                    activeSlide = data.res.tasks;
                    console.log(data);
                    deferred.resolve(data);
                }
            )

            return deferred.promise;
        },
        //call from controller. return the slide from server
        loadSlide: function () {
            var deferred = $q.defer();
		
			console.log("getSldieListFromServer");
			deferred.resolve(this.getSlideFromServer());
			return deferred.promise;
		
        },
		cleanSlide:function(){
			console.log("clean");
			activeSlide=null;
		},

        getTask:function(i){
            if(activeSlide){
                return activeSlide[i].data;
            }
        }

    }
} ])
