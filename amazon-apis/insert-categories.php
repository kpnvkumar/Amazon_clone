<?php
require("common/connection.php");


$name=$_REQUEST['name'];
$name= mysqli_real_escape_string ($connection,$name);

if($connection){
    $query="INSERT INTO `Categories`(`name`) VALUES ('$name')";
    $result=mysqli_query($connection,$query);

    if($result){
        echo"Success";
    }
    else{
        echo"error";
    }
    echo json_encode("success") ;
}

?>
