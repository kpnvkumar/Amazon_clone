<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: GET,POST");


$connection=mysqli_connect("localhost","root","Kpnvkumar@2004","amazon");
date_default_timezone_set("Asia/Kolkata");
$date = date("y-m-d h:i:s");   

?>