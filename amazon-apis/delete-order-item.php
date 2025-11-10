<?php
require('common/connection.php');

if(isset($_REQUEST['item_id'])){
    $itemId = $_REQUEST['product_id'];
}





if($connection){
    $query = "DELETE FROM `Order_Items` WHERE `product_id`= '$itemId'";

 $result = mysqli_query($connection,$query);
 if(mysqli_affected_rows($connection)>0){
    $output = array("status"=>"successfully item deleted");
 }
 else{
    $output = array("status"=>"something went wrong");
 }
}

 json_encode($output);
 ?>