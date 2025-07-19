<?php
// created by ravi
require('common/connection.php');
if(isset($_REQUEST['user_id'])){
    $userId = $_REQUEST['user_id'];
}
if(isset($_REQUEST['product_id'])){
    $orderId = $_REQUEST['product_id'];
}
if(isset($_REQUEST['rating'])){
    $rating = $_REQUEST['rating'];
}
if(isset($_REQUEST['comment'])){
    $comment = $_REQUEST['comment'];
}


if($connection){
    $query ="INSERT INTO `Reviews`( `user_id`, `product_id`, `rating`, `comment`) VALUES
     ('$userId','$orderId','$productId','$comment')";
 $result = mysqli_query($connection,$query);

 if($result){
 
   $output = array("status"=>"successfully added");

 }
 else{
    $output = array("status"=>"something went wrong");
 }
}

 echo json_encode($output);
 ?>