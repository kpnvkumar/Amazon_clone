<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$connection = mysqli_connect("localhost", "root", "Kpnvkumar@2004", "amazon");

$transactionId = $_GET["transactionId"];
$status = $_GET["status"];

if ($connection) {
    $query = "UPDATE orders SET status='$status' WHERE transactionId='$transactionId'";
    if (mysqli_query($connection, $query)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => mysqli_error($connection)]);
    }
} else {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
}
?>
