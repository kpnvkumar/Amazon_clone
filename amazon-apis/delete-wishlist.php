<?php

require('common/connection.php');

if(isset($_REQUEST['id'])){
    $wishlistId = $_REQUEST['id'];
}
if($connection){
    $query = "DELETE FROM `Wishlist_Items` WHERE `id`= '$wishlistId'";

    $result = mysqli_query($connection,$query);
    
    if(mysqli_affected_rows($connection)>0){
        $response = array("status" => "success");
    }
    else{
        
    }
    
}

echo json_encode($response);


?>