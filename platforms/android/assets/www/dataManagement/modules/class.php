<?php
class SchoolClass{

	function __construct() {

    }
	
	public function addClass($name,$grade,$sid){
		global $db;
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `class` (`name`,`grade`,`sid`) VALUES (:name,:grade,:sid);",
			'par' => array( 'name' => $name, 'grade' => $grade, 'sid' => $sid),
		));
		if ($result){
			$id=$db->getLastInsertId();
			if ($id>0){
				return (object)array(
					"result" => "success",
					"cid" => $id
				);
			}
			else 
				return (object)array("err" => "db err");
		}
		return (object)array("err" => "db err");
	}
	
	public function editClass($cid, $name,$grade){
		global $db;	
		$count = $db->smartQuery(array(
			'sql' => "UPDATE `class` set `name`=:name , `grade`=:grade WHERE `cid`=:cid;",
			'par' => array('cid' => $cid,'name' => $name,'grade' => $grade),
			'ret' => 'count'
		));
		if ($count==1){
			return true;
		}
		return false;
	}
	
	public function addPupilToClass($cid,$userName,$pass){
		global $user;
		$newUser=$user->addUser("pupil",$userName,$pass);
		if (!property_exists ($newUser,"uid")) //error when add user
			return $newUser;
		$uid=$newUser->uid;
		global $db;
		$result =  $db->smartQuery(array(
			'sql' => "INSERT INTO `classstudent` (`uid`,`cid`) VALUES (:uid,:cid);",
			'par' => array( 'uid' => $uid, 'cid' => $cid),
		));
		if ($result){
			return $newUser;
		}
		return (object)array("err" => "db err");
	}
	
	public function getClass($cid){
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT * FROM  `class` WHERE `cid`=:cid",
			'par' => array('cid' => $cid),
			'ret' => 'fetch-assoc'
		));
		$row["pupil"]=$this->getPupilOfClass($cid);
		return $row;
	}
	
	public function getClassOfSchool($sid){
		global $db;
		return $db->smartQuery(array(
			'sql' => "SELECT * FROM  `class` where `sid`=:sid order by 'grade', 'name'",
			'par' => array('sid' => $sid),
			'ret' => 'all'
		));
	}
	
	
	public function getPupilOfClass($cid){
		global $db;
		return $db->smartQuery(array(
			'sql' => "SELECT `user`.`uid`, `user`.`userName` FROM  `user` JOIN `classstudent` ON `classstudent`.`uid`=`user`.`uid` WHERE `classstudent`.`cid`=:cid",
			'par' => array('cid' => $cid),
			'ret' => 'all'
		));
	}

	
	public function chackcidExist($id){
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT `cid` FROM `class` where `cid`=:id",
			'par' => array("id" => $id),
			'ret' => 'fetch-assoc'
		));
		return ($row!=false);
	}

	
}