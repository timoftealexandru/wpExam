<?php
require_once("dbcontroller.php");
$db_handle = new DBController();

if(!empty($_POST['id'])) {
	$id = $_POST['id'];
	$sql = "DELETE FROM  news WHERE id = '$id' ";
	$db_handle->executeQuery($sql);
}
?>