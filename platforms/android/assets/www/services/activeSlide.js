smartClassApp.factory('lessonData', ['$stateParams', '$q', 'classAjax', 'slideData', function ($stateParams, $q, classAjax, slideData) {

    var lesson = null;

    var activeSlideId = null;
	var IndexOfActiveSlide = null;
	
    var activeSlide = null;


    return {
        //1. the regular get slide, get lesson activeSlideId. only return the active exists slide / lesson 
        getSlide: function () {

            //console.log("getSlide: the activeSlide is:");
            //console.log(activeSlide);
            return activeSlide;
        },

        getLesson: function () {

            return lesson;
        },

        getactiveSlideId: function () {

            return activeSlideId;
        },

        //2. the first time get slide
        getActiveSlide: function () {

            var deferred = $q.defer();
            //get the lesson, for active slide id
            idWatcher = classAjax.getdata({ type: 'getLesson', req: {

                lid: $stateParams.lessonId
            }
            });
            //get the active slide
            idWatcher.then(function (data) {

                console.log('the lesson:');
                console.log(data.res);
                //init the lesson var
                lesson = data.res;
                //init the id var
                activeSlideId = data.res.activeSid;
				
				//init IndexOfActiveSlide : the active INDEX
				for (var i=0;i<lesson.slide.length;i++)
				{
					if(lesson.slide[i].slideId==activeSlideId){
						
						IndexOfActiveSlide = lesson.slide[i].index;
						//console.log(IndexOfActiveSlide);
						break;
					}
						
				}
				
                slidedWatcher = classAjax.getdata({ type: 'getSlide', req: {

                    //lid:$stateParams.lessonId,
                    slideId: data.res.activeSid
                }
                });

                slidedWatcher.then(function (data) {

                    //init the slide var
                    activeSlide = data.res.tasks;
					//console.log(activeSlide);
                    slideData.setSlide(activeSlide);
                    deferred.resolve(data.res.tasks); //no need

                });

            })

            return deferred.promise;
        },

        publishSlide: function (backOrNext) {

            var deferred = $q.defer();

            var newIndexOfActiveSlide = parseInt(IndexOfActiveSlide) + parseInt(backOrNext);

            //console.log('newIndexOfActiveSlide=');
            //console.log(newIndexOfActiveSlide);//may be 0 [1-1]
         
            if (newIndexOfActiveSlide == 0) { console.log('no prev slide!'); return 0; }
            
			publishWatcher = classAjax.getdata({ type: 'publishSlide', req: {

                slideId: lesson.slide[newIndexOfActiveSlide - 1].slideId
            }
            });

            publishWatcher.then(function (data) {

                //console.log("publishWatcher data");
                //console.log(data);

                if (data.res==true) {
                    
					activeSlideId = lesson.slide[newIndexOfActiveSlide - 1].slideId;
					IndexOfActiveSlide = newIndexOfActiveSlide;
			
                    newSlidedWatcher = classAjax.getdata({ type: 'getSlide', req: {

                        slideId: activeSlideId
                    }
                    });

                    newSlidedWatcher.then(function (data) {

                        //init the slide var
                        activeSlide = data.res.tasks;
                        slideData.setSlide(activeSlide);////????
                        deferred.resolve(data.res.tasks);

                    });
                }
            })

        },
        cleanSlide: function () {

            activeSlide = null;
        }
    }
} ])
