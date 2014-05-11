<?php
// cambium-data-management moodles/cambiumSync.php v0.0

class CambiumSync{

	
	function __construct() {
	}

	//user api:
	// get KEY
	// send massage to user


	public function getKey(){
		// get user request for key.
		global $db;
		global $conf;
		global $user;
		
		$uid=$user->getUser()->uid;
		$key=sha1(timeNow().$uid.rand());
		//* save in cambiumSync table
		$db->smartQuery(array(
			'sql' => "INSERT INTO `cambiumsync` (`uid`,`session-id`,`key`) VALUES (:uid,:seesionid,:key);",
			'par' => array( 'uid' => $uid, 'seesionid' =>session_id(), 'key' => $key),
		));

		// use key 'http' even if you send the request to https://...
		$options = array(
		   'http' => array(
			   'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			   'method'  => 'POST',
			   'content' => json_encode((object)array("type"=>"addKey","key" => $key)),
		   ),
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($conf->cambiumSync->cambiumSync, false, $context);

		//* return the user key.
		return (object)array("key" => $key);
	}

	public function sendMassageToUser($event,$message, $uidArray){
		global $conf;
		global $db;
		
		//get key
		$keyArray=array();
		foreach ($uidArray as $value)
		{
			$table= $db->smartQuery(array(
				'sql' => "SELECT `key` FROM `cambiumsync` where `uid`=:uid",
				'par' => array("uid" => $value),
				'ret' => 'all'
			));
			foreach ($table as $row){
				array_push($keyArray,$row['key']);
			}
		}	
		
		//send the message
		// use key 'http' even if you send the request to https://...
		$options = array(
		   'http' => array(
			   'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			   'method'  => 'POST',
			   'content' => json_encode((object)array("type"=>"sendMmessage","event"=>$event,"keyArray" => $keyArray,"message"=>$message)),
		   ),
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($conf->cambiumSync->cambiumSync, false, $context);
	}
	
	public function keyDisconnect($key){
		global $lesson;
		global $db;
		
		//Check if this is the only key of the user.
		$row= $db->smartQuery(array(
			'sql' => "SELECT uid, COUNT(*) as count FROM `cambiumsync` WHERE uid = (SELECT uid FROM `cambiumsync` WHERE `key`= :key)",
			'par' => array("key" => $key),
			'ret' => 'fetch-assoc'
		));
		if ($row["count"]==1)
			$lesson->userDisconnection($row["uid"]);
		
		$db->smartQuery(array(
			'sql' => "DELETE FROM `cambiumsync` WHERE `key` = :key",
			'par' => array('key' => $key),
			'ret' => 'count'
		));
		
	}
	
}