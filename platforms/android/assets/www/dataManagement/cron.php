<?php
require_once("dataGate.php");

//$res=DataGate::getData("login", (object)array("userName"=>"pini","pass"=>"admin"));


$cambiumSync->sendMassageToUser("switchSlide",(object)array("type"=>"switchSlide","pass"=>"admin"),array(7));