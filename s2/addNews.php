<?php
require_once("dbcontroller.php");
$db_handle = new DBController();

if(!empty($_POST["news"])) {
    $conn = $db_handle->conn;
    $news = $_POST['news'];

    foreach($news as $value) {
        $title = $value['title'];
        $description = $value['description'];
        $userId =  $value['userId'];

        $sql = "INSERT INTO news(date,title,description,userId) VALUES (24072017,'" . $title . "','" . $description . "','" . $userId . "')";
        $id = $db_handle->executeInsert($sql);
        if(!empty($id)) {
        $sql = "SELECT * from news WHERE id = '$id' ";
        $recipes = $db_handle->runSelectQuery($sql);
        }
    }
}
?>