<?php
// created by ravi

require('common/connection.php');
// if(isset($_REQUEST['shippingId'])){
//     $shippingId = $_REQUEST['shippingId'];
// }



if (isset($_REQUEST['orderId'])) {
    $orderId = $_REQUEST['orderId'];
}
if (isset($_REQUEST['address'])) {
    $address = $_REQUEST['address'];
}
if (isset($_REQUEST['status'])) {
    $startDate = $_REQUEST['status'];
}



$query = "INSERT INTO `Shipping`( `order_id`, `shipping_address`, `shipping_status`) VALUES ('$orderId','$address','$status')";

$result = mysqli_query($connection, $query);

if ($result) {

    $output = array("status" => "successfully added shipping");
} else {
    $output = array("status" => "something went wrong");
}


echo json_encode($output);
