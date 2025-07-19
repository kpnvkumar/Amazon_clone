<?php
// creater by ravi

require('common/connection.php');
if(isset($_REQUEST['item_id'])){
    $itemId = $_REQUEST['item_id'];
}

 $query = "UPDATE `Order_Items` SET `order_item_id`='$itemId'";
 

if(isset($_REQUEST['order_id'])){
    $orderId = $_REQUEST['order_id'];
    $query .= ",`order_id`='$order_id'";
}
if(isset($_REQUEST['product_id'])){
    $productId = $_REQUEST['product_id'];
    $query .= ",`product_id`='$productID'";
}
if(isset($_REQUEST['quantity'])){
    $quantity = $_REQUEST['quantity'];
     $query .= ",`quantity`='$quantity'";
}
if(isset($_REQUEST['subtotal'])){
    $subtotal = $_REQUEST['subtotal'];
     $query .= ",`subtotal`='$subtotal'";
}



if($connection){
    $query .= " WHERE `order_item_id`='$itemId'";
 

 $result = mysqli_query($connection,$query);
 if(mysqli_affected_rows($connection)>0){
    $output = array("status"=>"successfully user updated");
 }
 else{
    $output = array("status"=>"something went wrong");
 }
}

 echo json_encode($output);