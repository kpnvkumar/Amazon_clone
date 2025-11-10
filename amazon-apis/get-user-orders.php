<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "Kpnvkumar@2004", "amazon");

if (!$conn) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

// Get user_id from query parameter
$user_id = isset($_GET['user_id']) ? mysqli_real_escape_string($conn, $_GET['user_id']) : null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is required"]);
    exit();
}

// Fetch orders for the specific user
$query = "SELECT * FROM orders WHERE user_id = '$user_id' ORDER BY transactionId DESC";
$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode(["success" => false, "message" => "Query failed: " . mysqli_error($conn)]);
    exit();
}

$orders = [];
$tables=[
    "fashion", "handkitchen", "homeimprovements", "mobiles",
    "mxplayer","products", "toysandgames"];

while ($row = mysqli_fetch_assoc($result)) {
    $product_id = $row['product_id'];
    $product_found = false;
    foreach ($tables as $table) {
        $product_query = "SELECT name,images FROM $table WHERE product_id = '$product_id'";
        $product_result = mysqli_query($conn, $product_query);

        if ($product_result && mysqli_num_rows($product_result) > 0) {
            $product_data = mysqli_fetch_assoc($product_result);
            $row['images'] = $product_data['images'];
            $row['product_name'] = $product_data['name'];
            $product_found = true;
            break; // Stop searching once found
        }
    }
    if (!$product_found) {
        $row['images'] = null;
    }
    $orders[] = $row;
}

echo json_encode([
    "success" => true, 
    "orders" => $orders,
    "count" => count($orders)
]);

mysqli_close($conn);
?>