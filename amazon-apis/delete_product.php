<?php

require('common/connection.php');

$product_id = $_REQUEST['product_id'];

$query = " DELETE FROM `Products` WHERE `product_id`='$product_id' ";

$result = mysqli_query($connection,$query);

if($result){
   
   if(mysqli_affected_rows($connection)>0){
       
       
    $output = array('status'=>'success');
   }else{
       
    $output = array('status'=>'error');
   }
}
else{
    $output = array('status'=>'error');
}

echo json_encode($output);


?>