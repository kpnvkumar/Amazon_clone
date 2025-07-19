<?php

require('common/connection.php');

$user_id = $_REQUEST['user_id'];

$response = array();

if ($connection) {
    $query = "DELETE FROM `address` WHERE `user_id`='$user_id'";

    $result = mysqli_query($connection, $query);

    if ($result) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error", "message" => mysqli_error($connection));
    }
} else {
    $response = array("status" => "error", "message" => "Connection error");
}

echo json_encode($response);
?>
