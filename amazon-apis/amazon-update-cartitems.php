<?php
// create by saiteja

require('common/connection.php');

if (isset($_REQUEST['cart_id'])) {
    $cart_id = $_REQUEST['cart_id'];
}
$query = "UPDATE `Cart` SET `cart_id = '$cart_id'";


if (isset($_REQUEST['product_id'])) {
    $product_id = $_REQUEST['product_id'];
    $query .= "`product_id`='$product_id',";
}


if (isset($_REQUEST['quantity'])) {

    $quantity = $_REQUEST['quantity'];
    $query .= ",`quantity`='$quantity',";
}
$query .= " WHERE `cart_id = '$cart_id'";


$result = mysqli_query($connection, $query);

if ($result) {
    if (mysqli_affected_rows($connection) > 0) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error");
    }
}
echo json_encode($response);
