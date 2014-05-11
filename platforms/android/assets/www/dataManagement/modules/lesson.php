<?php
class Lesson{

	function __construct() {
		global $cambiumSync;
    }
	
	private function addLesson($name,$isTemplate,$uidTeacher,$cid){
		global $db;
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `lesson` (`cid`, `name`, `uid-teacher`,`isTemplate`) VALUES ( :cid, :name, :uidTeacher, :isTemplate);",
			'par' => array( 'cid' => $cid, 'isTemplate' => $isTemplate, 'uidTeacher' => $uidTeacher, 'name' => $name),
		));
		if ($result){
			$lid=$db->getLastInsertId();
			if ($lid>0){
				return (object)array(
					"result" => "success",
					"lid" => $lid
				);
			}
			else 
				return (object)array("err" => "db err");
		}
		return (object)array("err" => "db err");
	}

	
	public function addTemplateLesson($name){
		return $this->addLesson($name,true,null,null);
		 /*global $db;
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `lesson` (`cid`, `name`, `uid-teacher`,`isTemplate`) VALUES ( null, :name, null, true);",
			'par' => array( 'name' => $name),
		));
		if ($result){
			$lid=$db->getLastInsertId();
			if ($lid>0){
				return (object)array(
					"result" => "success",
					"lid" => $lid
				);
			}
			else 
				return (object)array("err" => "db err");
		}
		return (object)array("err" => "db err");
		*/
	}
	
	public function getAlltemplateLesson(){
		global $db;
		return $db->smartQuery(array(
			'sql' => "SELECT `lid`, name FROM `lesson` where `isTemplate`=1",
			'par' => array(),
			'ret' => 'all'
		));
	}
	
	public function getLesson($lid){
		global $slide;
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT * FROM `lesson` where `lid`=:lid",
			'par' => array("lid" => $lid),
			'ret' => 'fetch-assoc'
		));
		$row["slide"]=$slide->getLessonSlide($lid); 
		return (object)$row;
	}
	
	public function addLessonToClass($templateLid,$cid,$uidTeacher){
		global $slide;
		global $task;
		$template=$this->getLesson($templateLid);
		if ($template->isTemplate==0){
			return (object)array("err" => "not a template"); 
		}
		//add lesson.
		$newLesson=$this->addLesson($template->name,false,$uidTeacher,$cid);
		if (!property_exists ($newLesson,"lid")) //error when add user
			return $newLesson;
		$lid=$newLesson->lid;
		
		//copy slide
		foreach ($template->slide as $slideValue){
			$newSlide=$slide->addSlide($lid,$slideValue["title"]);
			$sid=$newSlide->slideId;
			//copyTask
			$templateTask=$task->getTaskInSlide($slideValue["slideId"]);
			foreach ($templateTask as $taskValue){
				$task->addTask($sid,$taskValue["data"]);
			}
		}
		
		return $newLesson;
	}
	
	public function getLessonOfClass($cid){
		//return the lesson of the cornet teacher.
		global $db;
		global $slide;
		global $user;
		$activeUser=$user->getUser();
		return $db->smartQuery(array(
			'sql' => "SELECT `lid`, name, isActive, activeSid FROM `lesson` where `cid`=:cid AND `uid-teacher`=:uid",
			'par' => array("cid" => $cid, "uid" => $activeUser->uid),
			'ret' => 'all'
		));
	}
	
	public function activeLesson($lid){
		global $db;	
		global $slide;	
		$leesionObject=$this->getLesson($lid);
		if ($leesionObject->isTemplate==1){
			return (object)array("err" => "template lesson"); 
		}		

		//check if other lesson active to class
		if ($this->getActiveLessonOfClass($leesionObject->cid)!=null)
			return (object)array("err" => "there is over lesson active for this class"); 

		// active the lesson
		$activeSid=$leesionObject->activeSid;
		if ($activeSid==null){
			if (count($leesionObject->slide)==0) 
				return (object)array("err" => "there is not slide to this lesson");
			$activeSid=$leesionObject->slide[0]["slideId"];
		}
		$count = $db->smartQuery(array(
			'sql' => "UPDATE `lesson` set `isActive`=true WHERE `lid`=:lid;",
			'par' => array('lid' => $lid),
			'ret' => 'count'
		));
		if ($count==1){
			//delete all user from the lesson
			$db->smartQuery(array(
				'sql' => "DELETE FROM `activestudentinlesson` WHERE  `lid`=:lid;",
				'par' => array( 'lid' => $lid),
			));
			$slide->publishSlide($activeSid);
			return true;
		}
		return false;
	}
	
	public function unActiveLesson($lid){
		global $syncMassage;
		$count = $db->smartQuery(array(
			'sql' => "UPDATE `lesson` set `isActive`=false WHERE `lid`=:lid;",
			'par' => array('lid' => $lid),
			'ret' => 'count'
		));
		if ($count==1){
			//update Sync
			$syncMassage=new stdClass();
			$syncMassage->lesson=$lesson->getLesson($lid);
			$userInClass=$schoolClass->getPupilOfClass($syncMassage->lesson->cid);
			$uidArray=array();
			foreach ($userInClass as $value)
				$uidArray[]=$value['uid'];
			$cambiumSync->sendMassageToUser("unActiveLesson",$syncMassage, $uidArray);
			return true;
		}
		return false;
	}
	
	public function getActiveLessonOfClass($cid){
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT * FROM `lesson` where `cid`=:cid AND `isActive`=true",
			'par' => array("cid" => $cid),
			'ret' => 'fetch-assoc'
		));
		if ($row==false) return null;
		return (object)$row;
	}
	
	public function pupilInsertToLesson($lid){
		global $user;
		global $db;
		global $cambiumSync;
		$leesionObject=$this->getLesson($lid);
		$activeUser=$user->getUser();
		//check lesson is active
		if ($leesionObject->isActive!=true)
			return (object)array("err" => "the lesson is not active."); 
		//check user is pupil
		if ($activeUser->type!="pupil")
			return (object)array("err" => "the user is not pupil."); 
		//update table
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `activestudentinlesson` (`lid`, `uid`) VALUES ( :lid, :uid);",
			'par' => array( 'lid' => $lid, 'uid' => $activeUser->uid),
		));
		//update his teacher.
		$syncMassage=new stdClass();
		$syncMassage->pupilUser=$activeUser;
		$syncMassage->lid=$lid;
		$tmpArray=(array)$leesionObject;
		$uidArray=array($tmpArray['uid-teacher']);
		$cambiumSync->sendMassageToUser("pupilInsertToLesson",$syncMassage, $uidArray);
		return true;
	} 
	
	public function pupilLeaveLesson($lid){
		global $user;
		global $db;
		global $cambiumSync;
		$leesionObject=$this->getLesson($lid);
		$activeUser=$user->getUser();
		//check lesson is active
		if ($leesionObject->isActive!=true)
			return (object)array("err" => "the lesson is not active."); 
		//check user is pupil
		if ($activeUser->type!="pupil")
			return (object)array("err" => "the user is not pupil."); 
		//update table
		$result =  $db->smartQuery(array(
			'sql' => "DELETE FROM `activestudentinlesson` WHERE  `lid`=:lid AND `uid`= :uid;",
			'par' => array( 'lid' => $lid, 'uid' => $activeUser->uid),
		));
		//update his teacher.
		$syncMassage=new stdClass();
		$syncMassage->pupilUser=$activeUser;
		$syncMassage->lid=$lid;
		$tmpArray=(array)$leesionObject;
		$uidArray=array($tmpArray['uid-teacher']);
		$cambiumSync->sendMassageToUser("pupilLeaveLesson",$syncMassage, $uidArray);
		return true;
	}
	
	public function sendPupleInlesson($lid,$slideId){
		//get list pf student in class.
		// add bit for active.
		// add filed for slide status of this slide.
		return true;
	}
	
	
	public function chacklidExist($lid){
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT `lid` FROM `lesson` where `lid`=:lid",
			'par' => array("lid" => $lid),
			'ret' => 'fetch-assoc'
		));
		return ($row!=false);
	}
	
	public function userDisconnection($uid){
		//if teacher
			//$this->unActiveLesson()
		//if user
			//this->pupilLeaveLesson()
		
	}

	
}