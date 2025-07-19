<?php
require('common/connection.php');
 $id=mysqli_real_escape_string($connection,$_REQUEST['Id']);
$full_name = mysqli_real_escape_string($connection, $_REQUEST['fullname']);
$area = mysqli_real_escape_string($connection, $_REQUEST['area']);
$country = mysqli_real_escape_string($connection, $_REQUEST['country']);
$state = mysqli_real_escape_string($connection, $_REQUEST['state']);
$city = mysqli_real_escape_string($connection, $_REQUEST['city']);
$colony = mysqli_real_escape_string($connection, $_REQUEST['colony']);
$pincode = mysqli_real_escape_string($connection, $_REQUEST['pincode']);
$user_id =mysqli_real_escape_string($connection,$_REQUEST['user_id']);

$query = "UPDATE `address` SET `user_id`='$user_id',`country`='$country',`fullname`='$full_name',
`mobilenumber`='$mobilenumber',`pincode`='$pincode',`area`='$area',`state`='$state',`city`='$city',`colony`='$colony' WHERE `id`= '$id'";

$result = mysqli_query($connection,$query);

if($result){
    $output = array("status"=>"success","msg"=>"updated successfully");
}
else{
    $output =array("status"=>"error","msg"=>"No rows affected");

}
echo json_encode($output);

 ?>