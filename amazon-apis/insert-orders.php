<?php
require("common/connection.php");

$user_id=$_REQUEST['user_id'];
$user_id= mysqli_real_escape_string ($connection,$user_id);


$total_price=$_REQUEST['total_price'];
$total_price=mysqli_real_escape_string($connection,$total_price);

$product_id =$_REQUEST["product_id"];

if($connection){
    $query="INSERT INTO `Orders`(`user_id`,`total_price`,`product_id`) VALUES
     ('$user_id','$total_price')";
     $result=mysqli_query($connection,$query);

     if($result){
        echo "success";
     }
     else{
        echo "error";
     }

     echo json_encode($result);
}
?>