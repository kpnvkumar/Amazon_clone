<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
$connection=mysqli_connect("localhost","root","Kpnvkumar@2004","amazon");
$user_id=$_REQUEST["user_id"];
$product_id=$_REQUEST["product_id"];
$quantity=$_REQUEST["quantity"];
$response=[];
if($connection)
{
    $checkQuery = "SELECT * FROM `Cart` WHERE `user_id`='$user_id' AND `product_id`='$product_id'";    $checkResult=mysqli_query($connection,$checkQuery);
    if(mysqli_num_rows($checkResult)>0)
    {
        $updateQuery="UPDATE `Cart` SET `quantity`=`quantity`+$quantity WHERE `user_id`='$user_id' AND `product_id`='$product_id'";
        $updateResult = mysqli_query($connection, $updateQuery);
        if($updateResult)
        {
            $response=array("status"=>"updated","message"=>"Quantity updated");
        }
        else{
            $response=array("status"=>"error","message"=>"updated failed");
        }
    }
    else{
      $insertQuery="INSERT INTO `Cart` (`product_id`, `quantity`, `user_id`) VALUES ('$product_id','$quantity','$user_id')";
      $insertResult=mysqli_query($connection,$insertQuery);
      if($insertResult){
        $response=array("status"=>"sucess","message"=>"product added to cart");
    }
    else{
        $response=array("status"=>"error","message"=>"Insert failed");
    }
    }
    echo json_encode($response);
}