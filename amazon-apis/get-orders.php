<?php
require("common/connection.php");

$user_id = $_REQUEST['user_id'];
$query="SELECT * FROM `Orders` WHERE `user_id`='$user_id'";
$result=mysqli_query($connection,$query);

if($result){
    $data=array();
    if(mysqli_num_rows($result)>0){
        while($row=mysqli_fetch_array($result)){
            $product_id = $row['product_id'];
            $product_query ="SELECT * FROM `Products` WHERE `product_id`='$product_id' LIMIT 1";
            $product_result = mysqli_query($connection,$product_query);
           if($product_result){
               if(mysqli_num_rows($product_result)>0){

                
                $order = mysqli_fetch_array($product_result);
                $images = $order['images'];
                
                $output_images = json_decode($images);
                $data[] = $row+$order+array("final_images"=>$output_images);
               }
           }
           else{
               $data[]=$row;
           }
            
              
          
         }
         $output= array("status"=>"success","orders"=>$data);
    }
    else{
        $output=array("status"=> "success","title"=>"No Products");
    }
   echo json_encode($output);  
}
?>