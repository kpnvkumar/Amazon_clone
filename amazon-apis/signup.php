<?php

require('common/connection.php');

require('db.php');
require('cors.php');
$email = $_REQUEST['email'];
$password = $_REQUEST['password'];
$firstname = $_REQUEST['first_name'];
$lastname = $_REQUEST['last_name'];
$username = $firstname." ".$lastname;
$phonenumber = $_REQUEST['phone_number'];
if(isset($_REQUEST['email']) && isset($_REQUEST["password"]) && isset($_REQUEST["first_name"]) && isset($_REQUEST["last_name"]) && isset($_REQUEST["phone_number"])      ){
    
if ($connection) {
    
   
    $query = "INSERT INTO `Users_Table`(`username`, `email`, `password`, `first_name`, `last_name`,  `phone_number`) VALUES
     ('$username','$email','$password','$firstname','$lastname','$phonenumber')";
    

    $result = mysqli_query($connection, $query);

    if ($result) {
     $output = array('status' => 'success');
         echo json_encode($output);
     
    } else {
        $output = array('status' => 'error');
         echo json_encode($output);
    }


   

}
    
    
}
else{
   $output = array('status' => 'error',"msg"=>"please send all user details");
         echo json_encode($output);  
}
?>