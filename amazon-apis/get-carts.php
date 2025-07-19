<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
require("common/connection.php");

$user_id = $_POST['user_id'];
$response = [];

if ($connection) {
    $cartQuery = "SELECT * FROM `Cart` WHERE `user_id` = '$user_id'";
    $cartResult = mysqli_query($connection, $cartQuery);

    $items = [];
    $total = 0;

    if ($cartResult && mysqli_num_rows($cartResult) > 0) {
        while ($row = mysqli_fetch_assoc($cartResult)) {
            $product_id = $row['product_id'];
            $quantity = (int)$row['quantity'];
            $cart_id = $row['cart_id'];

            // Try from Products table
            $productQuery = "SELECT * FROM `Products` WHERE `product_id` = '$product_id'";
            $productResult = mysqli_query($connection, $productQuery);

            if (!$productResult || mysqli_num_rows($productResult) === 0) {
                // If not in Products, try mxplayer table
                $productQuery = "SELECT * FROM `mxplayer` WHERE `product_id` = '$product_id'";
                $productResult = mysqli_query($connection, $productQuery);
            }
            if (!$productResult || mysqli_num_rows($productResult) === 0) {
                // If not in Products, try mxplayer table
                $productQuery = "SELECT * FROM `homeimprovements` WHERE `product_id` = '$product_id'";
                $productResult = mysqli_query($connection, $productQuery);
            }
            if (!$productResult || mysqli_num_rows($productResult) === 0) {
                // If not in Products, try Toysandgames table
                $productQuery = "SELECT * FROM `Toysandgames` WHERE `product_id` = '$product_id'";
                $productResult = mysqli_query($connection, $productQuery);
            }
            
            if (!$productResult || mysqli_num_rows($productResult) === 0) {
                // If not in Products, try Toysandgames table
                $productQuery = "SELECT * FROM `Mobiles` WHERE `product_id` = '$product_id'";
                $productResult = mysqli_query($connection, $productQuery);
            }

            if ($productResult && mysqli_num_rows($productResult) > 0) {
                $product = mysqli_fetch_assoc($productResult);
                $product['cart_id'] = $cart_id;
                $product['quantity'] = $quantity;
                $product['price'] = floatval($product['price']);
                $total += $product['price'] * $quantity;
                $items[] = $product;
            }
        }

        $response = [
            "status" => "success",
            "data" => $items,
            "total_amount" => $total
        ];
    } else {
        $response = [
            "status" => "empty",
            "message" => "Cart is empty",
            "data" => [],
            "total_amount" => 0
        ];
    }
} else {
    $response = [
        "status" => "error",
        "message" => "Database connection failed"
    ];
}

echo json_encode($response);
?>
