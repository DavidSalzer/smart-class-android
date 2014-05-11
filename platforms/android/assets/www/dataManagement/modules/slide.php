<?php
class Slide{

	function __construct() {

    }
	
	public function addSlide($lid,$title){
		global $db;
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `slide` (`lid`,`title`,`index`) VALUES (:lid,:title,:index);",
			'par' => array( 'lid' => $lid,'title' => $title, 'index' =>$this->getslideCountOfLesson($lid)+1),
		));
		if ($result){
			$id=$db->getLastInsertId();
			if ($id>0){
				return (object)array(
					"result" => "success",
					"slideId" => $id
				);
			}
			else 
				return (object)array("err" => "db err");
		}
		return (object)array("err" => "db err");
	}
	
	private function getslideCountOfLesson($lid){
		global $db;
		return $db->smartQuery(array(
			'sql' => "SELECT count(*) as count FROM `slide` where `lid`=:lid",
			'par' => array( 'lid' => $lid),
			'ret' => 'fetch-assoc'
		))['count'];
	}
	
	public function getLessonSlide($lid){
		global $db;
		return $db->smartQuery(array(
			'sql' => "SELECT * FROM `slide` where `lid`=:lid order By `index`",
			'par' => array( 'lid' => $lid),
			'ret' => 'all'
		));
	}
	
	public function getSlide($slideId){
		global $db;
		global $task;
		$row = $db->smartQuery(array(
			'sql' => "SELECT * FROM `slide` where `slideId`=:slideId",
			'par' => array( 'slideId' => $slideId),
			'ret' => 'fetch-assoc'
		));
		$row["tasks"]=$task->getTaskInSlide($slideId);
		return (object)$row;
	}

	
	public function getSlideOfLessonByIndex($lid,$index){
		global $db;
		global $task;
		$row = $db->smartQuery(array(
			'sql' => "SELECT * FROM `slide` where `lid`=:lid AND `index`=:index",
			'par' => array( 'lid' => $lid, 'index' => $index),
			'ret' => 'fetch-assoc'
		));
		$row["tasks"]=$task->getTaskInSlide($row['slideId']);
		return $row;
	}
	
	public function publishSlide($slideId){
		global $db;
		global $cambiumSync;
		global $lesson;
		global $schoolClass;
		$slideObject=$this->getSlide($slideId);
		$count = $db->smartQuery(array(
			'sql' => "UPDATE `lesson` set activeSid=:slideId WHERE `isActive`=true AND `lid`=:lid;",
			'par' => array('slideId' => $slideId, 'lid'=> $slideObject->lid),
			'ret' => 'count'
		));
		if ($count==1){
			$db->smartQuery(array(
				'sql' => "UPDATE `slide` set isPublish=true WHERE `slideId`=:slideId;",
				'par' => array('slideId' => $slideId),
				'ret' => 'count'
			));
			//update Sync
			$syncMassage=new stdClass();
			$syncMassage->slide=$this->getSlide($slideId);
			$syncMassage->lesson=$lesson->getLesson($syncMassage->slide->lid);
			$userInClass=$schoolClass->getPupilOfClass($syncMassage->lesson->cid);
			$uidArray=array();
			foreach ($userInClass as $value)
				$uidArray[]=$value['uid'];
			$cambiumSync->sendMassageToUser("switchSlide",$syncMassage, $uidArray);
			return true;
		}
		return false;
	}
	
	public function chackslideIdExist($slideId){
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT `slideId` FROM `slide` where `slideId`=:slideId",
			'par' => array("slideId" => $slideId),
			'ret' => 'fetch-assoc'
		));
		return ($row!=false);
	}

	
}