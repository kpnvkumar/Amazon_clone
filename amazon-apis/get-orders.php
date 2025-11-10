<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "Kpnvkumar@2004", "amazon");

if (!$conn) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$query = "SELECT * FROM orders";
"SELECT * FROM orders";
$result = mysqli_query($conn, $query);

$orders = [];
while ($row = mysqli_fetch_assoc($result)) {
    $orders[] = $row;
}

echo json_encode(["success" => true, "orders" => $orders]);
?>