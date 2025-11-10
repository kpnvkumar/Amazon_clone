<?php
require("common/connection.php");

if(isset($_REQUEST['order_id'])){
    $order_id=$_REQUEST['order_id'];
}


if($connection){
    
    $query="DELETE FROM `orders` WHERE `product_id`='$order_id'";
$result=mysqli_query($connection,$query);

if(mysqli_affected_rows($connection)>0){

    $output= array("status"=>"success"); 
}
else{
    $output= array("status"=> "error");
}
 echo json_encode($output);
}
?>