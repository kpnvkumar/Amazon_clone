<?php

require('common/connection.php');

$user_id = $_REQUEST['user_id'];

$query = " DELETE FROM `Users_Table` WHERE `user_id`='$user_id' ";

$result = mysqli_query($connection,$query);

if($result && mysqli_affected_rows($connection)>0){
   
    $output = array('status'=>'success');
}
else{
    $output = array('status'=>'error');
}

echo json_encode($output);


?>