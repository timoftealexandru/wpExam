<?php
require_once("dbcontroller.php");
$db_handle = new DBController();
$conn = $db_handle->conn;
$sql = "SELECT * FROM news order by id desc limit 5;";
$result = $db_handle->runSelectQuery($sql);

?><?php
if(!empty($result)) {
    $news = array();
    foreach($result as $k=>$v) {
        $new = new StdClass();
        $new->id = $v['id'];
        $new->date = $v['date'];
        $new->title = $v['title'];
        $new->description = $v['description'];
        $new->userId = $v['userId'];
        array_push($news, $new);
    }

    echo json_encode($news);
}
?>
