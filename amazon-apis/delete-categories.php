<?php
require('common/connection.php');


$category_id = $_REQUEST['category_id'];


    $query="DELETE FROM `Categories` WHERE `category_id` ='$category_id'";
    
    $result = mysqli_query($connection,$query);
    
    if($result && mysqli_affected_rows($connection)>0){

     $output=array("status"=>"success");
    
    }
    else{
        $output=array("status"=>"error");
    }
    echo json_encode($output);


?>