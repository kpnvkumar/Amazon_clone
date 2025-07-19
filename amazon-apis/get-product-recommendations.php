<?php
require('common/connection.php');

$output = array("status" => "error", "data" => null);

if (isset($_REQUEST['price']) && isset($_REQUEST['product_type'])) {
    $price = $_REQUEST['price'];
    $product_type = $_REQUEST['product_type'];

    if ($connection) {
        $query = "SELECT * FROM `Products` WHERE `price` LIKE '%$price%' AND `product_type` = '$product_type'";

        if (isset($_REQUEST['limit'])) {
            $limit = $_REQUEST['limit'];
            $query .= " LIMIT $limit";
        }

        $result = mysqli_query($connection, $query);

        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                $output = array("status" => "success", "data" => $data);
            } else {
                $output = array("status" => "no records found", "data" => null);
            }
        } else {
            $output = array("status" => "error", "message" => mysqli_error($connection));
        }
    } else {
        $output = array("status" => "error", "message" => "Database connection failed");
    }
} else {
    $output = array("status" => "error", "message" => "Required parameters missing");
}

echo json_encode($output);
?>
