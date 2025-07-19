<?php
require("common/connection.php");


 if(isset($_REQUEST['category_id'])){
    $category_id=$_REQUEST["category_id"];
}

$query= "UPDATE `Categories` SET `category_id`= '$category_id',";

if(isset($_REQUEST['name'])){
    $name=$_REQUEST["name"];
    $query .= "`name`='$name'";
}

 $query .=" WHERE `category_id`= '$category_id'";


if($connection){
 
    
    $query= "UPDATE `Categories` SET `name`='$name' WHERE `category_id`= '$category_id'";
    $result=mysqli_query($connection,$query);

    if(mysqli_affected_rows($connection)>0){
        $output= array("success"=>"successfully changed");
    }
    else{
       $output=array("success"=> "something went wrong");
    }

    echo json_encode($output);
}
?>