<?php
// created by bhargav
require('common/connection.php');

$query = "SELECT * FROM `Payments`";

$result = mysqli_query($connection,$query);

if($connection){
        if ($result){
            $data = null;
        if(mysqli_num_rows($result)>0){
            while ($row =mysqli_fetch_array($result)){
                $data[] = $row;

            }
            $response = array("status"=>"success", "data"=>"$data");
        }else{
            $response = array("status" =>"error");
        }
          echo json_encode($response);
 
        }
}


?>