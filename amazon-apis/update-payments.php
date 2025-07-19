<?php
  // created by bhargav
  

require('common/connection.php');
if(isset($_REQUEST['payment_id'])){
    $payment_id = $_REQUEST['payments_id'];
}

$query = " UPDATE   `Payments` SET `payment_id`= '$payment_id',";



if(isset($_REQUEST['user_id'])){
    $user_id = $_REQUEST['user_id'];
    $query .="`user_id`='$user_id',";
}

if(isset($_REQUEST['order_id'])){
    $order_id = $_REQUEST['order_id'];
    $query .= "`order_id`='$orderId',";
}

if(isset($_REQUEST['patment_date'])){
    $payment_date = $_REQUEST['payment_date'];
    $query .= "`payment_date`='$paymentDate',";

}

if(isset($_REQUEST['payment_amount'])){
    $payment_amount = $_REQUEST['payment_amount'];
    $query .= "`payment_amount`='$paymentAmount',";

}

if(isset($_REQUEST['payment_status'])){
    $payment_status = $_REQUEST['payment_status'];
    $query .= "`payment_status`='$paymentStatus', ";
}

$query .= "WHERE `payment_id`='$payment_id'";

if($connection){

$result = mysqli_query($connection,$query);

if(mysqli_affected_rows($connection)>0){

    $output = array ("status" => "success");
}
else{
    $output = array ("status" => "error");
}

}
echo json_encode($output);


?>