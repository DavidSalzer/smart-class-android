<?php

require_once("dataGate.php");

/*
if (ip!=###cambiumSyncServer###)
	exit 0;
*/
	
//switch case for all alert from cambiumSyncServer, and call to relevant function


$data=json_decode(file_get_contents("php://input"));

switch ($data->type) {
    case "keyDisconnect":
		$cambiumSync->keyDisconnect($data->key);
} 
