<?php


// return float milliseconds time.
function timeNow(){
	return round(microtime(true) * 1000);
}

function getFileDate($path){
	return file_get_contents($path);
}

function saveDataToFile($path,$data){
	$stringData = mb_convert_encoding($data, 'UTF-8');
	file_put_contents($path, $stringData);
	return true;
}