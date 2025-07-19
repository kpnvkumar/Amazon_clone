<?php


require("common/connection.php");

$payment_id = $_REQUEST['payment_id'];

$query = "SELECT  `payment_amount`, `payment_status` FROM `Payments` WHERE `payment_id`='$payment_id' ";

$result = mysqli_query($connection,$query);

if($result){
    
    if(mysqli_num_rows($result)>0){
        
  if(  $data = mysqli_fetch_array($result)){
    
    $responce = array('status'=>'success','data'=>$data);
      
  }
    
    }
}
else{
     $responce = array('status'=>'error');
}
echo json_encode($responce);


?>