<?php

require('common/connection.php');

$name = $_REQUEST['name'];
$description = $_REQUEST['description'];
$price = $_REQUEST['price'];
$stock_quantity = $_REQUEST['stock_quantity'];
$category_name = $_REQUEST['category_name'];
$seller_id = $_REQUEST['seller_id'];

if ($connection) {
 

   
    $query = "INSERT INTO `Products`( `name`, `description`, `price`, `stock_quantity`, `category_name`, `seller_id`) VALUES ('$name','$description','$price','$stock_quantity','$category_name','$seller_id')";
    

    $result = mysqli_query($connection, $query);

    if ($result) {

        $output = array("status" => "success");
    } else {
        $output = array('status' => 'error');
    }


    echo json_encode($output);

}
?>