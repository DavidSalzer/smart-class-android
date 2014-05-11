<?php
// cambium-data-management moodles/user.php v1.0
class User{

	private $user;
		
	function __construct() {
		$this->restartUserBySession();
    }
	
	//login by user & pass
	public function login($userName,$pass){
		global $db;
		$pass=sha1($pass);
		$this->logOut();
		$row = $db->smartQuery(array(
			'sql' => "SELECT `uid`, `userName`, `type` FROM  `user` WHERE `userName`=:userName AND `pass`=:pass",
			'par' => array('userName' => $userName, 'pass' => $pass),
			'ret' => 'fetch-assoc'
		));
		if ($row!=false){
			$this->user=(object)$row;
			$this->setExtraDataOfUser();
			$this->startUserSession($this->user->uid);
		}
		return $this->user;
	}
	
	//log out and close the session;
	public function logOut(){
		global $db;
		$this->user=(object)array("uid"=>0, "type"=>null);
		//mark the row in the session table as end.
		$sessionID= session_id();
		$db->smartQuery(array(
			'sql' => "UPDATE `session` set `active`=0 WHERE `session-id`=:sessionID ;",
			'par' => array('sessionID' => $sessionID),
			'ret' => 'count'
		));
		return $this->user;
	}
	
	
	
	// after login add row to session table.
	private function startUsersession($uid){
		global $db;
		global $conf;
		session_regenerate_id(); // change the session id for prevent duplicate session_id in the session table (otherwise user can logout and log in with the seam session)
		$sessionID= session_id();
		//add row to the session table.
		$db->smartQuery(array(
			'sql' => "INSERT INTO `session` (`session-id`, `uid`, `last-action`,`start-session`,`active`) VALUES ( :sessionID, :uid, :time, :time, 1);",
			'par' => array( 'sessionID' => $sessionID, 'uid' => $uid, 'time' => timeNow()),
		));
		if ($conf->user_onesessionForUser)
			$this->closeAllUsersession();
			
	}
	
	// restart the user from the session.
	private function restartUserBysession(){
		global $db;
		$this->user=(object)array("uid"=>0, "type"=>null);
		$sessionID= session_id();
		//look for active session in session table.
		$row = $db->smartQuery(array(
			'sql' => "SELECT `user`.`uid`, `user`.`userName`, `user`.`type` FROM  `user` join `session` on `session`.`uid`= `user`.`uid` WHERE `session`.`session-id`=:sessionID AND `session`.`active`=1",
			'par' =>array( 'sessionID' => $sessionID),
			'ret' => 'fetch-assoc'
		));
		if ($row!=false){
			$this->user=(object)$row;
			$this->setExtraDataOfUser();
		}
		// update last action time.
		$db->smartQuery(array(
			'sql' => "UPDATE `session` set `last-action`=:time WHERE `session-id`=:sessionID;",
			'par' => array('time' => timeNow(),'sessionID' => $sessionID),
			'ret' => 'count'
		));
	}
	
	// close all session of specific user except of the current user
	public function closeAllUsersession(){
		global $db;
		// close all active session of current user except the current.
		$sessionID= session_id();
		$db->smartQuery(array(
			'sql' => "UPDATE `session` set `active`=0 WHERE `uid`=:uid AND `session-id`!=:sessionID ;",
			'par' => array('uid' => $this->user->uid, 'sessionID' => $sessionID),
			'ret' => 'count'
		));
	}
	
	public function getUser(){
		return $this->user;
	}
	
	public function addUser($type,$userName,$pass){
		global $db;
		global $conf;
		if (!in_array($type,$conf->user_userTypeArray) || $type=="admin")
			return (object)array("err" => "not valid user type");
		if ($this->chackUserExists($userName))
			return (object)array("err" => "user name exists");
		$pass=sha1($pass);
		$result = $db->smartQuery(array(
			'sql' => "INSERT INTO `user` (`userName`, `pass`, `type`) VALUES ( :userName, :pass, :type);",
			'par' => array( 'userName' => $userName, 'pass' => $pass, 'type' => $type),
			'ret' => 'result'
		));
		if ($result){
			$uid=$db->getLastInsertId();
			if ($uid>0){
				return (object)array(
					"result" => "success",
					"uid" => $uid
				);
			}
			else 
				return (object)array("err" => "db err");
		}
		return (object)array("err" => "db err");
	}
	
	public function chackUserExists($userName){
		global $db;
		$row = $db->smartQuery(array(
			'sql' => "SELECT `uid` FROM  `user` WHERE `userName`=:userName",
			'par' => array('userName' => $userName),
			'ret' => 'fetch-assoc'
		));
		return (!$row!=true);
	}
	
	
	public function updateUserPass($newPass,$oldPass){
		global $db;
		$newPass=sha1($newPass);
		$oldPass=sha1($oldPass);
		$count = $db->smartQuery(array(
			'sql' => "UPDATE `user` set `pass`=:newPass WHERE `uid`=:uid AND `pass`=:oldPass;",
			'par' => array('newPass' => $newPass,'uid' => $this->user->uid,'oldPass' => $oldPass),
			'ret' => 'count'
		));
		if ($count==1){
			return true;
		}
		return false;
	}
	
	public function updateOtherUserPass($uid,$newPass){
		global $db;	
		$newPass=sha1($newPass);
		$count = $db->smartQuery(array(
			'sql' => "UPDATE `user` set `pass`=:newPass WHERE `uid`=:uid AND `type` not in ('admin');",
			'par' => array('newPass' => $newPass,'uid' => $uid),
			'ret' => 'count'
		));
		if ($count==1){
			return true;
		}
		return false;
	}
	
	public function deleteUser($uid){
		global $db;
		$count = $db->smartQuery(array(
			'sql' => "DELETE FROM `user` WHERE `uid`=:uid AND `type` not in ('admin');",
			'par' => array('uid' => $uid),
			'ret' => 'count'
		));
		if ($count==1){
			return true;
		}
		return false;
	}	
	
	
	public function chackuidExist($uid){
		global $db;
		$row= $db->smartQuery(array(
			'sql' => "SELECT `uid` FROM `user` where `uid`=:uid",
			'par' => array("uid" => $uid),
			'ret' => 'fetch-assoc'
		));
		return ($row!=false);
	}

	private function setExtraDataOfUser(){
		global $school;
		global $db;
		if ($this->user->type=="teacher"){
			$row= $db->smartQuery(array(
				'sql' => "SELECT `sid` FROM `schoolteacher` WHERE `uid`=:uid",
				'par' => array('uid' => $this->user->uid),
				'ret' => 'fetch-assoc'
			));
			$this->user->sid= $row['sid'];
		}
		else if ($this->user->type=="pupil"){
		
		}
		 
	}
	
}