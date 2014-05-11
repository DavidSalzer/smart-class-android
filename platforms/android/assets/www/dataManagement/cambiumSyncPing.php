<?php
	
	define("__ROOT__", __DIR__ ."/");
	require_once(__ROOT__."config.php");
	
	$dns=$conf->cambiumSync->cambiumSync;
	//$dns="http://54.205.138.41:3306";

	echo "cambiumSync dns: ".  $dns . "<br/><br/>";

	
	//send the message
	// use key 'http' even if you send the request to https://...
	$options = array(
	   'http' => array(
		   'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		   'method'  => 'POST',
		   'content' => json_encode((object)array("type"=>"ping")),
	   ),
	);
	$context  = stream_context_create($options);
	echo  file_get_contents($dns, false, $context);