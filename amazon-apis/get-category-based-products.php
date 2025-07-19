<?php
require('common/connection.php');

if (isset($_REQUEST['brand']) && isset($_REQUEST['product_type'])) {
    $brand = $_REQUEST['brand'];
    $product_type = $_REQUEST['product_type'];

    $query = "SELECT * FROM `Products` WHERE `brand` = '$brand' AND `product_type` ='$product_type'";
    $result = mysqli_query($connection, $query);

    if ($result) {
        $details = array();
        while ($row = mysqli_fetch_assoc($result)) {
          
            $product_images = json_decode($row['images'],true);
            $product_id = $row['product_id'];
            $image = json_decode($product_images[0],true);
         
            $details =  $row+array("images"=>$image);
        }

        if (!empty($details)) {
            $output = array('status' => 'success', 'data' => $details);
        } else {
            $output = array('status' => 'error', 'message' => 'No images found for the given brand and product type');
        }
    } else {
        $output = array('status' => 'error', 'message' => mysqli_error($connection));
    }
} else {
    $output = array('status' => 'error', 'message' => 'Brand or product_type not provided');
}

echo json_encode($output);
?>
