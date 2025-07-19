<?php
require('common/connection.php');

$country = $_REQUEST['country'];
$fullname = $_REQUEST['fullname'];
$mobilenumber = $_REQUEST['mobilenumber'];
$pincode = $_REQUEST['pincode'];
$colony=$_REQUEST['colony'];
$area = $_REQUEST['area'];
$state= $_REQUEST['state'];
$city = $_REQUEST['city'];
$user_id = $_REQUEST['user_id'];

$query = "INSERT INTO `address`( `user_id`,`country`, `fullname`, `mobilenumber`, `pincode`, `area`, `state`, `city`, `colony`) VALUES ($user_id,'$country','$fullname','$mobilenumber','$pincode','$area','$state','$city','$colony')";

$result = mysqli_query($connection,$query);

if($result){
    $output = array('status'=>'success');
}
else{
    $output = array('status'=>'error');
}

echo json_encode($output);

?>