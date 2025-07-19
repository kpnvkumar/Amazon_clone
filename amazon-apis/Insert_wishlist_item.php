<?php

require('common/connection.php');

$user_id = $_REQUEST['user_id'];
$product_id = $_REQUEST['product_id'];

if ($connection) {
    if (isset($_REQUEST['user_id']) && isset($_REQUEST['product_id'])) {
        
        // Check for existing entry
        $check_query = "SELECT * FROM `Wishlist_Items` WHERE `user_id` = '$user_id' AND `product_id` = '$product_id'";
        $check_result = mysqli_query($connection, $check_query);

        if (mysqli_num_rows($check_result) > 0) {
            // Already exists
            $output = array("status" => "duplicate");
        } else {
            // Insert new item
            $insert_query = "INSERT INTO `Wishlist_Items`(`user_id`, `product_id`) VALUES ('$user_id','$product_id')";
            $insert_result = mysqli_query($connection, $insert_query);

            if ($insert_result) {
                $output = array("status" => "success");
            } else {
                $output = array("status" => "error1");
            }
        }

        echo json_encode($output);
    }
}
?>