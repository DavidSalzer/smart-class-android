<?php
// cambium-data-management moodles/Storage.php v0.0

class Storage{
	
	function __construct() {

    }
	
	public function set($key,$value){
		global $db;
		$count = $db->smartQuery(array(
				'sql' => "INSERT INTO `storage` (`key`, `value`) VALUES (:key, :value) 
							ON DUPLICATE KEY UPDATE `value`=:value",
				'par' => array('key' => $key, 'value' => $value),
				'ret' => 'result'
			));	
		if ($count==1){
			return (object)array("result" => "success",);
		}
		return (object)array("result" => "err");
	}
	
	public function get($key){
		global $db;
		return $db->smartQuery(array(
				'sql' => "select * from `storage` where `key`=:key",
				'par' => array('key' => $key),
				'ret' => 'all'
			));	
	}
	
	public function getAll(){
		global $db;
		return $db->smartQuery(array(
				'sql' => "select * from `storage`",
				'par' => array(),
				'ret' => 'all'
			));	
	}
	
	public function delete($key){
		global $db;
		return $db->smartQuery(array(
				'sql' => "delete from `storage` where `key`=:key",
				'par' => array('key' => $key),
				'ret' => 'result'
			));	
	}
	


}