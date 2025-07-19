<?php
// created by ravi
require('common/connection.php');
if(isset($_REQUEST['review_id'])){
    $review_id = $_REQUEST['review_id'];
}




if($connection){
    $query ="DELETE FROM `Reviews` WHERE `review_id`='$review_id'";
 $result = mysqli_query($connection,$query);

 if(mysqli_affected_rows($connection)>0){
 
   $output = array("status"=>"success");

 }
 else{
    $output = array("status"=>"something went wrong");
 }
}

 json_encode($output);
 ?>