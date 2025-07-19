<?php
// Created by saiteja
require('common/connection.php');
require('db.php');
require('cors.php');
$cart_id = $_REQUEST['cart_id'];

$response = array();

if ($connection) {
    $query = "DELETE FROM `Cart` WHERE `cart_id`='$cart_id'";

    $result = mysqli_query($connection, $query);

    if ($result) {
        $affected_rows = mysqli_affected_rows($connection);
        
        if ($affected_rows > 0) {
            $response = array("status" => "success", "message" => "$affected_rows row(s) deleted.");
        } else {
            $response = array("status" => "error", "message" => "No rows affected. The cart item may not exist.");
        }
    } else {
        $response = array("status" => "error", "message" => mysqli_error($connection));
    }
} else {
    $response = array("status" => "error", "message" => "Connection error");
}

echo json_encode($response);
?>
