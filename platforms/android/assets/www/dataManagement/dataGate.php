<?php
define("__ROOT__", __DIR__ ."/");

require_once(__ROOT__."config.php");
require_once(__ROOT__."function.php");
require_once(__ROOT__."db.php");
require_once(__ROOT__."modules/user.php");
require_once(__ROOT__."modules/storage.php");
require_once(__ROOT__."modules/cambiumSync.php");
require_once(__ROOT__."modules/lesson.php");
require_once(__ROOT__."modules/slide.php");
require_once(__ROOT__."modules/task.php");
require_once(__ROOT__."modules/school.php");
require_once(__ROOT__."modules/class.php");


session_start();
$db = new Db($conf->DB->host,$conf->DB->DBName,$conf->DB->userName,$conf->DB->pass,$conf->DB->logError);
$user = new User();
$storage = new Storage();
$cambiumSync = new CambiumSync();
$lesson = new Lesson();
$slide = new Slide();
$task = new Task();
$school = new School();
$schoolClass = new SchoolClass();

$validArray=array(
	(object)array('id'=>"uid",'class'=>$user,'validFunc'=>'chackuidExist'),
	(object)array('id'=>"lid",'class'=>$lesson,'validFunc'=>'chacklidExist'),
	(object)array('id'=>"slideId",'class'=>$slide,'validFunc'=>'chackslideIdExist'),
	(object)array('id'=>"tid",'class'=>$task,'validFunc'=>'chackstideIdExist'),
	(object)array('id'=>"sid",'class'=>$school,'validFunc'=>'chacksidExist'),
	(object)array('id'=>"cid",'class'=>$schoolClass,'validFunc'=>'chackcidExist'),
	(object)array('id'=>"templateLid",'class'=>$lesson,'validFunc'=>'chacklidExist'),
	(object)array('id'=>"uidTeacher",'class'=>$user,'validFunc'=>'chackuidExist')
	
);

class DataGate{

	public static function getData($type, $req){
		global $validArray;
		global $user;
		//global $lesson;
		//global $slide;
		//global $text;
		//check type
		if (!array_key_exists($type, DataGate::$requestList)){
			return (object)array("error" => "'".$type."' no valid type");
        }
		//check Requirement
		foreach (DataGate::$requestList[$type]->requirement as $value) {
                if (!property_exists($req,$value)){
						return (object)array("error" => "'".$value."' Parameter miss");
                }
        }
		if (!is_object($req)){
			return (object)array("error" => "req is not object");
        }
		//check Valid
		foreach ($validArray as $value){ 
			$id=$value->id;
			if (property_exists($req,$id) && !call_user_func(array($value->class,$value->validFunc), $req->$id)) 
				return (object)array("error" => "not valid ".$id);
		}
		
		/*
		if ((property_exists($req,"uid") && !$user->chackuidExist($req->uid))
			|| (property_exists($req,"lid") && !$lesson->chacklidExist($req->lid))
			|| (property_exists($req,"slideId") && !$slide->chackslideIdExist($req->slideId))
			// || (property_exists($req,"tid") && !$text->chacktidExist($req->tid))
			){
				return (object)array("error" => "not valid id");
			}
		*/
		//check Permission
		$userType=$user->getUser()->type;
		if (isset(DataGate::$requestList[$type]->permission) && !in_array($userType,DataGate::$requestList[$type]->permission)){
				return (object)array("error" => "non permission");
        }
		//@TODO add permission function per itch function.
		
		//send to the function
        $obj=DataGate::$requestList[$type]->class;
        $fuName=DataGate::$requestList[$type]->function;
		$parameterArray=array();
		if (property_exists(DataGate::$requestList[$type],"functionParameter"))
			foreach (DataGate::$requestList[$type]->functionParameter as $value){
				$parameterArray[]=$req->$value;
			}
		$res=call_user_func_array(array($obj,$fuName), $parameterArray);
		return $res;
	}


	
	private static $requestList=array();
	public static function initRequestList(){
		global $user;
		global $lesson;
		global $slide;
		global $task;
		global $cambiumSync;
		global $school;
		global $schoolClass;
		
		//------------------------------User---------------------------------------------------
		DataGate::$requestList["login"]=(object)array(
				"requirement" => array("userName","pass"),
				"class" => $user,
				"function" => "login",
				"functionParameter"=> array("userName","pass")
		);
		DataGate::$requestList["logout"]=(object)array(
				"requirement" => array(),
				"class" => $user,
				"function" => "logout"
		);
		DataGate::$requestList["getUser"]=(object)array(
				"requirement" => array(),
				"class" => $user,
				"function" => "getUser"
		);
		DataGate::$requestList["addUser"]=(object)array(
				"requirement" => array("userName","pass","type"),
				"permission" => array("admin"),
				"class" => $user,
				"function" => "addUser",
				"functionParameter"=> array("type","userName","pass")
		);
		DataGate::$requestList["updateUserPass"]=(object)array(
				"requirement" => array("oldPass","newPass"),
				"class" => $user,
				"function" => "updateUserPass",
				"functionParameter"=> array("newPass","oldPass")
		);
		DataGate::$requestList["updateOtherUserPass"]=(object)array(
				"requirement" => array("uid","newPass"),
				"permission" => array("admin","teacher"),//pini add teacher for settings
				"class" => $user,
				"function" => "updateOtherUserPass",
				"functionParameter"=> array("uid","newPass")
		);
		DataGate::$requestList["deleteUser"]=(object)array(
				"requirement" => array("uid"),
				"permission" => array("admin","teacher"),//pini add teacher for settings
				"class" => $user,
				"function" => "deleteUser",
				"functionParameter"=> array("uid")
		);
		//------------------------------CambiumSync---------------------------------------------------
		DataGate::$requestList["cambiumSync-getKey"]=(object)array(
				"requirement" => array(),
				"class" => $cambiumSync,
				"function" => "getKey",
		);
		//------------------------------school---------------------------------------------------
		DataGate::$requestList["addSchool"]=(object)array(
				"requirement" => array("name","lessonNumber"),
				"permission" => array("admin"),
				"class" => $school,
				"function" => "addSchool",
				"functionParameter"=> array("name","lessonNumber")
		);
		DataGate::$requestList["editSchool"]=(object)array(
				"requirement" => array("sid","name","lessonNumber"),
				"permission" => array("admin"),
				"class" => $school,
				"function" => "addSchool",
				"functionParameter"=> array("sid","name","lessonNumber")
		);
		DataGate::$requestList["addTeacherToSchool"]=(object)array(
				"requirement" => array("sid","userName","pass"),
				"permission" => array("admin"),
				"class" => $school,
				"function" => "addTeacherToSchool",
				"functionParameter"=> array("sid","userName","pass")
		);
		DataGate::$requestList["getSchool"]=(object)array(
				"requirement" => array("sid"),
				"permission" => array("admin","teacher"),//reut add teacher for header
				"class" => $school,
				"function" => "getSchool",
				"functionParameter"=> array("sid")
		);
		DataGate::$requestList["getAllScholl"]=(object)array(
				"requirement" => array(),
				"permission" => array("admin"),
				"class" => $school,
				"function" => "getAllScholl",
				"functionParameter"=> array()
		);	
		DataGate::$requestList["getTeacherOfScholl"]=(object)array(
				"requirement" => array("sid"),
				"permission" => array("admin"),
				"class" => $school,
				"function" => "getTeacherOfScholl",
				"functionParameter"=> array("sid")
		);
		
		
		//------------------------------class---------------------------------------------------
		DataGate::$requestList["addClass"]=(object)array(
				"requirement" => array("name","grade","sid"),
				"permission" => array("admin","editor","teacher"),
				"class" => $schoolClass,
				"function" => "addClass",
				"functionParameter"=> array("name","grade","sid")
		);
		DataGate::$requestList["editClass"]=(object)array(
				"requirement" => array("cid","name","grade"),
				"permission" => array("admin","editor","teacher"),
				"class" => $schoolClass,
				"function" => "editClass",
				"functionParameter"=> array("cid","name","grade")
		);
		DataGate::$requestList["addPupilToClass"]=(object)array(
				"requirement" => array("cid","userName","pass"),
				"permission" => array("admin","editor","teacher"),
				"class" => $schoolClass,
				"function" => "addPupilToClass",
				"functionParameter"=> array("cid","userName","pass")
		);
		DataGate::$requestList["getClass"]=(object)array(
				"requirement" => array("cid"),
				"permission" => array("admin","editor","teacher"),
				"class" => $schoolClass,
				"function" => "getClass",
				"functionParameter"=> array("cid")
		);
		DataGate::$requestList["getClassOfSchool"]=(object)array(
				"requirement" => array("sid"),
				"permission" => array("admin","editor","teacher"),
				"class" => $schoolClass,
				"function" => "getClassOfSchool",
				"functionParameter"=> array("sid")
		);

		//------------------------------lesson---------------------------------------------------
		DataGate::$requestList["addTemplateLesson"]=(object)array(
				"requirement" => array("name"),
				"permission" => array("admin","editor"),
				"class" => $lesson,
				"function" => "addTemplateLesson",
				"functionParameter"=> array("name")
		);
		DataGate::$requestList["getAlltemplateLesson"]=(object)array(
				"requirement" => array(),
				"permission" => array("admin","editor","teacher"),
				"class" => $lesson,
				"function" => "getAlltemplateLesson",
		);
		DataGate::$requestList["getLesson"]=(object)array(
				"requirement" => array("lid"), 
				"permission" => array("admin","editor","teacher"),
				"class" => $lesson,
				"function" => "getLesson",
				"functionParameter"=> array("lid")
		);
		DataGate::$requestList["addLessonToClass"]=(object)array(
				"requirement" => array("templateLid","cid","uidTeacher"), 
				"permission" => array("admin","editor","teacher"),
				"class" => $lesson,
				"function" => "addLessonToClass",
				"functionParameter"=> array("templateLid","cid","uidTeacher")
		);
		DataGate::$requestList["getLessonOfClass"]=(object)array(
				"requirement" => array("cid"), 
				"permission" => array("teacher"),
				"class" => $lesson,
				"function" => "getLessonOfClass",
				"functionParameter"=> array("cid")
		);
		DataGate::$requestList["activeLesson"]=(object)array(
				"requirement" => array("lid"), 
				"permission" => array("admin","editor","teacher"),
				"class" => $lesson,
				"function" => "activeLesson",
				"functionParameter"=> array("lid")
		);	
		DataGate::$requestList["unActiveLesson"]=(object)array(
				"requirement" => array("lid"), 
				"permission" => array("admin","editor","teacher"),
				"class" => $lesson,
				"function" => "unActiveLesson",
				"functionParameter"=> array("lid")
		);
		DataGate::$requestList["getActiveLessonOfClass"]=(object)array(
				"requirement" => array("cid"), 
				"permission" => array("admin","editor","teacher"),
				"class" => $lesson,
				"function" => "getActiveLessonOfClass",
				"functionParameter"=> array("cid")
		);
		DataGate::$requestList["pupilInsertToLesson"]=(object)array(
				"requirement" => array("lid"), 
				"permission" => array("pupil"),
				"class" => $lesson,
				"function" => "pupilInsertToLesson",
				"functionParameter"=> array("lid")
		);
		DataGate::$requestList["pupilLeaveLesson"]=(object)array(
				"requirement" => array("lid"), 
				"permission" => array("pupil"),
				"class" => $lesson,
				"function" => "pupilLeaveLesson",
				"functionParameter"=> array("lid")
		);
		//edit lesson
		
		//------------------------------slide---------------------------------------------------
		DataGate::$requestList["addSlide"]=(object)array(
				"requirement" => array("lid","title"),
				"permission" => array("admin","editor","teacher"),
				"class" => $slide,
				"function" => "addSlide",
				"functionParameter"=> array("lid","title")
		);		
		
		DataGate::$requestList["getSlide"]=(object)array(
				"requirement" => array("slideId"),
				"permission" => array("admin","editor","teacher"),
				"class" => $slide,
				"function" => "getSlide",
				"functionParameter"=> array("slideId")
		);
		DataGate::$requestList["getSlideOfLessonByIndex"]=(object)array(
				"requirement" => array("lid","index"),
				"permission" => array("admin","editor","teacher","pupil"),
				"class" => $slide,
				"function" => "getSlideOfLessonByIndex",
				"functionParameter"=> array("lid","index")
		);
		DataGate::$requestList["publishSlide"]=(object)array(
				"requirement" => array("slideId"),
				"permission" => array("admin","editor","teacher"),
				"class" => $slide,
				"function" => "publishSlide",
				"functionParameter"=> array("slideId")
		);
		//edit slide
		//publish slide

		//------------------------------task---------------------------------------------------
		DataGate::$requestList["addTask"]=(object)array(
				"requirement" => array("slideId","data"),
				"permission" => array("admin","editor","teacher"),
				"class" => $task,
				"function" => "addTask",
				"functionParameter"=> array("slideId","data")
		);
		DataGate::$requestList["getTask"]=(object)array(
				"requirement" => array("tid"),
				"permission" => array("admin","editor","teacher"),
				"class" => $task,
				"function" => "getTask",
				"functionParameter"=> array("tid")
		);
		DataGate::$requestList["getTaskInSlide"]=(object)array(
				"requirement" => array("slideId"),
				"permission" => array("admin","editor","teacher"),
				"class" => $task,
				"function" => "getTaskInSlide",
				"functionParameter"=> array("slideId")
		);
		
		DataGate::$requestList["answerTask"]=(object)array(
			"requirement" => array("tid","data"),
			"permission" => array("pupil"),
			"class" => $task,
			"function" => "answerTask",
			"functionParameter"=> array("tid","data")
		);
		

		//edit task
		
		///////////////////////////////////////////////////////////////
		//answer
		//notebook
		
	}
	


}
DataGate::initRequestList();