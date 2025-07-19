<?php
// created by ravi

require('common/connection.php');


if(isset($_REQUEST['name'])){
    $name = $_REQUEST['name'];
   
}
if(isset($_REQUEST['discount'])){
    $discount = $_REQUEST['discount'];
   
}
if(isset($_REQUEST['startDate'])){
    $startDate = $_REQUEST['startDate'];
   

}
if(isset($_REQUEST['endDate'])){
    $endDate = $_REQUEST['endDate'];


}


    $query ="INSERT INTO `Promotions`( `name`, `discount_percentage`, `start_date`, `end_date`) VALUES ('$name','$discount','$startDate','$endDate') ";

 $result = mysqli_query($connection,$query);

 if($result){
 
   $output = array("status"=>"successfully added Promotion");

 }
 else{
    $output = array("status"=>"something went wrong");
 }


 echo json_encode($output);