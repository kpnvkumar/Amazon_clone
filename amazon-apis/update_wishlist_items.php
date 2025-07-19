<?php

require('common/connection.php');

$wishlist_item_id = $_REQUEST['wishlist_item_id'];
$wishlist_id = $_REQUEST['wishlist_id'];
$product_id = $_REQUEST['product_id'];


if($connection){
    echo 'connect';
}

$query = "UPDATE `Wishlist_Items` SET `wishlist_id`='$wishlist_id',`product_id`='$product_id' WHERE `wishlist_item_id`= '$wishlist_item_id' ";



$result = mysqli_query($connection,$query);

if(mysqli_affected_rows($connection)>0){
    
    $output = array("status"=>"success");
}

else{
    $output = array('status'=>'errorw');
}


echo json_encode($output) ;




?>