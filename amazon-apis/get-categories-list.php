<?php

require("common/connection.php");

$category_name = $_REQUEST['category_name'];
$limit = $_REQUEST['limit'];

if ($connection) {
    $query = "SELECT * FROM `Products` WHERE `category_name` ='$category_name' LIMIT $limit";
    $result = mysqli_query($connection, $query);
    if ($result) {
        $data = array(); // Initialize $data array
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_array($result)) {
                $data[] = $row;
            }
        }
        $output = array("status" => "success", "data" => $data);
    } else {
        $output = array("status" => "something went wrong");
    }

    echo json_encode($output);
}
