<?php
class School{

	function __construct() {

    }
	
	public function addSchool($name,$lessonNumber){
		global $db;
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `school` (`name`,`lessonNumber`) VALUES (:name,:lessonNumber);",
			'par' => array( 'name' => $name, 'lessonNumber' => $lessonNumber),
		));
		if ($result){
			$id=$db->getLastInsertId();
			if ($id>0){
				return (object)array(
					"result" => "success",
					"sid" => $id
				);
			}
			else 
				return (object)array("err" => "db err");
		}
		return (object)array("err" => "db err");
	}
	
	public function editSchool($sid, $name,$lessonNumber){
		global $db;	
		$count = $db->smartQuery(array(
			'sql' => "UPDATE `school` set `name`=:name , `lessonNumber`=:lessonNumber WHERE `sid`=:sid;",
			'par' => array('sid' => $sid,'name' => $name,'lessonNumber' => $lessonNumber),
			'ret' => 'count'
		));
		if ($count==1){
			return true;
		}
		return false;
	}
	
	public function addTeacherToSchool($sid,$userName,$pass){
		global $user;
		$newUser=$user->addUser("teacher",$userName,$pass);
		if (!property_exists ($newUser,"uid")) //error when add user
			return $newUser;
		$uid=$newUser->uid;
		global $db;
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `schoolteacher` (`uid`,`sid`) VALUES (:uid,:sid);",
			'par' => array( 'uid' => $uid, 'sid' => $sid),
		));
		if ($result){
			return $newUser;
		}
		return (object)array("err" => "db err");
	}
	
	public function getSchool($sid){
		global $db;
		return $db->smartQuery(array(
			'sql' => "SELECT * FROM  `school` WHERE `sid`=:sid",
			'par' => array('sid' => $sid),
			'ret' => 'fetch-assoc'
		));
	}
	
	public function getAllScholl(){
		global $db;
		return $db->smartQuery(array(
			'sql' => "SELECT * FROM  `school`",
			'par' => array(),
			'ret' => 'all'
		));
	}
	
	
	public function getTeacherOfScholl($sid){
		global $db;
		return $db->smartQuery(array(
			'sql' => "SELECT `user`.`uid`, `user`.`userName` FROM  `user` JOIN `schoolteacher` ON `schoolteacher`.`uid`=`user`.`uid` WHERE `schoolteacher`.`sid`=:sid",
			'par' => array('sid' => $sid),
			'ret' => 'all'
		));
	}
	
	public function chacksidExist($id){
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT `sid` FROM `school` where `sid`=:id",
			'par' => array("id" => $id),
			'ret' => 'fetch-assoc'
		));
		return ($row!=false);
	}

	
}