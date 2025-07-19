<?php
require("common/connection.php");


$query="SELECT * FROM `Categories`";
$result=mysqli_query($connection,$query);

if($result){
    $data=array();
    if(mysqli_num_rows($result)>0){
        while($row=mysqli_fetch_array($result)){
            $data[]=$row;
         }
         $output= array("status"=>"success", "data"=>"$data");
    }
    else{
        $output=array("status"=> "error");
    }
   echo json_encode($output);  
}
?>