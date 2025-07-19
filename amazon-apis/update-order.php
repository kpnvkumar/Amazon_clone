<?php
require("common/connection.php");

if(isset($_REQUEST["order_id"])){
    $order_id=$_REQUEST['order_id'];
    
}

 
$query="UPDATE `Orders` SET `order_id`='$order_id'";


if(isset($_REQUEST['user_id'])){
      $user_id= $_REQUEST['user_id'];
      $query.=",`user_id`='$user_id'";
}

if(isset($_REQUEST["total_price"])){
    $total_price=$_REQUEST['total_price'];
    $query.=",`total_price`='$total_price'";
}

$query.="WHERE `order_id`='$order_id'";



$result=mysqli_query($connection,$query);

if($result&& mysqli_affected_rows($connection)>0){
    $output=array("status"=>"successfully updated");

}
else{
    $output=array("status"=> "something went wrong");
}

echo  json_encode($output);

?>