<?php
// created by ravi

require('common/connection.php');

$product_id = $_REQUEST['product_id'];

if ($connection) {

    $query = "SELECT * FROM `Reviews` WHERE `product_id`='$product_id'";
    $data = array();
    $result = mysqli_query($connection, $query);
    if (mysqli_num_rows($result) > 0) {

        $response = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $user_id = $row['user_id'];

            $user_query = "SELECT * FROM `Users_Table` WHERE `user_id`='$user_id'";

            $user_result = mysqli_query($connection, $user_query);
            if ($user_result) {

                if (mysqli_num_rows($user_result) > 0) {
                    $user_row = mysqli_fetch_assoc($user_result);

                    $response[] = array_merge($row, $user_row);
                }
            }

            $output = array("status" => "success", "data" => $response);
        }
    } else {
        $output = array("status" => "something went wrong", "data" => null);
    }
}

echo json_encode($output);
