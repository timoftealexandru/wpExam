<?php
require_once("dbcontroller.php");
$db_handle = new DBController();

if(!empty($_POST["title"])) {
    $conn = $db_handle->conn;
	$title = $conn->real_escape_string(strip_tags($_POST["title"]));
    $description = $conn->real_escape_string(strip_tags($_POST["description"]));
    $userId = $conn->real_escape_string(strip_tags($_POST["userId"]));
  $sql = "INSERT INTO news(date,title,description,userId) VALUES (24072017,'" . $title . "','" . $description . "','" . $userId . "')";
  $id = $db_handle->executeInsert($sql);
	if(!empty($id)) {
		$sql = "SELECT * from news WHERE id = '$id' ";
		$recipes = $db_handle->runSelectQuery($sql);
	}
}
?>