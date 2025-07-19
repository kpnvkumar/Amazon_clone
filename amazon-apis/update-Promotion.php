<?php
// created by ravi

require('common/connection.php');
if(isset($_REQUEST['promotion_id'])){
    $promotionId = $_REQUEST['promotion_id'];
}

$query ="UPDATE `Promotions` SET `promotion_id`='$promotionId'";

if(isset($_REQUEST['name'])){
    $name = $_REQUEST['name'];
    $query .= ",`name`='$name'";
}
if(isset($_REQUEST['discount'])){
    $discount = $_REQUEST['discount'];
    $query .= ",`discount_percentage`='$discount'";
}
if(isset($_REQUEST['start_date'])){
    $startDate = $_REQUEST['start_date'];
    $query .= ",`star_date`='$startDate'";

}
if(isset($_REQUEST['end_date'])){
    $endDate = $_REQUEST['end_date'];
    $query .= ",`end_date`='$endDate'";

}


    $query .=" WHERE `promotion_id`='$promotionId' ";
    
 $result = mysqli_query($connection,$query);

 if($result && mysqli_affected_rows($connection)>0){
 
   $output = array("status"=>"successfully updated");

 }
 else{
    $output = array("status"=>"something went wrong");
 }


 echo json_encode($output);
 
 ?>