<?php

require('common/connection.php');

$user_id = $_REQUEST['user_id'];
$username = $_REQUEST['username'];
$email = $_REQUEST['email'];
$password = $_REQUEST['password'];
$firstname = $_REQUEST['first_name'];
$lastname = $_REQUEST['last_name'];
$address = $_REQUEST['address'];
$phonenumber = $_REQUEST['phone_number'];

if($connection){
    echo 'connect';
}

$query = "UPDATE `Users_Table` SET `username`='$username',`email`='$email',`password`='$password',`first_name`='$firstname',`last_name`='$lastname',`address`='$address',`phone_number`='$phonenumber' WHERE `user_id` = '$user_id' ";



$result = mysqli_query($connection,$query);

if(mysqli_affected_rows($connection)>0){
    
    $output = array("status"=>"success");
}
else{
    $output = array('status'=>'error');
}


echo json_encode($output) ;




?>