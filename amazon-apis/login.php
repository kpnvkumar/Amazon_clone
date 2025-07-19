<?php

require('common/connection.php');

if(isset($_REQUEST['email'])&&isset($_REQUEST['password'])){
    $email=$_REQUEST['email'];

$password  =  $_REQUEST['password'];
    
$query = "SELECT `user_id`,`first_name`,`last_name` FROM `Users_Table` WHERE `email`='$email' AND `password`='$password' LIMIT 1";

$result = mysqli_query($connection,$query);

if($result){
    if(mysqli_num_rows($result)>0){
        
        $data = mysqli_fetch_array($result);
        $output = array('status'=>'success', "data"=>$data,"title"=>"Login Success","msg"=>"You will be redirected to your account in 5 seconds...");
    }
    
    else{
        $output = array('status'=>'error',"msg"=>"Invalid credentials","title"=>"Invalid Email/ Password");
    }
    
}else{
 $output = array('status'=>'error',"msg"=>"Please try again after sometime","title"=>"Something went wrong !");
       
    
}


    echo json_encode($output);
}else{
    
    $output = array('status'=>'error',"msg"=>"Please try again by sending the user data","title"=>"Email and password was not sent!");
       

    echo json_encode($output);
    
}
?>