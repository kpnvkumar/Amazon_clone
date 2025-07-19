<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "Kpnvkumar@2004", "amazon");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed"]);
    exit();
}

$cart_id = $_POST['cart_id'] ?? '';
$quantity = $_POST['quantity'] ?? '';

if (empty($cart_id) || empty($quantity)) {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
    exit();
}

$stmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE cart_id = ?");
$stmt->bind_param("ii", $quantity, $cart_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Quantity updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update"]);
}

$stmt->close();
$conn->close();
?>
