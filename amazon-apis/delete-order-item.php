<?php
// created by ravi
require('common/connection.php');

if(isset($_REQUEST['item_id'])){
    $itemId = $_REQUEST['item_id'];
}





if($connection){
    $query = "DELETE FROM `Order_Items` WHERE `order_item_id`= '$itemId'";

 $result = mysqli_query($connection,$query);
 if(mysqli_affected_rows($connection)>0){
    $output = array("status"=>"successfully item deleted");
 }
 else{
    $output = array("status"=>"something went wrong");
 }
}

 json_encode($output);