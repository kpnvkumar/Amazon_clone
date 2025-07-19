<?php
// created by 



require('common/connection.php');

if(isset($_REQUEST['review_id'])){
    $reviewId = $_REQUEST['review_id'];
}

 $query ="UPDATE `Reviews`SET `review_id`='$reviewId' ";
 
if(isset($_REQUEST['user_id'])){
    $userId = $_REQUEST['user_id'];
    $query.= ",`user_id`='$userId'";
}
if(isset($_REQUEST['product_id'])){
    $orderId = $_REQUEST['product_id'];
    $query .= ",`product_id`='$productId'";
}
if(isset($_REQUEST['rating'])){
    $rating = $_REQUEST['rating'];
     $query .= ",`rating`='$rating'";
}
if(isset($_REQUEST['comment'])){
    $comment = $_REQUEST['comment'];
    $query .= ",`comment`='$comment'";
}
if(isset($_REQUEST['review_date'])){
    $reviewDate = $_REQUEST['review_date'];
      $query .= ",`review_date`='$reviewDate'";
}


$query.="WHERE `review_id`='$reviewId'";


 $result = mysqli_query($connection,$query);

 if($result && mysqli_affected_rows($connection)>0){
 
   $output = array("status"=>"successfully updated");

 }
 else{
    $output = array("status"=>"something went wrong");
 }


 echo json_encode($output);
 ?>