

<?php
//created by bhargav
require('common/connection.php');

$userId = $_REQUEST['user_id'];
$userId = mysqli_real_escape_string($connection,$userId);

$orderId = $_REQUEST['orderId'];
$orderId = mysqli_real_escape_string($connection,$orderId);

$paymentDate = $_REQUEST['paymentDate'];
$paymentDate = mysqli_real_escape_string($connection,$paymentDate);

$paymentAmount = $_REQUEST['paymentAmount'];
$paymentAmount = mysqli_real_escape_string($connection,$paymentAmount);

$paymentStatus = $_REQUEST['paymentStatus'];
$paymentStatus = mysqli_real_escape_string($connection,$paymentStatus);


if($connection){

    $query = "INSERT INTO `Payments`( `user_id`, `order_id`, `payment_date`, `payment_amount`, `payment_status`)
    VALUES ('$userId','$orderId','$paymentDate','$paymentAmount','$paymentStatus')";
   
    $result = mysqli_query($connection,$query);
   if($result){
         $response = array("status" => "success");
       
   }else{
       $response = array("status"=> "error");
   }
             
}

      echo json_encode($response);

?>