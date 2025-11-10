<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$connection = mysqli_connect("localhost", "root", "Kpnvkumar@2004", "amazon");

$user_id = $_REQUEST["user_id"];
$product_id = $_REQUEST["product_id"];
$quantity = $_REQUEST["quantity"];
$price = $_REQUEST["price"];
$transaction_id = $_REQUEST["transaction_id"];
$address = $_REQUEST["address"];
$amount = $_REQUEST["amount"];
$status = "Pending";

if ($connection) {
    $insertQuery = "INSERT INTO `orders` VALUES ('$user_id', '$product_id', '$quantity', '$price', '$transaction_id', '$address', '$amount','$status')";
    
    $insertResult = mysqli_query($connection, $insertQuery);

    if ($insertResult) {
        $response = array("success" => true, "message" => "Product added to orders.");
    } else {
        $response = array("success" => false, "message" => "Query failed: " . mysqli_error($connection));
    }

    echo json_encode($response);
} else {
    echo json_encode(array("success" => false, "message" => "Database connection failed."));
}
?>
