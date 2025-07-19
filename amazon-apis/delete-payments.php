

<?php
//created by bhargav
require('common/connection.php');

if(isset($_REQUEST['payment_id'])){
  $paymentId = $_REQUEST['payment_id'];  
}


if($connection){
    $query = "DELETE FROM `Payments` WHERE `payment_id`='$paymentId'";

$result = mysqli_query($connection,$query);
if(mysqli_affected_rows($connection)>0){

    $response = array("status" => "successfully deleted");
}
else{

    $response = array ("status" => "error");
}
 
}

echo json_encode($response);

?>