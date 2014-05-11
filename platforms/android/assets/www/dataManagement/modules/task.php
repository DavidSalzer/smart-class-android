<?php
class Task{

	function __construct() {

    }
	
	public function addTask($slideId,$data){
		global $db;
		$data=json_encode($data);
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `task` (`slideId`,`data`) VALUES (:slideId,:data);",
			'par' => array( 'slideId' => $slideId, 'data' => $data),
		));
		if ($result){
			$tid=$db->getLastInsertId();
			if ($tid>0){
				return (object)array(
					"result" => "success",
					"tid" => $tid
				);
			}
			else 
				return (object)array("err" => "db err");
		}
		return (object)array("err" => "db err");
	}
	
	public function getTask($tid){
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT * FROM `task` where `tid`=:tid",
			'par' => array( 'tid' => $tid),
			'ret' => 'fetch-assoc'
		));
		$row['data']=json_decode($row['data']);
		return $row;
	}
		
	public function getTaskInSlide($slideId){
		global $db;
		$table= $db->smartQuery(array(
			'sql' => "SELECT * FROM `task` where `slideId`=:slideId",
			'par' => array( 'slideId' => $slideId),
			'ret' => 'all'
		));
		foreach ($table as &$row)
			$row['data']=json_decode($row['data']);
		return $table;
	}
	
	public function answerTask($tid,$data){
		global $db;
		global $user;
		global $cambiumSync;
		$activeUser=$user->getUser();
		$data=json_encode($data);
		//insert to db.
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `answer` (`tid`,`uid-student`,`data`,`time`) VALUES (:tid,:uid,:data,:time);",
			'par' => array( 'tid' => $tid, 'uid' => $activeUser->uid, 'data' => $data, 'time' => timeNow()),
		));
		//update the teacher.
		$syncMassage=new stdClass();
		$syncMassage->tid=$tid;
		$syncMassage->pupil=$activeUser;
		$teacherUser=$db->smartQuery(array(
			'sql' => "SELECT `uid` FROM `user` join lesson on user.uid= lesson.`uid-teacher` join slide on slide.lid=lesson.lid join task on task.slideId=slide.slideId where task.tid=:tid",
			'par' => array( 'tid' => $tid),
			'ret' => 'fetch-assoc'
		));

		$cambiumSync->sendMassageToUser("pupilanswerTask",$syncMassage, [$teacherUser["uid"]]);
		return true;
	}
		
	public function chackstideIdExist($id){
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT `tid` FROM `task` where `tid`=:id",
			'par' => array("id" => $id),
			'ret' => 'fetch-assoc'
		));
		return ($row!=false);
	}

	
}