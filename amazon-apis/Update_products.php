<?php

require('common/connection.php');

$product_id = $_REQUEST['product_id'];
$name = $_REQUEST['name'];
$description = $_REQUEST['description'];
$price = $_REQUEST['price'];
$stock_quantity = $_REQUEST['stock_quantity'];
$category_name = $_REQUEST['category_name'];
$seller_id = $_REQUEST['seller_id'];
$created_at = $_REQUEST['created_at'];

if($connection){
    echo 'connect';
}

$query = "UPDATE `Products` SET `name`='$name',`description`='$description',`price`='$price ',`stock_quantity`='$stock_quantity',`category_name`='$category_name',`seller_id`='$seller_id',`created_at`='$created_at' WHERE `product_id`='$product_id'";



$result = mysqli_query($connection,$query);

if(mysqli_affected_rows($connection)>0){
    
    $output = array("status"=>"success");
}
else{
    $output = array('status'=>'errorw');
}


echo json_encode($output) ;




?>