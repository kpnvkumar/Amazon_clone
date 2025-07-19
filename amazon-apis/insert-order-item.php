<?php
require('common/connection.php');



$productId = $_REQUEST['productId'];
$productId = mysqli_real_escape_string($connection, $productId);



if($connection){
    $query = "INSERT INTO `Order_Items`( `order_id`, `product_id`, `quantity`, `subtotal`) VALUES
 ('$orderId','$productId','$quantity','$subtotal')";

 $result = mysqli_query($connection,$query);
 if($result){
    $output = array("status"=>"successfully user added");
 }
 else{
    $output = array("status"=>"something wheen wrong");
 }
}

 echo json_encode($output);