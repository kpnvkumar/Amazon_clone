<?php
// created by ravi
require('common/connection.php');





if($connection){
    $query = "SELECT * FROM `Order_Items`";
$data = array();
 $result = mysqli_query($connection,$query);
 if(mysqli_num_rows($connection)>0){
   while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
   }
   $output = array("status"=>"success","data" => $data);

 }
 else{
    $output = array("status"=>"something went wrong","data" => null);
 }
}

 json_encode($output);