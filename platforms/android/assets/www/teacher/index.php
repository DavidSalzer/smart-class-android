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
		location.replace("/teacher/login/#/login");
    </script>
<?php	}
?>
<!DOCTYPE html>
<html data-ng-app="smartClassTeacherApp">
    <head>
        <!-- from design !-->
        <meta charset="utf-8" />

	<title>Smart Class</title>
	<link rel="stylesheet" type="text/css" href="../css/reset.css" />
	<link rel="stylesheet" type="text/css" href="../css/style.css" />
	<link rel="stylesheet" type="text/css" href="../css/questions.css" />
	<link rel="stylesheet" type="text/css" href="../css/teacher_container.css" />
	<link rel="stylesheet" type="text/css" href="../css/teacher_lessons.css" />
	<link rel="stylesheet" type="text/css" href="../css/media_teacher.css" />
	<link rel="stylesheet" type="text/css" href="../css/teacher_prepare.css" />
	<link rel="stylesheet" type="text/css" href="../css/class_select.css" />
	<link rel="stylesheet" type="text/css" href="../css/teacher_settings.css" />
	
	<!-- <link rel="stylesheet" type="text/css" href="../js/jquery-ui-1.10.4_custom/css/smoothness/jquery-ui-1.10.4.custom.min.css" /> -->
	
	
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
	<script src="../js/vendor/angular-ui-router.min.js"></script>
	<script src="app-teacher.js"></script>
	<script src="../js/socket.io.js"></script>
	
	 <script src="../services/slideData.js"></script>
	 <script src="../services/activeSlide.js"></script>
	 <script src="../services/cambiumSyncSocket.js"></script>
	 
	<script src="../components/teacher.lessonsTable/teacher.lessonsTable.js"></script>
	<script src="../components/teacher.header/teacher.header.js"></script>
	<script src="../components/teacher.footer/teacher.footer.js"></script>
	<script src="../components/teacher.nav/teacher.nav.js"></script>
	<script src="../components/teacher.playLesson/teacher.playLesson.js"></script>
	<script src="../components/teacher.studentsList/teacher.studentsList.js"></script>
	<script src="../components/teacher.slidesList/teacher.slidesList.js"></script>
	<script src="../components/teacher.slidePreview/teacher.slidePreview.js"></script>
	<script src="../components/teacher.selectClass/teacher.selectClass.js"></script>
	<script src="../components/teacher.settings/teacher.settings.js"></script>
	
	
	
	
	
	<script src="../components/teacher.studentAnswer/teacher.studentAnswer.js"></script>
	<script src="../components/teacher.answContent/teacher.answContent.js"></script>
	<script src="../components/teacher.studentsTable/teacher.studentsTable.js"></script>
	<script src="../components/teacher.openQuestionAns/teacher.openQuestionAns.js"></script>
	<script src="../components/teacher.sekerQuestionAns/teacher.sekerQuestionAns.js"></script>
	<script src="../components/teacher.sekerMultipleQuestionAns/teacher.sekerMultipleQuestionAns.js"></script>
	<script src="../components/teacher.likeDislikeQuestionAns/teacher.likeDislikeQuestionAns.js"></script>
	<script src="../components/teacher.groupMatchQuestionAns/teacher.groupMatchQuestionAns.js"></script>
	
	<script src="../components/slide/slide.js"></script>
	<script src="../components/slide/PlaySlide.js"></script>
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
    <body>
        <style>
            .teacher_play_actions_item span{
                line-height: 3.3em;
            }
            ul#teacher_navigation li a{
                line-height: 3em;
            }
            div.connected_lesson_icon {
            line-height: 2;
            }
        </style>
        <div data-ui-view="main" style="height: 100%;"></div>
		
    </body>
</html>