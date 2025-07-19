<?php
require('common/connection.php');

header("Content-Type: application/json");

$response = [];

if (!isset($_POST['user_id']) || !isset($_POST['product_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing user_id or product_id"
    ]);
    exit;
}

$userId = mysqli_real_escape_string($connection, $_POST['user_id']);
$productId = mysqli_real_escape_string($connection, $_POST['product_id']);

if (!$connection) {
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);
    exit;
}

// ✅ Check for duplicate
$checkQuery = "SELECT * FROM Wishlist WHERE user_id = '$userId' AND product_id = '$productId'";
$checkResult = mysqli_query($connection, $checkQuery);

if (mysqli_num_rows($checkResult) > 0) {
    echo json_encode([
        "status" => "exists",
        "message" => "Product already in wishlist"
    ]);
    exit;
}

// ✅ Insert new wishlist item
$insertQuery = "INSERT INTO Wishlist (user_id, product_id) VALUES ('$userId', '$productId')";
$insertResult = mysqli_query($connection, $insertQuery);

if ($insertResult) {
    echo json_encode([
        "status" => "success",
        "message" => "Product added to wishlist"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to insert wishlist item"
    ]);
}
?>
