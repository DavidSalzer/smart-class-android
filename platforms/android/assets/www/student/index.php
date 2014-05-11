<?php
ob_start();
require_once("../dataManagement/dataGate.php");
  $res=DataGate::getData("getUser", (object)array());
	if($res->uid != 0){
		?>
        <script>
		//if user is login
		console.log('user is login!');
        </script>
<?php        
	}else{
?>	
	<script>
		//user is log in
		location.replace("/student/login/#/login");
    </script>
<?php	}
?>
<!doctype html>
<html data-ng-app="smartClassStudentApp">
<head>
    <!-- from design !--> 
    <meta charset="utf-8" />

    <title>Smart Class</title>
    <link rel="stylesheet" type="text/css" href="../css/reset.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <link rel="stylesheet" type="text/css" href="../css/questions.css" />
    <link rel="stylesheet" type="text/css" href="../css/student_container.css" />
    <link rel="stylesheet" type="text/css" href="../css/media_student.css" />

    <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700' rel='stylesheet' type='text/css'>   

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script><!--//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js-->
    <!--<script src="../js/angular-animate.min.js"></script>-->
    <script src="../js/vendor/angular-ui-router.min.js"></script>
    <script src="../js/socket.io.js"></script>

    <script src="app-student.js"></script>

   <script src="../services/slideData.js"></script>
	 <script src="../services/activeSlide.js"></script>
	 <script src="../services/cambiumSyncSocket.js"></script>

    <script src="../components/lesson/lesson.js"></script>
    <script src="../components/slide/slide.js"></script>
    <script src="../components/americanQuestion/slide.americanQuestion.js"></script>
    <script src="../components/groupMatchQuestion/slide.groupMatchQuestion.js"></script>
    <script src="../components/itemMatchQuestion/slide.studentItemMatchQuestion.js"></script>
    <script src="../components/likeDislikeQuestion/slide.studentLikeDislike.js"></script>
    <script src="../components/openQuestion/slide.studentOpenQuestion.js"></script>
    <script src="../components/questionsBankQuestion/slide.studentQuestionsBank.js"></script>
    <script src="../components/sekerMultipleQuestion/slide.studentSekerMultiple.js"></script>
    <script src="../components/sekerQuestion/slide.studentSekerQuestion.js"></script>    
    <script src="../components/sekerSliderQuestion/slide.studentSekerSlider.js"></script>
    <script src="../components/chartQuestion/slide.chartQuestion.js"></script>
    <script src="../components/listParagraphQuestion/slide.listParagraphQuestion.js"></script>
    <script src="../components/textParagraph1Question/slide.textParagraph1Question.js"></script>
    <script src="../components/textParagraph2Question/slide.textParagraph2Question.js"></script>
    <script src="../components/textParagraph3Question/slide.textParagraph3Question.js"></script>
    <script src="../components/textParagraph4Question/slide.textParagraph4Question.js"></script>
    <script src="../components/urlLinkQuestion/slide.urlLinkQuestion.js"></script>
    <script src="../components/videoQuestion/slide.videoQuestion.js"></script>

    
    <!--<script src="../components/general/slide.studentItemMatch.js"></script>-->
                 
</head>
<body class="background_body_blue image_back">
    <!--<a ui-sref="lesson">lesson</a>-->
    <div data-ui-view="main" class="main_student_container">
    </div>  
    <div data-ui-view="popUp">
    </div>  
</body>
</html>