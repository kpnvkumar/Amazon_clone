<?php
// Allow requests from React frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection (update with your own credentials)
$host = "localhost";
$username = "root";
$password = "Kpnvkumar@2004"; // or your MySQL root password
$database = "amazon";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit();
}

// Parse incoming POST data
$user_id = $_POST['user_id'] ?? '';
$product_id = $_POST['product_id'] ?? '';

if (empty($user_id) || empty($product_id)) {
    echo json_encode(["status" => "error", "message" => "Missing user_id or product_id"]);
    exit();
}

// Prepare delete query
$stmt = $conn->prepare("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?");

$stmt->bind_param("ii", $user_id, $product_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Item removed from wishlist"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to remove item"]);
}

$stmt->close();
$conn->close();
?>
