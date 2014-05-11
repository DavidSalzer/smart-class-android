<?php
// cambium-data-management json.api.php v1.2

require_once("dataGate.php");

$res=new stdClass();

$postdata=null;

if (isset($_POST['reqArray'])){
	$postdata=$_POST['reqArray'];
}
else{
	$postdata = file_get_contents("php://input");
}

$reqArray=json_decode($postdata);
if (is_array($reqArray)){
	$res->resArray=array();
	foreach ($reqArray as $value) {
		$req=null;
		$type=null;
		$reqID=null;
		if (property_exists($value,"req")) $req=$value->req;
		if (property_exists($value,"type")) $type=$value->type;
		if (property_exists($value,"reqID")) $reqID=$value->reqID;
		$res->resArray[]=(object)array(
			"reqID" => $reqID,
			"type" => $type,
			"res" => DataGate::getData($type, $req),
		);
	}
}
else if(is_object($reqArray) && is_object($reqArray->req) && is_string($reqArray->type)){
	$res->res= DataGate::getData($reqArray->type, $reqArray->req);
}
else {
		$res->error="request error.";
}


$res->user=DataGate::getData("getUser", new stdClass());

//header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin:*');
echo json_encode($res);
