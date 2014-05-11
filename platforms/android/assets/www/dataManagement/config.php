<?php

$conf=new stdClass();


$conf->DB=new stdClass();


//blouhost-Server
$conf->DB->host="smart-class.cambium-team.com";
//$conf->DB->host="localhost";
$conf->DB->DBName="cambiumt_smart-class";
$conf->DB->userName="cambiumt_smartcl";
$conf->DB->pass="noPnTN1-~03J";
/**/

/*
//local
$conf->DB->host="localhost";
$conf->DB->DBName="smartClass";
$conf->DB->userName="root";
$conf->DB->pass="";
/**/

$conf->DB->logError="log/sqlError.log";
$conf->dynamicFilePath="dynamic/";

$conf->uplodePath="upload/";
$conf->uplodeFullUrl="server/upload/";
$conf->maxUploadSize=2097152; //=2GB
$conf->allowUploadedExts = array("gif", "jpeg", "jpg", "png","GIF", "JPEG", "JPG", "PNG",);
$conf->allowUploadedType = array("image/gif", "image/jpeg", "image/jpg", "image/pjpeg", "image/x-png", "image/png");


//user
$conf->user_userTypeArray=array("admin","editor","teacher","pupil");
$conf->user_onesessionForUser=true; // user can login from one session at a time.


//cambiumSync
$conf->cambiumSync=new stdClass();
//$conf->cambiumSync->cambiumSync='http://localhost:3001';
//$conf->cambiumSync->cambiumSync='http://ec2-54-205-138-41.compute-1.amazonaws.com:3001';
$conf->cambiumSync->cambiumSync='http://54.205.138.41:3306';


