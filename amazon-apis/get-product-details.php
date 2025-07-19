<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json");

$connection = mysqli_connect("localhost", "root", "Kpnvkumar@2004", "amazon");

if (!$connection) {
    die(json_encode([
        "status" => "error",
        "message" => "Database connection error: " . mysqli_connect_error()
    ]));
}

mysqli_set_charset($connection, "utf8");
$productId = mysqli_real_escape_string($connection, $_REQUEST['product_id']);
$response = [];

// 1. Check in Products table
$queryProducts = "SELECT * FROM `Products` WHERE `product_id` = '$productId'";
$resultProducts = mysqli_query($connection, $queryProducts);

if ($resultProducts && mysqli_num_rows($resultProducts) > 0) {
    $row = mysqli_fetch_assoc($resultProducts);
    $row['source'] = 'Products';
    $response = [
        "status" => "success",
        "product_data" => $row
    ];
}
$queryMx = "SELECT * FROM `mxplayer` WHERE `product_id` = '$productId'";
    $resultMx = mysqli_query($connection, $queryMx);
 if($resultMx && mysqli_num_rows($resultMx) > 0){
    // 2. Check in mxplayer table
        $row = mysqli_fetch_assoc($resultMx);
        $row['source'] = 'mxplayer';
        $response = [
            "status" => "success",
            "product_data" => $row
        ];
    }
    $queryMx = "SELECT * FROM `homeimprovements` WHERE `product_id` = '$productId'";
    $resultMx = mysqli_query($connection, $queryMx);
 if($resultMx && mysqli_num_rows($resultMx) > 0){
    // 3. Check in homeimprovements table
        $row = mysqli_fetch_assoc($resultMx);
        $row['source'] = 'mxplayer';
        $response = [
            "status" => "success",
            "product_data" => $row
        ];
    } 
     $queryMx = "SELECT * FROM `Toysandgames` WHERE `product_id` = '$productId'";
    $resultMx = mysqli_query($connection, $queryMx);
 if($resultMx && mysqli_num_rows($resultMx) > 0){
    // 2. Check in Toysandgames table
        $row = mysqli_fetch_assoc($resultMx);
        $row['source'] = 'mxplayer';
        $response = [
            "status" => "success",
            "product_data" => $row
        ];
    }
    $queryMx = "SELECT * FROM `Mobiles` WHERE `product_id` = '$productId'";
    $resultMx = mysqli_query($connection, $queryMx);
 if($resultMx && mysqli_num_rows($resultMx) > 0){
    // 2. Check in Toysandgames table
        $row = mysqli_fetch_assoc($resultMx);
        $row['source'] = 'mxplayer';
        $response = [
            "status" => "success",
            "product_data" => $row
        ];
    } 
echo json_encode($response);
mysqli_close($connection);
?>
