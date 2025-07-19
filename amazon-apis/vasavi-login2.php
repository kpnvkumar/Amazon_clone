<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: GET,POST");

$connection=mysqli_connect("localhost","root","","amazon");
date_default_timezone_set("Asia/Kolkata");
$date = date("y-m-d h:i:s");   

if(isset($_REQUEST["email"]) && isset($_REQUEST["password"])){
    $email = $_REQUEST["email"];
    $password = $_REQUEST["password"];
    $query = "SELECT * FROM users_table WHERE `email`='$email' AND `password`='$password'";
    $result = mysqli_query($connection,$query);
    if($result){
    if(mysqli_num_rows($result)>0){
    
        $data = mysqli_fetch_array($result);
    $output = array("status"=>"success","userdata"=>$data);
        echo  json_encode($output);
    }else{
       $output = array("status"=>"error","message"=>"invalid credentials");
    
       echo json_encode($output);
    }
    
    }else{
    

    }

}
else{
    $output = array("status"=>"error","message"=>"send email and password");
    
    echo json_encode($output);

}


?>