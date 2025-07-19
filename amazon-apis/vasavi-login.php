<?php


$connection = mysqli_connect("localhost","root","","ecommerce");

$query = "SELECT * FROM `products`";
$result = mysqli_query($connection,$query);

if($result){
    if(mysqli_num_rows($result)>0){

    while($data = mysqli_fetch_array($result)){

        $products[] = $data;
  
    }
    $output = array("status"=>"success", "products"=>$products);
  
    echo json_encode($output);
    }

}
else{
    echo "error";
}


?>