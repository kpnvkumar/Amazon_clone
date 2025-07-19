<?php

require('common/connection.php');
require('db.php');
require('cors.php');
$user_id = $_REQUEST['user_id'];

$query = "SELECT * FROM `Users_Table` WHERE `user_id` = '$user_id'";

$result = mysqli_query($connection,$query);

if($result){
    if(mysqli_num_rows($result)>0){
       while( $row = mysqli_fetch_array($result)){
           $data[]=$row;
       }
        $output = array('status'=>'success','data'=>$data);
    }
    else{
        $output = array('stauts'=>'nodata');
    }
}
else{
    $output = array('status'=>'error');
}
 echo json_encode($output);
?>