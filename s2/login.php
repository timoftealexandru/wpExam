<?php
require_once("dbcontroller.php");
$db_handle = new DBController();
$conn = $db_handle->conn;
$name = $conn->real_escape_string(strip_tags($_GET["name"]));
$pass = $conn->real_escape_string(strip_tags($_GET["pass"]));

$sql = "SELECT * FROM users WHERE name = '" . $name . "' AND pass = '" . $pass . "';";
$result = $db_handle->runSelectQuery($sql);
$users = array();

$user = new StdClass();
$user->id = $result[0]['id'];
$user->name = $result[0]['name'];
$user->password = $result[0]['pass'];
$user->role = $result[0]['role'];

array_push($users, $user);

echo json_encode($users);
?>

