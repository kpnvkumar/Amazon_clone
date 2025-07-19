<?php
// created by ravi

require('common/connection.php');
if(isset($_REQUEST['shipping_id'])){
    $shippingId = $_REQUEST['shipping_id'];
}

$query ="UPDATE `Shipping` SET `shipping_id`='$shippingID'";

if(isset($_REQUEST['order_id'])){
    $orderId = $_REQUEST['order_id'];
    $query .= ",`order_id`='$orderId'";
}
if(isset($_REQUEST['address'])){
    $address = $_REQUEST['address'];
    $query .= ",`shipping_address`='$address'";
}
if(isset($_REQUEST['status'])){
    $startDate = $_REQUEST['status'];
    $query .= ",`shipping_status`='$status'";

}



    $query .="  WHERE `shipping_id`='$shippingID'";

 $result = mysqli_query($connection,$query);

 if($result && mysqli_affected_rows($connection)>0){
 
   $output = array("status"=>"successfully updated");

 }
 else{
    $output = array("status"=>"something went wrong");
 }


 echo json_encode($output);