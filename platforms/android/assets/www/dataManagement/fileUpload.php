<?php
require_once("config.php");
require_once("function.php");
require_once("db.php");
require_once("moodles/user.php");

class File{

	function uplodeImage($file){
		global $user;
		global $conf;
		
		$fileType=$file["type"];
		$temp = explode(".", $file["name"]);
		$extension = end($temp);
		$fileSize = $file["size"];
		$error=$file["error"];
		
		$ans=new stdClass();
		$theUser=$user->getUser();
		
		if ($theUser->uid==0){
			$ans->error="not log in";
		}
		else if (!in_array($extension, $conf->allowUploadedExts) || !in_array($fileType, $conf->allowUploadedType))
			$ans->error="Invalid file";
		else if ($fileSize>$conf->maxUploadSize)
			$ans->error="File To big";
		else if ($error> 0)
			$ans->error=$error;
		else{
			$fileName=$theUser->uid. "_" .timeNow().".".$extension;
			
			move_uploaded_file($file["tmp_name"],$conf->uplodePath.$fileName);
			$ans->path=$conf->uplodeFullUrl.$fileName;
		}
		return $ans;
	//	}//end foreach
	}
}

session_start();
$db = new db($conf->DB->host,$conf->DB->DBName,$conf->DB->userName,$conf->DB->pass,$conf->DB->logError);
$user = new User($db);
$file = new File();



if (!isset($_FILES)){//$_FILES["file"]
	$returnData->error="missing parameter";
}
else{
	foreach($_FILES as $fileUp){
		$returnData=$file->uplodeImage($fileUp);
	}
}


//header('Content-Type: application/json; charset=UTF-8');
echo json_encode($returnData);